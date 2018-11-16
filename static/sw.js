importScripts('/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.5f54baa4e9fef86513eb1e72a1d1348f.css",
    "revision": "5f54baa4e9fef86513eb1e72a1d1348f"
  },
  {
    "url": "/_nuxt/app.752c441d6fb4e8edbd90.js",
    "revision": "a37ae58d7a2d69c6da2282c6f9f0fb6b"
  },
  {
    "url": "/_nuxt/layouts/contentframe.a74d76e6b7808c8bf028.js",
    "revision": "43ff45dedfa2888e42d875462772be7f"
  },
  {
    "url": "/_nuxt/layouts/default.dcd329cb2281c9761472.js",
    "revision": "ac9b8f753bc9e09ea10f27f91959cc21"
  },
  {
    "url": "/_nuxt/manifest.03389396bad7b761b890.js",
    "revision": "593fea77f5a7e822661b2c0a26037f00"
  },
  {
    "url": "/_nuxt/pages/about.816826a900561487e5ac.js",
    "revision": "bfa83d934cf7ea2c76ae70a3b558110e"
  },
  {
    "url": "/_nuxt/pages/alerts.8b2089e8ab434c906dc9.js",
    "revision": "49f6bbfd74b22576384acbeb13978150"
  },
  {
    "url": "/_nuxt/pages/contact.51a80768d599c902de51.js",
    "revision": "7b5860eb0e8b8ffad746ee9e29d00483"
  },
  {
    "url": "/_nuxt/pages/design.ff2d8b34ab756139f64e.js",
    "revision": "6b61f0049ca702b427bb9bf874a51058"
  },
  {
    "url": "/_nuxt/pages/dir.d8c31e89cc770d4733ed.js",
    "revision": "97c3eb5ad8ca2979597c89bee2fb06ec"
  },
  {
    "url": "/_nuxt/pages/emailpage.fbc744f870a92f3d3350.js",
    "revision": "1090eec59aa37f9de88b81060ae44650"
  },
  {
    "url": "/_nuxt/pages/feedback.7c79c821633f666669ce.js",
    "revision": "35352870d2904fa183337f5e482dc93c"
  },
  {
    "url": "/_nuxt/pages/hostgen.ad23072b89879120a40b.js",
    "revision": "ecdf3a00749d7c9769cff1aeb6a9160b"
  },
  {
    "url": "/_nuxt/pages/index.c172573d12463a42b13b.js",
    "revision": "cfaa476d40360f979e5f1a7261ed1f3d"
  },
  {
    "url": "/_nuxt/pages/join.5781d51ef731f3aac656.js",
    "revision": "3909ffe5a27c1a3a6de0a759592f7289"
  },
  {
    "url": "/_nuxt/pages/news.5fc233fda5acd1244dd7.js",
    "revision": "f4f350d398498e37debcee5adcf69395"
  },
  {
    "url": "/_nuxt/pages/newspage.a56c15d3da3694d1ae4d.js",
    "revision": "184489300bd0a7becf45aace5cd3929d"
  },
  {
    "url": "/_nuxt/pages/orgs.b1f85dbf51c01fb3db52.js",
    "revision": "3aaca5286096c9775d18b2300516195b"
  },
  {
    "url": "/_nuxt/pages/policies.656557e662de72f05546.js",
    "revision": "0e6aa0ca92b63bbc442c3978cd4ff3e5"
  },
  {
    "url": "/_nuxt/pages/signedup.8832df6bf4eb811cdb7c.js",
    "revision": "0ea01e4f9eab23764ceda970be3a277d"
  },
  {
    "url": "/_nuxt/pages/subscribe.e507692033279ba9383b.js",
    "revision": "5c5e53bb2dd07d4cb3984164cbb320e1"
  },
  {
    "url": "/_nuxt/pages/Test.75f0b0962e9e1a338d81.js",
    "revision": "6bf221e3d2a1e4e4398ee04d1bb36a8a"
  },
  {
    "url": "/_nuxt/pages/updates.8f6337f1204b507f981f.js",
    "revision": "16b0787dd5a4b75a00208d6f56cc9aa9"
  },
  {
    "url": "/_nuxt/vendor.9b5b4f18a9be5d2efa8a.js",
    "revision": "fdea5987ab59f90b3bb02b2777308829"
  },
  {
    "url": "/_nuxt/img/ico_rings.2b993ed.png",
    "revision": "2b993edbbcd2d57c7507a149dd93d396"
  },
  {
    "url": "/_nuxt/img/ico.47402d8.png",
    "revision": "47402d81ca669f8d29b3c438902fd847"
  }
], {
  "cacheId": "phagedirectory",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.precaching.precacheAndRoute(['/404.html'])

workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('https://api.airtable.com/v0/appSCAap8SWbFRtu0/.*'), workbox.strategies.cacheFirst({"cacheableResponse":{"statuses":[0,200]}}), 'GET')



// offlinePage support
const strategy = workbox.strategies.networkOnly()
workbox.routing.registerRoute(new RegExp('/.*'), ({event}) => {
  return strategy.handle({event})
    .catch(() => caches.match('/404.html'))
})


