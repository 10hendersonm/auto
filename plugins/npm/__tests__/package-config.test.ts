import packageConfig from "../src/package-config";
import { loadPackageJson } from "../src/utils";

const packageJsonSpy = loadPackageJson as jest.Mock;
jest.mock("../src/utils");

test("should return nothing without a repo", async () => {
  packageJsonSpy.mockReturnValueOnce({});
  expect(await packageConfig()).toBeUndefined();
});

test("should return nothing without an owner", async () => {
  packageJsonSpy.mockReturnValueOnce({
    repository: { url: "fake.com" },
  });

  expect(await packageConfig()).toBeUndefined();
});

test("should return nothing without an package name", async () => {
  packageJsonSpy.mockReturnValueOnce({
    repository: { url: "fake.com" },
  });

  expect(await packageConfig()).toBeUndefined();
});

test("should correctly parse package info", async () => {
  packageJsonSpy.mockReturnValueOnce({
    version: "1.0.0",
    repository: { url: "https://github.com/black-panther/operation-foo" },
  });

  expect(await packageConfig()).toStrictEqual({
    repo: "operation-foo",
    owner: "black-panther",
  });
});

test("should correctly parse package info - string", async () => {
  packageJsonSpy.mockReturnValueOnce({
    version: "1.0.0",
    repository: "black-panther/operation-foo",
  });

  expect(await packageConfig()).toStrictEqual({
    repo: "operation-foo",
    owner: "black-panther",
  });
});
