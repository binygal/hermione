if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-7028bf80"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2dfaeeaf63da92880741ce10de19f467"},{url:"/_next/static/Acw9sybOQ8gHXHFyuFyr7/_buildManifest.js",revision:"ec84425be29cec7354976d67e5fe285e"},{url:"/_next/static/Acw9sybOQ8gHXHFyuFyr7/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/2036a630-a0f6987681dc0713.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/355.1e272c64ef6152e2.js",revision:"1e272c64ef6152e2"},{url:"/_next/static/chunks/371-0d8f45ceb293b73a.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/587-d3a693edffcc9d92.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/615.8fa5716a981eb05a.js",revision:"8fa5716a981eb05a"},{url:"/_next/static/chunks/737-018486cd0e6a5814.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/759.cecd1f1ad0e87138.js",revision:"cecd1f1ad0e87138"},{url:"/_next/static/chunks/app/_not-found/page-440d668b8bd51712.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/app/layout-3ca58c745a1f549e.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/app/page-cc3a6a09f72041d3.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/framework-72402c331ed9cb9c.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/main-69b6ba3674dd7217.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/main-app-4b1faaf84bd52274.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/pages/_app-dd8e6f0b24484dc6.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/pages/_error-ff8da7b7adec6cba.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-e12a4e1f3cb05d4a.js",revision:"Acw9sybOQ8gHXHFyuFyr7"},{url:"/_next/static/css/4c2ad4ba23c79093.css",revision:"4c2ad4ba23c79093"},{url:"/_next/static/css/ee881a916791ac71.css",revision:"ee881a916791ac71"},{url:"/_next/static/media/back-arrow.6b9044a6.svg",revision:"b9cdcf26f33b0aad4f3ac6f23b2f30e6"},{url:"/_next/static/media/close-circle.3fabf751.svg",revision:"5615bf4faf2aee2347f8cf746ade2d90"},{url:"/_next/static/media/coffee.c8068f94.svg",revision:"3ca1ea0fd456848a037c5682155799b1"},{url:"/_next/static/media/delete-can.de8c5891.svg",revision:"f1341dd193d9426279307d96f12b11e1"},{url:"/_next/static/media/edit.11a4839b.svg",revision:"728baa3327f51405a2c66a4134366fc6"},{url:"/_next/static/media/list.2fbe0cf4.svg",revision:"6e8ac8cd73124663c109cd01fac7b27f"},{url:"/_next/static/media/settings.64124b07.svg",revision:"543187582ae98425c5d8643ff6ce9d97"},{url:"/_next/static/media/working.40ee269b.svg",revision:"b9b47fd47fcab7068777b995ffa35526"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/favicon.png",revision:"61801d95ecaaefc2c5018dcfc0a645f7"},{url:"/icon-192x192.png",revision:"d620e333698dc92e9d55e1310d6726ff"},{url:"/icon-256x256.png",revision:"73a79e27d39e97294b40dd3d2c99d467"},{url:"/icon-384x384.png",revision:"b73353c89e47e9b4930541f8a884df1c"},{url:"/icon-512x512.png",revision:"4b2b3bd511f2f312c409df172c67c336"},{url:"/icons8-clock-dotted-32.png",revision:"4e65ad066572e7e137c792d729f54e17"},{url:"/icons8-clock-dotted-96.png",revision:"9bd48a4a04836e7f577865c9cac41e94"},{url:"/manifest.json",revision:"772913d11ab91d75d3d65a6896daf0ba"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
