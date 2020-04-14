import {
  Auto,
  IPlugin,
  execPromise,
  getLernaPackages,
  inFolder,
  validatePluginConfiguration,
} from "@auto-it/core";
import envCi from "env-ci";
import endent from "endent";
import botList from "@auto-it/bot-list";
import fs from "fs";
import path from "path";
import match from "anymatch";
import on from "await-to-js";
import { execSync } from "child_process";
import { IExtendedCommit } from "@auto-it/core/src/log-parse";
import * as t from "io-ts";
import fromEntries from "fromentries";

const contributionTypes = [
  "blog",
  "bug",
  "business",
  "code",
  "content",
  "design",
  "doc",
  "eventOrganizing",
  "example",
  "financial",
  "fundingFinding",
  "ideas",
  "infra",
  "maintenance",
  "platform",
  "plugin",
  "projectManagement",
  "question",
  "review",
  "security",
  "talk",
  "test",
  "tool",
  "translation",
  "tutorial",
  "userTesting",
  "video",
] as const;
type Contribution = typeof contributionTypes[number];

const isContribution = /**
ccccccccccccccccccccccc *
ccccccccccccccccccccccc */
(
  contribution: string | Contribution
): contribution is Contribution =>
  contributionTypes.includes(contribution as Contribution);

/** Get an rc file if there is one. */
function getRcFile() {
  try {
    const rcFile = path.join(process.cwd(), ".all-contributorsrc");
    const config: AllContributorsRc = JSON.parse(
      fs.readFileSync(rcFile, "utf8")
    );

    return config;
  } catch (error) {}
}

const pattern = t.union([t.string, t.array(t.string)]);
const pluginOptions = t.partial({
  /** Usernames to exclude from the contributors */
  exclude: t.array(t.string),
  /** Globs to detect change types by */
  types: t.partial(
    fromEntries(contributionTypes.map((c) => [c, pattern])) as Record<
      Contribution,
      typeof pattern
    >
  ),
});

export type IAllContributorsPluginOptions = t.TypeOf<typeof pluginOptions>;

interface Contributor {
  /** GitHub username */
  login: string;
  /** Types of contributions they've made */
  contributions: Contribution[];
}

interface AllContributorsRc {
  /** All of the current contributors */
  contributors: Contributor[];
}

const defaultOptions: IAllContributorsPluginOptions = {
  exclude: botList,
  types: {
    doc: ["**/*.mdx", "**/*.md", "**/docs/**/*", "**/documentation/**/*"],
    example: ["**/*.stories*", "**/*.story.*"],
    infra: ["**/.circle/**/*", "**/.github/**/*", "**/travis.yml"],
    test: ["**/*.test.*", "**/test/**", "**/__tests__/**"],
    code: ["**/src/**/*", "**/lib/**/*", "**/package.json", "**/tsconfig.json"],
  },
};

const title = /[#]{0,5}[ ]*[C|c]ontributions/;
const contributorLine = /^[-*] @(\S+)\s+[:-]\s+([\S ,]+)$/;

/** Find contributions listed in PR bodies */
function getExtraContributors(body?: string) {
  const authorContributions: Record<string, Set<string>> = {};

  if (!body) {
    return;
  }

  const start = body.match(title);

  if (!start) {
    return;
  }

  body
    .slice((start.index || 0) + (start[0] || "").length)
    .replace(/\r\n/g, "\n")
    .split("\n")
    .forEach((line) => {
      if (line.startsWith("#") || line.startsWith("<!--")) {
        return;
      }

      const contributor = line.match(contributorLine);

      if (!contributor) {
        return;
      }

      const [, username, contributions] = contributor;

      if (!authorContributions[username]) {
        authorContributions[username] = new Set();
      }

      contributions
        .split(",")
        .map((contribution) => contribution.trim())
        .forEach((contribution) =>
          authorContributions[username].add(contribution)
        );
    });

  return authorContributions;
}

/** Automatically add contributors as changelogs are produced. */
export default class AllContributorsPlugin implements IPlugin {
  /** The name of the plugin */
  name = "all-contributors";

  /** The options of the plugin */
  readonly options: Required<IAllContributorsPluginOptions>;

  /** Initialize the plugin with it's options */
  constructor(options: IAllContributorsPluginOptions = {}) {
    this.options = {
      exclude: [...(defaultOptions.exclude || []), ...(options.exclude || [])],
      types: { ...defaultOptions.types, ...options.types },
    };
  }

  /** Tap into auto plugin points. */
  apply(auto: Auto) {
    const env = envCi();

    auto.hooks.validateConfig.tapPromise(this.name, async (name, options) => {
      if (name === this.name || name === `@auto-it/${this.name}`) {
        return validatePluginConfiguration(this.name, pluginOptions, options);
      }
    });

    auto.hooks.beforeShipIt.tapPromise(this.name, async (context) => {
      if (
        context.releaseType === "latest" ||
        context.releaseType === "old" ||
        !("pr" in env)
      ) {
        return;
      }

      const pr = Number(env.pr);

      if (!pr) {
        return;
      }

      const prInfo = await auto.git?.getPullRequest(pr);
      auto.logger.log.info(this.name, { prInfo });

      if (!prInfo) {
        return;
      }

      const extra = getExtraContributors(prInfo.data.body);
      auto.logger.log.info(this.name, { extra });

      if (!extra || !Object.keys(extra).length) {
        return;
      }

      const unknownTypes = Object.values(extra)
        .reduce((all, i) => [...all, ...i], [] as string[])
        .filter(
          (contribution) =>
            !contributionTypes.includes(contribution as Contribution)
        );

      const message = endent`
        # Extra Contributions

        The following contributions will be added to all-contributors (as well as any code contributions) when this PR is released :tada::

        ${Object.entries(extra).map(
          ([username, contributions]) =>
            `- @${username} - ${[...contributions]
              .filter(isContribution)
              .join(", ")}`
        )}

        ${
          unknownTypes.length
            ? endent`
                ## Unknown Contribution Types

                We found some unknown contribution types in your PR body!
                These contributions will not be counted and you should fix them.

                ${unknownTypes.map((type) => `- ${type}`)}
              `
            : ""
        }
      `;

      await auto.comment({
        pr,
        context: "Extra Contributions",
        edit: true,
        message,
      });
    });

    auto.hooks.afterAddToChangelog.tapPromise(
      this.name,
      async ({ commits }) => {
        const rootDir = process.cwd();
        // Always do the root package
        let packages = [{ path: rootDir, name: "root-package" }];

        try {
          // Try to get sub-packages
          packages = [...packages, ...(await getLernaPackages())];
        } catch (error) {}

        // Go through each package and update code contributions
        await packages.reduce(async (last, { name, path }) => {
          // Cannot run git operations in parallel
          await last;

          auto.logger.verbose.info(`Updating contributors for: ${name}`);

          const includedCommits = commits.filter((commit) =>
            commit.files.some((file) => inFolder(path, file))
          );

          if (includedCommits.length > 0) {
            auto.logger.verbose.success(
              `${name} has ${includedCommits.length} new commits.`
            );
            auto.logger.veryVerbose.info(
              `With commits: ${JSON.stringify(includedCommits, null, 2)}`
            );

            process.chdir(path);
            await this.updateContributors(auto, includedCommits);
          }
        }, Promise.resolve());

        process.chdir(rootDir);
        const changedFiles = await execPromise("git", [
          "status",
          "--porcelain",
        ]);

        if (changedFiles) {
          await execPromise("git", ["add", "README.md"]);
          await execPromise("git", ["add", ".all-contributorsrc"]);
          await on(execPromise("git", ["add", "**/README.md"]));
          await on(execPromise("git", ["add", "**/.all-contributorsrc"]));
          await execPromise("git", [
            "commit",
            "--no-verify",
            "-m",
            '"Update contributors [skip ci]"',
          ]);
        }
      }
    );
  }

  /** Update the contributors rc for a package. */
  private async updateContributors(auto: Auto, commits: IExtendedCommit[]) {
    const config = getRcFile();

    if (!config) {
      return;
    }

    const authorContributions: Record<string, Set<Contribution>> = {};
    let didUpdate = false;

    const commitsWithAllChangedFiles = await Promise.all(
      commits.map(async (commit) => {
        const extra = await execPromise("git", [
          "show",
          '--pretty=""',
          "--name-only",
          "--first-parent",
          "-m",
          commit.hash,
        ]);

        commit.files = [...new Set([...commit.files, ...extra.split("\n")])];

        return commit;
      })
    );

    // 1. Find all the authors and their contribution types
    commitsWithAllChangedFiles.forEach((commit) => {
      const { authors } = commit;
      let { files } = commit;

      // Find automated contribution for type globs
      Object.keys(this.options.types || {})
        .filter((type): type is Contribution => {
          /** Determine if path is the contribution type */
          const isType = (file: string) =>
            match(this.options.types[type as Contribution] || [], file);
          const isMatch = files.some(isType);
          files = files.filter((file) => !isType(file));

          return isMatch;
        })
        .forEach((contribution) => {
          authors.forEach(({ username }) => {
            if (!username) {
              return;
            }

            if (!authorContributions[username]) {
              authorContributions[username] = new Set();
            }

            authorContributions[username].add(contribution);
          });
        });

      // Find contributions listed in PR bodies
      const extra = getExtraContributors(commit.rawBody);

      if (extra) {
        Object.entries(extra).forEach(([username, contributions]) => {
          if (!authorContributions[username]) {
            authorContributions[username] = new Set();
          }

          [...contributions]
            .filter(isContribution)
            .forEach((contribution) =>
              authorContributions[username].add(contribution)
            );
        });
      }
    });

    auto.logger.verbose.info("Found contributions:", authorContributions);

    // 2. Determine if contributor has update
    Object.entries(authorContributions).forEach(([username, contributions]) => {
      const { contributions: old = [] } =
        config.contributors.find(
          (contributor) =>
            contributor.login.toLowerCase() === username.toLowerCase()
        ) || {};
      const hasNew = [...contributions].find(
        (contribution) => !old.includes(contribution)
      );

      if (hasNew && !this.options.exclude.includes(username)) {
        const newContributions = new Set([...old, ...contributions]);

        didUpdate = true;
        auto.logger.log.info(`Adding "${username}"'s contributions...`);

        execSync(
          `npx all-contributors-cli add ${username} ${[
            ...newContributions,
          ].join(",")}`,
          { stdio: "inherit" }
        );
      } else {
        auto.logger.verbose.warn(`"${username}" had no new contributions...`);
      }
    });

    if (didUpdate) {
      auto.logger.log.success("Updated contributors!");
    }
  }
}
