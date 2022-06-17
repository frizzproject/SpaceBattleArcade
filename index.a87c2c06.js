// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"dBVa4":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "771d348ea87c2c06";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, importScripts */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ("reload" in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                if (asset.type === "js") {
                    if (typeof document !== "undefined") {
                        let script = document.createElement("script");
                        script.src = asset.url;
                        return new Promise((resolve, reject)=>{
                            var _document$head;
                            script.onload = ()=>resolve(script);
                            script.onerror = reject;
                            (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
                        });
                    } else if (typeof importScripts === "function") return new Promise((resolve, reject)=>{
                        try {
                            importScripts(asset.url);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"cMznl":[function(require,module,exports) {
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const controlButtons = document.querySelectorAll(".button");
let start = false // start
;
diff_easy = false, diff_medium = false, diff_hard = false, screen_mode = 0, spawnHeartInt = 20000, switch_control = undefined; // switch control (mouse - 0; keyboard - 1)                          
let width = 800, height = 800, timer = 0; // timer 
// loading game resurse 
let asteroImg = new Image(); // create asteroid img
asteroImg.src = "../sprites/astero.png"; // asteroid img (астероид)
let playerShipImg = new Image(); // create player ship img
playerShipImg.src = "../sprites/player-ship.png"; // player ship img (астероид)
let bulletImg = new Image(); // create bullet img
bulletImg.src = "../sprites/bullet.png"; // bullet img (астероид)
let explImg = new Image(); // create collision sprites img
explImg.src = "../sprites/exp-sprites.png"; // collision sprites img (астероид)
let healthImg = new Image(); // create health img
healthImg.src = "../sprites/health.png"; // health img (астероид)
let spaceBackdround = new Image(); // create img for background
screen_mode === 0 // back images (фон)                 
 ? spaceBackdround.src = "../sprites/space-background.png" : spaceBackdround.src = "../sprites/space-background-16_9.png";
// loading all audio files
let menuTheme = loadAudio([
    "../audio/menu/menu-sound.mp3",
    "../audio/menu/menu-sound.wav",
    "../audio/menu/menu-sound.ogg"
], 0.3, true, false);
let battleTheme = loadAudio([
    "../audio/battle/battle-sound.mp3",
    "../audio/battle/battle-sound.wav",
    "../audio/battle/battle-sound.ogg"
], 0.2, true);
let shotSound = loadAudio([
    "../audio/shot/shot-sound.mp3",
    "../audio/shot/shot-sound.wav",
    "../audio/shot/shot-sound.ogg"
], 0.2);
let explSound = loadAudio([
    "../audio/expl/expl-sound.mp3",
    "../audio/expl/expl-sound.wav",
    "../audio/expl/expl-sound.ogg"
], 0.2);
let removeHealthSound = loadAudio([
    "../audio/health/remove-health.mp3",
    "../audio/health/remove-health.wav",
    "../audio/health/remove-health.ogg"
], 0.4);
let addHealthSound = loadAudio([
    "../audio/health/add-health.mp3",
    "../audio/health/add-health.wav",
    "../audio/health/add-health.ogg"
], 0.3);
let selectSound = loadAudio([
    "../audio/select/select-sound.mp3",
    "../audio/select/select-sound.wav",
    "../audio/select/select-sound.ogg"
], 0.2);
let gameOverSound = loadAudio([
    "../audio/menu/game-over.mp3",
    "../audio/menu/game-over.wav",
    "../audio/menu/game-over.ogg"
], 0.6);
let menuThemeSwitch = true; // переключатедь музыки в меню, по умолч. вкл.
// load audio (загрузка звуков)
function loadAudio(audArr, vol, loop, autoplay) {
    const audio = document.createElement("audio");
    for(let i = 0; i < audArr.length; i++){
        const source = document.createElement("source");
        source.src = audArr[i];
        audio.append(source);
    }
    audio.volume = vol || 1;
    audio.loop = loop;
    audio.autoplay = autoplay;
    let objMethod = {
        dom: false,
        state: "stop",
        play: function() {
            // this.dom.currentTime = 0;
            this.dom.play();
            this.state = "play";
        },
        pause: function() {
            this.dom.pause();
            this.state = "pause";
        },
        stop: function() {
            this.dom.pause();
            this.dom.currentTime = 0;
            this.state = "stop";
        }
    };
    objMethod.dom = audio;
    return objMethod;
}
// return all requestAnimationFrame (google, moz. webkit, opera, ms)
let animationGameLoop = function() {
    return requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame || function(callback) {
        window.setInterval(callback, 1000 / 60);
    };
}();
// main game loop call 
spaceBackdround.addEventListener("load", ()=>{
    canvas.width = width;
    canvas.height = height;
    // all control buttons
    controlButtons.forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            // easy dif
            if (btn.classList.contains("_easy")) {
                selectSound.stop();
                selectSound.play();
                if (switch_control != undefined) {
                    console.log("difficult easy...");
                    document.querySelector(".game__menu").classList.add("_hidden");
                    menuTheme.stop();
                    battleTheme.play();
                    diff_easy = true;
                } else alert("Before starting the game choose a control method");
            }
            // medium dif
            if (btn.classList.contains("_medium")) {
                selectSound.stop();
                selectSound.play();
                if (switch_control != undefined) {
                    console.log("difficult medium...");
                    document.querySelector(".game__menu").classList.add("_hidden");
                    menuTheme.stop();
                    battleTheme.play();
                    diff_medium = true;
                } else alert("Before starting the game choose a control method");
            }
            // hard dif
            if (btn.classList.contains("_hard")) {
                selectSound.stop();
                selectSound.play();
                if (switch_control != undefined) {
                    console.log("difficult hard...");
                    document.querySelector(".game__menu").classList.add("_hidden");
                    menuTheme.stop();
                    battleTheme.play();
                    diff_hard = true;
                } else alert("Before starting the game choose a control method");
            }
            // menu switch music
            if (btn.classList.contains("music-switch")) {
                if (!menuThemeSwitch) {
                    selectSound.stop();
                    selectSound.play();
                    menuTheme.play();
                    btn.classList.add("_active");
                    btn.textContent = "mute";
                    menuThemeSwitch = !menuThemeSwitch;
                } else {
                    selectSound.stop();
                    selectSound.play();
                    menuTheme.stop();
                    btn.classList.remove("_active");
                    btn.textContent = "menu music";
                    menuThemeSwitch = !menuThemeSwitch;
                }
            }
            // menu screen switch 
            if (btn.classList.contains("win-mode")) {
                document.querySelector(".game__box").classList.toggle("_fullscreen");
                if (document.querySelector(".game__box").classList.contains("_fullscreen")) {
                    document.querySelector(".wrapper").style.display = "block";
                    screen_mode = 1;
                } else {
                    document.querySelector(".wrapper").style.display = "flex";
                    screen_mode = 0;
                }
                // back images(фон)  
                screen_mode === 0 ? spaceBackdround.src = "../sprites/space-background.png" : spaceBackdround.src = "../sprites/space-background-16_9.png";
            }
            // menu switch-control
            if (btn.classList.contains("controling")) {
                let target = e.target;
                if (target.classList.contains("_mouse")) {
                    switch_control = 0;
                    document.querySelector("._keyboards").classList.remove("_select-k");
                    document.querySelector(".line").classList.add("line-s");
                    selectSound.stop();
                    selectSound.play();
                    target.classList.add("_select-m");
                    console.log("Select mouse switching");
                }
                if (target.classList.contains("_keyboards")) {
                    switch_control = 1;
                    document.querySelector("._mouse").classList.remove("_select-m");
                    document.querySelector(".line").classList.add("line-s");
                    selectSound.stop();
                    selectSound.play();
                    target.classList.add("_select-k");
                    console.log("Select keyboard switching");
                }
            }
            // back to menu
            if (btn.classList.contains("_back")) {
                console.log("back to menu...");
                document.querySelector(".game__lose").classList.add("_hidden");
                selectSound.play();
                setTimeout(()=>{
                    window.location.reload(); // reload page (перезагружаем страницу)
                }, 300);
            }
        });
    });
    gameLoop();
});
// game loop
function gameLoop() {
    update();
    render();
    animationGameLoop(gameLoop);
}
// game update 
function update() {
    timer++;
    if (dead == false) {
        if (diff_easy) {
            // easy
            start = true;
            moveAstero(-2, 2, 1, 2, 10); // min speed X = -2, max speed X = 2; min speed Y = 1, max speed X = 2; freq(частота - 10)
        } else if (diff_medium) {
            // medium
            start = true;
            spawnHeartInt = randomValue(10000, 20000);
            moveAstero(-3, 3, 2, 4, 6); // min speed X = 2, max speed X = 4; min speed Y = 2, max speed X = 6; freq(частота - 6)
        } else if (diff_hard) {
            //  hard
            start = true;
            spawnHeartInt = randomValue(10000, 20000);
            moveAstero(-4, 4, 4, 6, 3); // min speed X = 4, max speed X = 6; min speed Y = 4, max speed X = 6; freq(частота - 3)
        }
        if (switch_control === 0) // mouse
        mouseMovePlayer();
        else switch_control;
        moveHearts();
        createFire();
        moveFire();
        animCollision();
    }
}
// check health (проверка столкновения корабля с астероидом)
let checkHealthInterval = setInterval(()=>{
    checkCollision();
}, 250);
// spawn hearth
let spawnHearth = setInterval(()=>{
    if (start) {
        spawnHeartInt = Math.round(randomValue(1000, 5000));
        createHearts(-1, 1, 1, 1);
    }
}, spawnHeartInt);
// game render
function render() {
    if (screen_mode === 1) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    } else {
        width = 800;
        height = 800;
        canvas.width = width;
        canvas.height = height;
    }
    //  draw background
    ctx.drawImage(spaceBackdround, 0, 0, width, height);
    //  create fire
    for(i in fire)ctx.drawImage(bulletImg, fire[i].x, fire[i].y, fire[i].width, fire[i].height);
    // draw player ship
    ctx.drawImage(playerShipImg, playerShip.x, playerShip.y, playerShip.width, playerShip.height);
    //  create asteroid
    for(i in astero)ctx.drawImage(asteroImg, astero[i].x, astero[i].y, astero[i].width, astero[i].height);
    //  create heart
    for(i in hearts)ctx.drawImage(healthImg, hearts[i].x, hearts[i].y, hearts[i].width, hearts[i].height);
    // draw expl
    for(i in expl)ctx.drawImage(explImg, 170 * Math.floor(expl[i].animX), 170 * Math.floor(expl[i].animY), 170, 170, expl[i].x, expl[i].y, expl[i].width, expl[i].height);
    // draw health
    for(i in health)ctx.drawImage(healthImg, health[i].x, health[i].y, health[i].width, health[i].height);
    // score
    drawText(`Score: ${score}`, 20, 35, "22px", "#fff");
}
// TODO: ------------- Mian variabls and logic with physics -------------
// ---------------------------  settings  ---------------------------
let dead = false; // dead or life
let collision = false; // collisions (столкновения)
let isMouseDown = false; // mouse is down (зажата ли лкм)
let score = 0; // score (очки)
let astero = []; // asteroids (астероиды)
let fire = []; // fire (выстрели)
let expl = []; // expl (взрывы)
let health = []; // health (жизни)
let hearts = []; // hearts (сердечки)
// bullet (пуля)
let fireDX = 0, fireDY = -5, fireWidth = 10, fireHeight = 45, freqSFire = 20; // freq speed bullet (чвстота доп. выстрелов)
// asteroid
let asteroY = -100, asteroDX = 1, asteroDY = 1, asteroWidth = 65, asteroHeight = 65; // height asteroid (высота пули) - st. 85
// health info
let healthX = 20, healthY = 55, healthWidth = 25, healthHeight = 22, quanituHealth = 3; // quanity health (количество жизней) - st. 3
// heart
let heartY = -100, heartWidth = 25, heartHeight = 22, heartDX = 1, heartDY = 1; // change heart y (изменение положение пули по y)
// player (игрок)
let playerShip = {
    x: width / 2 - 50,
    y: height / 2 - 30,
    width: 100,
    height: 60 // payer ship height (standart - 50)
};
// if mouse down (проверка на зажатую лкм)
canvas.onmousedown = function() {
    isMouseDown = true;
};
// if mouse up (проверка на отпущенную лкм)
canvas.onmouseup = function() {
    isMouseDown = !isMouseDown;
};
// draw text function (рисуем счет на поле)
let drawText = (text, posX, posY, fSize, color)=>{
    ctx.fillStyle = color;
    ctx.font = `${fSize} Joystix Monospace`;
    ctx.fillText(text, posX, posY);
    ctx.textBaseline = "top";
};
// createHealth (создание полоски жизней на поле)
let createHealth = function() {
    for(let i = 0; i < quanituHealth; i++){
        health.push({
            x: healthX,
            y: healthY,
            width: healthWidth,
            height: healthHeight // health height (standart - 22px)
        });
        healthX += 35;
    }
}();
// player move (движение игрока)
function mouseMovePlayer() {
    canvas.addEventListener("mousemove", (e)=>{
        playerShip.x = e.offsetX - playerShip.width / 2;
        playerShip.y = e.offsetY - playerShip.height / 2;
    });
}
// create hearts (создание падающих хилок)
function createHearts(minSX, maxSX, minSY, maxSY) {
    hearts.push({
        x: Math.random() * (width - heartWidth - 1) + 1,
        y: heartY,
        dx: heartDX,
        dy: heartDY,
        speedX: Math.random() * (maxSX - minSX + 1) + minSX,
        speedY: Math.random() * (maxSY - minSY + 1) + minSY,
        width: heartWidth,
        height: heartHeight,
        add: false
    });
}
// move hearts (движение падающих хилок)
function moveHearts() {
    if (hearts != 0) for(i in hearts){
        hearts[i].y += hearts[i].dy * hearts[i].speedY;
        hearts[i].x += hearts[i].dx * hearts[i].speedX;
        //borders
        if (hearts[i].x >= width - hearts[i].width || hearts[i].x <= 0) hearts[i].dx = -hearts[i].dx;
        //  del heart
        if (hearts[i].y > height + hearts[i].height) hearts.splice(i, 1);
    }
}
// create fire bullet (создание выстрелов)
function createFire() {
    if (isMouseDown && timer % freqSFire === 0) {
        shotSound.stop(); // stop shot sound 
        shotSound.play(); // start shot sound
        // bullet 1
        fire.push({
            x: playerShip.x + playerShip.width / 2 - 5,
            y: playerShip.y,
            dx: fireDX,
            dy: fireDY,
            width: fireWidth,
            height: fireHeight
        });
    }
}
// move fire bullet (движение выстрелов)
function moveFire() {
    for(i in fire)if (fire != 0) {
        fire[i].y += fire[i].dy;
        fire[i].x += fire[i].dx;
        //  del bullet
        if (fire[i].y < -fire[i].h) fire.splice(i, 1);
    }
}
// check collision with player (проверка на столкновение астероида с игроком)
function checkCollision() {
    for(i in astero)if (astero[i].x + astero[i].width / 1.4 >= playerShip.x && astero[i].x <= playerShip.x + playerShip.width / 1.4 && astero[i].y + astero[i].height / 1.4 >= playerShip.y && astero[i].y <= playerShip.y + playerShip.height / 1.4) {
        collision = true; // столкновение
        astero[i].del = true;
        // add collision (добовляем взрыв астероида при столкновении с player)
        expl.push({
            x: astero[i].x,
            y: astero[i].y,
            width: 110,
            height: 110,
            animX: 0,
            animY: 0
        });
        // del astero (удаляем асероид при столкновении с player)
        if (astero[i].del) {
            astero.splice(i, 1);
            explSound.stop();
            explSound.play();
        }
        //  отнимаем жизнь при столкновении
        if (collision && health.length > 0) {
            removeHealthSound.stop();
            removeHealthSound.play();
            quanituHealth--;
            health.pop();
        }
        // dead (смерть)
        if (collision && health.length == 0) {
            start = false;
            dead = true;
            battleTheme.stop();
            gameOverSound.play();
            document.querySelector(".game__lose").classList.remove("_hidden");
            document.querySelector(".score").textContent = score;
            console.log("Oops!It seems you lost^-^");
        }
    }
    for(i in hearts){
        if (hearts[i].x + hearts[i].width >= playerShip.x && hearts[i].x <= playerShip.x + playerShip.width / 1.4 && hearts[i].y + hearts[i].height >= playerShip.y && hearts[i].y <= playerShip.y + playerShip.height / 1.4) {
            if (health.length < 3) hearts.splice(i, 1);
        // health.push({
        //     x : healthX,                    // health posX
        //     y : healthY,                    // health posY
        //     width : healthWidth,            // health width  (standart - 25px)
        //     height : healthHeight           // health height (standart - 22px)
        // })
        }
    }
}
// collision (анимация столкновения)
function animCollision() {
    for(i in expl){
        expl[i].animX = expl[i].animX + 0.3;
        if (expl[i].animX > 6) {
            expl[i].animY++;
            expl[i].animX = 0;
        }
        if (expl[i].animY > 6) expl.splice(i, 1);
    }
}
// move asteroid (движение астероидов)
function moveAstero(minSX, maxSX, minSY, maxSY, freq) {
    if (timer % freq == 0) astero.push({
        x: Math.random() * (width - asteroWidth - 1) + 1,
        y: asteroY,
        dx: asteroDX,
        dy: asteroDY,
        width: asteroWidth,
        height: asteroHeight,
        speedX: Math.random() * (maxSX - minSX + 1) + minSX,
        speedY: Math.random() * (maxSY - minSY + 1) + minSY,
        angle: 0,
        del: false
    });
    for(i in astero){
        astero[i].x += astero[i].dx * astero[i].speedX; // move astero x
        astero[i].y += astero[i].dy * astero[i].speedY; // move astero y
        // borders
        if (astero[i].x >= width - astero[i].width || astero[i].x <= 0) astero[i].dx = -astero[i].dx;
        if (astero[i].y >= height + astero[i].height) astero.splice(i, 1);
        // collision asteroid with bullet
        for(j in fire)if (Math.abs(astero[i].x + astero[i].width / 2 - fire[j].x - fire[j].width / 2) < astero[i].width && Math.abs(astero[i].y - fire[j].y) < astero[i].height) {
            explSound.stop(); // останавливаем звук предыдущего взрыва
            // add collision
            expl.push({
                x: astero[i].x,
                y: astero[i].y,
                width: 110,
                height: 110,
                animX: 0,
                animY: 0
            });
            astero[i].del = true;
            fire.splice(j, 1);
            explSound.play(); // звук взрыва 
            score++;
            break;
        }
        if (astero[i].del) astero.splice(i, 1); // del astero
    }
}
// generate random values
function randomValue(min, max) {
    return Math.random() * (max - min + 1) + min;
}
// custom cursor function
let customCursor = function() {
    const cursorPoint = document.querySelector(".cursor-point");
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e)=>{
        let mouseX = e.pageX, mouseY = e.pageY, target = e.target;
        if (target == document.getElementById("canvas")) {
            cursorPoint.style.display = "none";
            cursor.style.display = "none";
        } else {
            cursorPoint.style.display = "block";
            cursor.style.display = "block";
        }
        cursorPoint.style.left = mouseX + "px";
        cursorPoint.style.top = mouseY + "px";
        setTimeout(()=>{
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
        }, 50);
        if (target.closest(".button")) {
            cursor.classList.add("cursor_active");
            cursorPoint.classList.add("cursor-point_active");
        } else {
            cursor.classList.remove("cursor_active");
            cursorPoint.classList.remove("cursor-point_active");
        }
    });
}();

},{}]},["dBVa4","cMznl"], "cMznl", "parcelRequireeb69")

//# sourceMappingURL=index.a87c2c06.js.map
