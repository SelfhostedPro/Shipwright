if (!self.define) {
  const e = e => {
      "require" !== e && (e += ".js");
      let r = Promise.resolve();
      return (
        o[e] ||
          (r = new Promise(async r => {
            if ("document" in self) {
              const o = document.createElement("script");
              (o.src = e), document.head.appendChild(o), (o.onload = r);
            } else importScripts(e), r();
          })),
        r.then(() => {
          if (!o[e]) throw new Error(`Module ${e} didn’t register its module`);
          return o[e];
        })
      );
    },
    r = (r, o) => {
      Promise.all(r.map(e)).then(e => o(1 === e.length ? e[0] : e));
    },
    o = { require: Promise.resolve(r) };
  self.define = (r, s, i) => {
    o[r] ||
      (o[r] = Promise.resolve().then(() => {
        let o = {};
        const n = { uri: location.origin + r.slice(1) };
        return Promise.all(
          s.map(r => {
            switch (r) {
              case "exports":
                return o;
              case "module":
                return n;
              default:
                return e(r);
            }
          })
        ).then(e => {
          const r = i(...e);
          return o.default || (o.default = r), o;
        });
      }));
  };
}
define("./sw.js", ["./workbox-f163abaa"], function(e) {
  "use strict";
  self.addEventListener("message", e => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: "App.vue", revision: "87e4299a98d07d8c112a114ddb372437" },
        {
          url: "assets/js/templateGenerator.js",
          revision: "f407012b384e712a915f776ad5f773fc"
        },
        {
          url: "assets/logo.svg",
          revision: "60ff54d9dbc103501aba15a7a5e6e0fd"
        },
        {
          url: "components/builder/app_components/app_advanced.vue",
          revision: "b190faecf9625b4345e5ab08ba5e402f"
        },
        {
          url: "components/builder/app_components/app_environment.vue",
          revision: "8bb84b785631c38913bea24348b5b684"
        },
        {
          url: "components/builder/app_components/app_general.vue",
          revision: "f57548b534794fa7c892b6f50c759b7c"
        },
        {
          url: "components/builder/app_components/app_networking.vue",
          revision: "b0a624d917e92e1e6798dbe9116869a4"
        },
        {
          url: "components/builder/app_components/app_storage.vue",
          revision: "75d5c483642b650d4d957b3c938a1cbc"
        },
        {
          url: "components/builder/builder.vue",
          revision: "5eab6e5d29b9da24676b89f1a5f76396"
        },
        {
          url: "components/layout/TopBar.vue",
          revision: "449712ab0eed792d2ab4ff7f54ffb2ae"
        },
        {
          url: "components/main/home.vue",
          revision: "b47e25bb21ee49d66abe3995f3616e44"
        },
        { url: "main.js", revision: "be4e6eb3ec7a29e28fff2f5bc0acd33d" },
        {
          url: "plugins/vuetify.js",
          revision: "495d097a24b05e2274ca44091f9b7857"
        },
        {
          url: "registerServiceWorker.js",
          revision: "0ff849d18bb23c5a386f02f93a3183a4"
        },
        {
          url: "router/index.js",
          revision: "aa6fe70986943a7fe8518b8669851b8b"
        },
        { url: "store/index.js", revision: "a7f230e18d45acac693813088fbf10fe" },
        {
          url: "views/About.vue",
          revision: "d88b0aff741f94d016116101462e384e"
        },
        { url: "views/Home.vue", revision: "d493128da081caff6a9764f4fe48ea36" }
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map
