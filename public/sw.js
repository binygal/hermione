if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,t)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>n(e,a),o={module:{uri:a},exports:c,require:r};s[a]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-7028bf80"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/dynamic-css-manifest.json",revision:"d751713988987e9331980363e24189ce"},{url:"/_next/static/HDArs3xhhxqYRrRsHdfC0/_buildManifest.js",revision:"74bc59db261450c7f78e85f8b24973e8"},{url:"/_next/static/HDArs3xhhxqYRrRsHdfC0/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/33-2d29d2607c295284.js",revision:"2d29d2607c295284"},{url:"/_next/static/chunks/framework-673199ab50d38195.js",revision:"673199ab50d38195"},{url:"/_next/static/chunks/main-4dc7363603a7f6c3.js",revision:"4dc7363603a7f6c3"},{url:"/_next/static/chunks/pages/_app-b3b882b97f20e35c.js",revision:"b3b882b97f20e35c"},{url:"/_next/static/chunks/pages/_error-d83ee888ba41c03c.js",revision:"d83ee888ba41c03c"},{url:"/_next/static/chunks/pages/index-8f191eb1fe254851.js",revision:"8f191eb1fe254851"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-8cac0b4b405cede1.js",revision:"8cac0b4b405cede1"},{url:"/_next/static/css/9bfb8946f410be19.css",revision:"9bfb8946f410be19"},{url:"/_next/static/css/fa07652a77776120.css",revision:"fa07652a77776120"},{url:"/_next/static/media/back-arrow.6b9044a6.svg",revision:"b9cdcf26f33b0aad4f3ac6f23b2f30e6"},{url:"/_next/static/media/close-circle.3fabf751.svg",revision:"5615bf4faf2aee2347f8cf746ade2d90"},{url:"/_next/static/media/coffee.c8068f94.svg",revision:"3ca1ea0fd456848a037c5682155799b1"},{url:"/_next/static/media/delete-can.de8c5891.svg",revision:"f1341dd193d9426279307d96f12b11e1"},{url:"/_next/static/media/edit.11a4839b.svg",revision:"728baa3327f51405a2c66a4134366fc6"},{url:"/_next/static/media/list.2fbe0cf4.svg",revision:"6e8ac8cd73124663c109cd01fac7b27f"},{url:"/_next/static/media/settings.64124b07.svg",revision:"543187582ae98425c5d8643ff6ce9d97"},{url:"/_next/static/media/working.40ee269b.svg",revision:"b9b47fd47fcab7068777b995ffa35526"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-192x192.png",revision:"d620e333698dc92e9d55e1310d6726ff"},{url:"/icon-256x256.png",revision:"73a79e27d39e97294b40dd3d2c99d467"},{url:"/icon-384x384.png",revision:"b73353c89e47e9b4930541f8a884df1c"},{url:"/icon-512x512.png",revision:"4b2b3bd511f2f312c409df172c67c336"},{url:"/manifest.json",revision:"135b7b91545cf2ce59479e576e676fed"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
