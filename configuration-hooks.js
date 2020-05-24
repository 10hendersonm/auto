(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{92:function(e,a,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s,i=t(o(3)),r=function(e){if(e&&e.__esModule)return e;var a={};if(null!=e)for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var s=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,o):{};s.get||s.set?Object.defineProperty(a,o,s):a[o]=e[o]}return a.default=e,a}(o(0));t(o(2)),t(o(122));function t(e){return e&&e.__esModule?e:{default:e}}function n(e,a,o,i){s||(s="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,t=arguments.length-3;if(a||0===t||(a={children:void 0}),a&&r)for(var n in r)void 0===a[n]&&(a[n]=r[n]);else a||(a=r||{});if(1===t)a.children=i;else if(t>1){for(var l=new Array(t),d=0;d<t;d++)l[d]=arguments[d+3];a.children=l}return{$$typeof:s,type:e,key:void 0===o?null:""+o,ref:null,props:a,_owner:null}}function l(e,a,o){return a in e?Object.defineProperty(e,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[a]=o,e}function d(){return(d=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var o=arguments[a];for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s])}return e}).apply(this,arguments)}function c(e,a){if(null==e)return{};var o,s,i=function(e,a){if(null==e)return{};var o,s,i={},r=Object.keys(e);for(s=0;s<r.length;s++)o=r[s],a.indexOf(o)>=0||(i[o]=e[o]);return i}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)o=r[s],a.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}const p=e=>{let{to:a}=e,o=c(e,["to"]);return a.includes("http")?r.default.createElement("a",d({},e,{href:a})):("#"===a[0]&&(a=i.default.join("/auto/","pages/plugins/configuration-hooks.html")+a),r.default.createElement("a",d({},o,{href:a,onClick:o=>{if(o.preventDefault(),"#"===e.to)return!1;const s=new URL(i.default.join(window.location.origin,a));window.history.pushState((e=>({href:e.href,pathname:e.pathname,hash:e.hash,query:e.query}))(s),null,a),e.onClick();const r=new CustomEvent("changeLocation",{detail:s});return dispatchEvent(r),!1}})))};p.defaultProps={href:"",onClick:()=>{}};const u=e=>{var a,o;return o=a=class extends r.default.Component{constructor(...e){super(...e),l(this,"state",{Comp:null})}componentDidMount(){!this.state.Comp&&this.props.shouldLoad&&e().then(e=>{this.setState({Comp:e.default})})}render(){const{Comp:e}=this.state;return e?r.default.createElement(e,this.props,this.props.children||null):null}},l(a,"defaultProps",{shouldLoad:!0}),o};u(()=>o.e(32).then(o.bind(null,123))),u(()=>o.e(32).then(o.bind(null,124)));var h=n("h1",{},void 0,"Configuration Hooks"),v=n("p",{},void 0,"All of the following hooks in some way deal with detecting, modifying and validating ",n("code",{},void 0,"auto"),"'s configuration."),g=n("p",{},void 0,"Happens before any command is run. This is a great place to check for platform specific secrets such as a npm token."),m=n("pre",{},void 0,n("code",{className:"language-ts"},void 0,"auto.hooks.beforeRun.tapPromise(",n("span",{className:"hljs-string"},void 0,'"NPM"'),", ",n("span",{className:"hljs-keyword"},void 0,"async")," (config) => {",n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"if")," (!process.env.NPM_TOKEN) {",n("br",{}),"    auto.logger.log.warn(",n("span",{className:"hljs-string"},void 0,'"NPM Token is needed for the NPM plugin!"'),");",n("br",{}),"  }",n("br",{}),"});",n("br",{}))),f=n("p",{},void 0,"Modify what is in the config. You must return the config in this hook. If you plugins requires some option to be set this is the place to do it."),b=n("pre",{},void 0,n("code",{className:"language-ts"},void 0,"auto.hooks.modifyConfig.tap(",n("span",{className:"hljs-string"},void 0,'"test"'),", ",n("span",{className:"hljs-function"},void 0,"(",n("span",{className:"hljs-params"},void 0,"config"),") =>")," {",n("br",{}),"  config.labels.released = {",n("br",{}),"    name: ",n("span",{className:"hljs-string"},void 0,'"released"'),",",n("br",{}),"    description: ",n("span",{className:"hljs-string"},void 0,'"This issue/pull request has been released"'),",",n("br",{}),"  };",n("br",{}),n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"return")," config;",n("br",{}),"});",n("br",{}))),y=n("p",{},void 0,n("em",{},void 0,"Other examples:")),N=n("code",{},void 0,"noVersionPrefix"),j=n("code",{},void 0,"noVersionPrefix"),k=n("code",{},void 0,"released"),w=n("p",{},void 0,"Get git author to commit with. Typically from a package distribution description file."),P=n("pre",{},void 0,n("code",{className:"language-ts"},void 0,"auto.hooks.getAuthor.tapPromise(",n("span",{className:"hljs-string"},void 0,'"NPM"'),", ",n("span",{className:"hljs-keyword"},void 0,"async")," () => {",n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"const")," { author } = ",n("span",{className:"hljs-built_in"},void 0,"JSON"),".parse(",n("span",{className:"hljs-keyword"},void 0,"await")," readFile(",n("span",{className:"hljs-string"},void 0,'"package.json"'),", ",n("span",{className:"hljs-string"},void 0,'"utf-8"'),"));",n("br",{}),n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"if")," (author) {",n("br",{}),"    ",n("span",{className:"hljs-keyword"},void 0,"return")," author;",n("br",{}),"  }",n("br",{}),"});",n("br",{}))),O=n("p",{},void 0,"Get the previous version. Typically from a package distribution description file. This hooks is required for plugin that facilitate publishing."),C=n("pre",{},void 0,n("code",{className:"language-ts"},void 0,"auto.hooks.getPreviousVersion.tapPromise(",n("span",{className:"hljs-string"},void 0,'"NPM"'),", ",n("span",{className:"hljs-keyword"},void 0,"async")," () => {",n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"const")," { version } = ",n("span",{className:"hljs-built_in"},void 0,"JSON"),".parse(",n("span",{className:"hljs-keyword"},void 0,"await")," readFile(",n("span",{className:"hljs-string"},void 0,'"package.json"'),", ",n("span",{className:"hljs-string"},void 0,'"utf-8"'),"));",n("br",{}),n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"if")," (version) {",n("br",{}),"    ",n("span",{className:"hljs-keyword"},void 0,"return")," auto.prefixRelease(",n("br",{}),"      ",n("span",{className:"hljs-built_in"},void 0,"JSON"),".parse(",n("span",{className:"hljs-keyword"},void 0,"await")," readFile(",n("span",{className:"hljs-string"},void 0,'"package.json"'),", ",n("span",{className:"hljs-string"},void 0,'"utf-8"'),")).version",n("br",{}),"    );",n("br",{}),"  }",n("br",{}),"});",n("br",{}))),M=n("p",{},void 0,"Get owner and repository for the project to automate releases for. Typically from a package distribution description file. Falls back to global ",n("code",{},void 0,"git config")," author."),S=n("pre",{},void 0,n("code",{className:"language-ts"},void 0,"auto.hooks.getRepository.tapPromise(",n("span",{className:"hljs-string"},void 0,"'NPM'"),", ",n("span",{className:"hljs-keyword"},void 0,"async")," () => {",n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"const")," owner = ",n("span",{className:"hljs-comment"},void 0,"// get the owner from package.json"),n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"const")," repo = ",n("span",{className:"hljs-comment"},void 0,"// get the repo from package.json"),n("br",{}),n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"return")," {",n("br",{}),"    owner,",n("br",{}),"    repo",n("br",{}),"  }",n("br",{}),"});",n("br",{}))),T=n("code",{},void 0,".autorc"),_=n("pre",{},void 0,n("code",{className:"language-ts"},void 0,"auto.hooks.validateConfig.tapPromise(",n("span",{className:"hljs-string"},void 0,'"test"'),", ",n("span",{className:"hljs-function"},void 0,"(",n("span",{className:"hljs-params"},void 0,"name, options"),") =>")," {",n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"if")," (name === ",n("span",{className:"hljs-keyword"},void 0,"this"),".name || name === `auto-plugin-${",n("span",{className:"hljs-keyword"},void 0,"this"),".name}`) {",n("br",{}),"    ",n("span",{className:"hljs-keyword"},void 0,"return"),"; ",n("span",{className:"hljs-comment"},void 0,"// your validation error. Can either be strings for { path, expectedType, value }"),n("br",{}),"  }",n("br",{}),"});",n("br",{}))),E=n("code",{},void 0,"auto"),x=n("pre",{},void 0,n("code",{className:"language-ts"},void 0,n("span",{className:"hljs-comment"},void 0,"// Types in TypeScript"),n("br",{}),n("span",{className:"hljs-keyword"},void 0,"interface")," Options {",n("br",{}),"  level?: ",n("span",{className:"hljs-built_in"},void 0,"string"),";",n("br",{}),"  user?: ",n("span",{className:"hljs-built_in"},void 0,"string"),";",n("br",{}),"}",n("br",{}),n("br",{}),n("span",{className:"hljs-comment"},void 0,"// The equivalent io-ts code"),n("br",{}),n("span",{className:"hljs-keyword"},void 0,"import")," * ",n("span",{className:"hljs-keyword"},void 0,"as")," t ",n("span",{className:"hljs-keyword"},void 0,"from")," ",n("span",{className:"hljs-string"},void 0,'"io-ts"'),";",n("br",{}),n("br",{}),n("span",{className:"hljs-keyword"},void 0,"const")," pluginOptions = t.partial({",n("br",{}),"  level: t.string,",n("br",{}),"  user: t.string,",n("br",{}),"});",n("br",{}),n("br",{}),n("span",{className:"hljs-keyword"},void 0,"export")," ",n("span",{className:"hljs-keyword"},void 0,"type")," Options = t.TypeOf<",n("span",{className:"hljs-keyword"},void 0,"typeof")," pluginOptions>;",n("br",{}))),R=n("p",{},void 0,"Since your type information will now be available at runtime (in ",n("code",{},void 0,"pluginOptions"),") you can use this to validate the configuration! To do this ",n("code",{},void 0,"auto")," exposes a helper function to validate you plugins with the ",n("code",{},void 0,"io-ts")," types."),L=n("pre",{},void 0,n("code",{className:"language-ts"},void 0,n("span",{className:"hljs-keyword"},void 0,"import")," { validatePluginConfiguration } ",n("span",{className:"hljs-keyword"},void 0,"from")," ",n("span",{className:"hljs-string"},void 0,'"@auto-it/core"'),";",n("br",{}),n("br",{}),"auto.hooks.validateConfig.tapPromise(",n("span",{className:"hljs-string"},void 0,'"test"'),", ",n("span",{className:"hljs-function"},void 0,"(",n("span",{className:"hljs-params"},void 0,"name, options"),") =>")," {",n("br",{}),"  ",n("span",{className:"hljs-keyword"},void 0,"if")," (name === ",n("span",{className:"hljs-keyword"},void 0,"this"),".name || name === `auto-plugin-${",n("span",{className:"hljs-keyword"},void 0,"this"),".name}`) {",n("br",{}),"    ",n("span",{className:"hljs-keyword"},void 0,"return")," validatePluginConfiguration(",n("span",{className:"hljs-keyword"},void 0,"this"),".name, pluginOptions, options);",n("br",{}),"  }",n("br",{}),"});",n("br",{})));var A=e=>n("div",{className:e.className},void 0,n("section",{},void 0,h,v,n("ul",{},void 0,n("li",{},void 0,n(p,{currentPage:e.currentPage,to:"#beforerun"},void 0,"beforeRun")),n("li",{},void 0,n(p,{currentPage:e.currentPage,to:"#modifyconfig"},void 0,"modifyConfig")),n("li",{},void 0,n(p,{currentPage:e.currentPage,to:"#getauthor"},void 0,"getAuthor")),n("li",{},void 0,n(p,{currentPage:e.currentPage,to:"#getpreviousversion"},void 0,"getPreviousVersion")),n("li",{},void 0,n(p,{currentPage:e.currentPage,to:"#getrepository"},void 0,"getRepository")),n("li",{},void 0,n(p,{currentPage:e.currentPage,to:"#validateconfig"},void 0,"validateConfig"))),n("h2",{id:"beforerun"},void 0,"beforeRun ",n(p,{currentPage:e.currentPage,className:"fas fa-hashtag headerLink",to:"#beforerun","aria-hidden":"true"})),g,m,n("h2",{id:"modifyconfig"},void 0,"modifyConfig ",n(p,{currentPage:e.currentPage,className:"fas fa-hashtag headerLink",to:"#modifyconfig","aria-hidden":"true"})),f,b,y,n("ul",{},void 0,n("li",{},void 0,n(p,{currentPage:e.currentPage,to:"/auto/plugins/cocoapods/README.html"},void 0,"cocoapods")," - Sets ",N," to true for independent monorepos"),n("li",{},void 0,n(p,{currentPage:e.currentPage,to:"/auto/plugins/npm/README.html"},void 0,"npm")," - Sets ",j," to true for independent monorepos"),n("li",{},void 0,n(p,{currentPage:e.currentPage,to:"/auto/plugins/release/README.html"},void 0,"release")," - Adds ",k," label")),n("h2",{id:"getauthor"},void 0,"getAuthor ",n(p,{currentPage:e.currentPage,className:"fas fa-hashtag headerLink",to:"#getauthor","aria-hidden":"true"})),w,P,n("h2",{id:"getpreviousversion"},void 0,"getPreviousVersion ",n(p,{currentPage:e.currentPage,className:"fas fa-hashtag headerLink",to:"#getpreviousversion","aria-hidden":"true"})),O,C,n("h2",{id:"getrepository"},void 0,"getRepository ",n(p,{currentPage:e.currentPage,className:"fas fa-hashtag headerLink",to:"#getrepository","aria-hidden":"true"})),M,S,n("h2",{id:"validateconfig"},void 0,"validateConfig ",n(p,{currentPage:e.currentPage,className:"fas fa-hashtag headerLink",to:"#validateconfig","aria-hidden":"true"})),n("p",{},void 0,"Validate how your plugin is configured. Make sure to account for the ",n(p,{currentPage:e.currentPage,to:"/auto/pages/plugins/plugins.html#plugin-declaration"},void 0,"different ways you plugin can be included")," in an ",T,"."),_,n("p",{},void 0,E," and it's plugins use ",n(p,{currentPage:e.currentPage,target:"_blank",to:"https://github.com/gcanti/io-ts",className:"external-link"},void 0,"io-ts")," to validate the options for a plugin. If you're using typescript this is a great way to define the options for your plugin."),x,R,L));a.default=A,e.exports=a.default}}]);
//# sourceMappingURL=configuration-hooks.js.map