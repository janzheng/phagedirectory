
const pkg = require('./package')

// note: nuxt requires Node 8+ to run properly 

// dynamic imports for SSR
import Cytosis from './other/cytosis'
import axios from 'axios'
// import { loadNews } from './other/loaders'


// https://github.com/joshbuchea/HEAD  https://gethead.info/
// these are the default social sharing items
// make sure to use the Head component for generated data
const site_policy = '1.0.3' 
// 1.0.3: added Hot Jar and improved granularity; still probably needs a lot of tweaking

const site_ga = 'UA-109657404-1' 
const site_url = 'https://phage.directory'
const site_name = 'Phage Directory';
const site_twitter = '@phagedirectory';
const site_twitter_creator = '@yawnxyz';
const site_color = '#374F6A';
const site_title = 'Phage Directory';
const site_description = 'Phage Directory curates a database of phage labs, phages, and host strains to advance research and phage therapy.';

// const site_ico = '/ico_dull.png';
const site_ico = '/_ico.png';
const site_image = '/share_img.png';
const site_search = 'index,follow';
const site_author = 'Jan Zheng';
const page_name = ''; // placeholder for the copy+paste

const site_fb = '172737416727733'; // buildAtl fb id

const airtable_api = 'keyAe6M1KoPfg25aO'; // cytosisreader@zeee.co handler
const airtable_base = 'appSCAap8SWbFRtu0';

const analyze = false; // analyzer (webpack; turn off for prod)
const offline = false;
let mode = 'universal' 
// 'spa' loads airtable dynamically
// 'static' only generates once / use npm run generate
// const mode = 'universal' // loads airtable during build-time only (any changes to airtable won't be reflected live)
if (process.env.NODE_ENV == 'spa') {
  console.log('RUNNING IN SPA MODE')
  mode = 'spa'
}

const site_static = true; // if set to true, the client will never pull data 

let site_routes; // used for the generate process to save on airtable pulls

// load cytosis data here, for easier generation
const initData = async function() {
  console.log('initData loading ...')
  // use sparingly; this data makes it into all generated html files
  let cytosis = await new Cytosis({
    airKey: airtable_api, 
    airBase: airtable_base, 
    tableQuery: '_all', 
  })
  console.log('initData loaded!')
  return cytosis
}



// In your `feed` array:
const createFeed = async function(feed) {
  feed.options = {
    title: 'My blog',
    link: 'https://lichter.io/feed.xml',
    description: 'This is my personal feed!'
  }

  const posts = await (axios.get('https://blog-api.lichter.io/posts')).data
  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      content: post.content
    })
  })

  feed.addCategory('Nuxt.js')

  feed.addContributor({
    name: 'Alexander Lichter',
    email: 'example@lichter.io',
    link: 'https://lichter.io/'
  })
}







module.exports = (async function() {

  let site_data
  if (mode == 'universal') 
    site_data = await initData()

  // console.log('site_data:', site_data)

  let obj = {
    // export default {
    // mode: 'universal', // use this for deployment; need to rebuild the site every time airtable content changes
    mode: mode, // for development, or for real-time airtable changes
    env: {
      mode: mode,
      site_fb: site_fb,
      airtable_api: airtable_api,  
      airtable_base: airtable_base,
      site_policy: site_policy,
      ext_handler: 'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/phdir-input',
      site_data: site_data,
      site_static: site_static,
    },

    render: {
      // https://nuxtjs.org/api/configuration-render#resourcehints
      // disable prefetch of all the pages; saves bg download data
      // resourceHints: false,

      // Content-Security-Policy
      // https://nuxtjs.org/api/configuration-render#csp
      // csp: {
      //   hashAlgorithm: 'sha256',
      //   allowedSources: undefined,
      //   policies: undefined
      // }
    },


    /*
        Headers of the page
        'hid' is a 'head identifier' and used as a unique key
    */
    head: {
      title: site_title,
      meta: [

        { charset: 'utf-8' },
        // { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }, // max-scale prevents auto-zoom on mobile, may prevent zoom
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        { hid: 'description', name: 'description', content: site_description },
        { hid: 'theme-color', name: 'theme-color', content: site_color },

        { hid: 'search-google', name: 'robots', content: site_search },
        { hid: 'search-robots', name: 'googlebot', content: site_search },
        // { hid: 'nositelinkssearchbox', name: 'google', content: 'nositelinkssearchbox' },
        // { hid: 'notranslate', name: 'google', content: 'notranslate' },

        // Page-Specific

        // Facebook
        // <meta property="fb:app_id" content="123456789">
        { hid: 'fb-app_id', property: 'fb:app_id', content: site_fb },
        // <meta property="og:url" content="http://example.com/page.html">
        { hid: 'og-url', property: 'og:url', content: site_url + '/' + page_name },
        // <meta property="og:type" content="website">
        { hid: 'og-type', property: 'og:type', content: 'website' },
        // <meta property="og:title" content="Content Title">
        { hid: 'og-title', property: 'og:title', content: site_title },
        // <meta property="og:image" content="http://example.com/image.jpg"> 
        // FB & Twitter work best with: 1200 X 675 
        { hid: 'og-image', property: 'og:image', content: site_url + site_image },
        // <meta property="og:description" content="Description Here">
        { hid: 'og-description', property: 'og:description', content: site_description },
        // <meta property="og:site_name" content="Site Name">
        { hid: 'og-site_name', property: 'og:site_name', content: site_name },
        // <meta property="og:locale" content="en_US">
        { hid: 'og-locale', property: 'og:locale', content: 'en_US' },
        // <meta property="article:author" content="">
        { hid: 'article-author', property: 'article:author', content: site_author },

        // Twitter Card
        // <meta name="twitter:card" content="summary"> > summary or summary_large_image
        { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
        // <meta name="twitter:site" content="@site_account">
        { hid: 'twitter-site', property: 'twitter:site', content: site_twitter },
        // <meta name="twitter:creator" content="@individual_account">
        { hid: 'twitter-creator', property: 'twitter:creator', content: site_twitter_creator },
        // <meta name="twitter:url" content="http://example.com/page.html">
        { hid: 'twitter-url', property: 'twitter:url', content: site_url + '/' + page_name },
        // <meta name="twitter:title" content="Content Title">
        { hid: 'twitter-title', property: 'twitter:title', content: site_title },
        // <meta name="twitter:description" content="Content description less than 200 characters">
        { hid: 'twitter-description', property: 'twitter:description', content: site_description },
        // <meta name="twitter:image" content="http://example.com/image.jpg">
        { hid: 'twitter-image', property: 'twitter:image', content: site_url + site_image },

      ],
      link: [

        // <!-- Helps prevent duplicate content issues -->
        // <link rel="canonical" href="http://example.com/">
        { hid: 'canonical', rel: 'canonical', href: site_url+'/' },

        { rel: 'icon', type: 'image/png', href: site_ico }, // <link rel="icon" sizes="192x192" href="/path/to/icon.png">
        { rel: 'apple-touch-icon', href: site_ico }, // default resolution is 192x192 <link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png">
        { rel: 'mask-icon',  href: site_ico, color: site_color}, // <link rel="mask-icon" href="/path/to/icon.svg" color="blue"> <!-- Safari Pinned Tab Icon -->
        // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=PT+Serif' }
      ],
    },

    /*
    ** Customize the progress bar color
    */
    loading: { color: site_color },

    /*
    ** Build configuration
    */

    plugins: [
      // '~plugins/filters.js',nuxtjs/google-tag-manager
      // '~plugins/vue-highlightjs.js',
      // { src: '~/plugins/plugintest.js', ssr: false }
      { src: '~/plugins/policy.js', ssr: false },
      { src: '~/plugins/hotjar.js', ssr: false }, // need to link this to policy
      { src: '~/plugins/mixpanel.js', ssr: false },
      { src: '~/plugins/markdownit.js' },
      { src: '~/plugins/cytosis.js' },
      { src: '~/plugins/date.js' },
      { src: '~/plugins/twitter.js', ssr: false },
      { src: '~/plugins/disqus.js', ssr: false },
    ],

    modules: [
      // '@nuxtjs/font-awesome',
      ['@nuxtjs/google-analytics', {
        id: site_ga,
        // disabled: true // gdpr, policy.js enables it: https://medium.com/dailyjs/google-analytics-gdpr-and-vuejs-e1bd6affd2b4
      }],
      ['@nuxtjs/google-tag-manager', { 
        id: 'GTM-WCR3X43' 
      }],
      '@nuxtjs/pwa',
    ],

    manifest: {
      name: 'Phage Directory',
      short_name: 'phagedirectory',
      display: 'standalone',
      start_url: 'https://phage.directory/',
      theme_color: site_color,
      background_color: '#FFFFFF',
      lang: 'en',
      // icons: PWAIcons
    },

    workbox: {
      globPatterns: ['**/*.{js,css}', '**/img/*'],
      offlinePage: '/404.html',
      generate: {
        fallback: true
      },
      // this breaks SPA mode, and is super aggressive, but makes offline mode work really well
      // runtimeCaching: [
      //   {
      //     urlPattern: 'https://api.airtable.com/v0/appSCAap8SWbFRtu0/.*',
      //     handler: 'cacheFirst',
      //     method: 'GET',
      //     strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
      //   },
      //   // {
      //   //     urlPattern: 'https://fonts.googleapis.com/.*',
      //   //     handler: 'cacheFirst',
      //   //     method: 'GET',
      //   //     strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
      //   // },
      //   // {
      //   //     urlPattern: 'https://fonts.gstatic.com/.*',
      //   //     handler: 'cacheFirst',
      //   //     method: 'GET',
      //   //     strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
      //   // },
      // ]
    },

    build: {
      // helps cache busting
      filenames: {
        app: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
        // chunk: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
        css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css'
      },

      // https://willbrowning.me/reducing-the-vendor-bundle-size-in-nuxt-js/
      // analyze: analyze, use --analyze instead for visualizer
      minimize: true,
      // cache: true,
      extractCSS: true, // moves css out to its own file in gen
      optimizeCSS: true,

      // splitChunks: {
      //   layouts: true
      // },

      babel: {
        sourceType: "unambiguous",
        presets: [
          ['@babel/preset-env', {
            // debug: true,
            useBuiltIns: 'usage',
            targets: {
              "browsers": ["> 1%", "ie >= 11", "not ie <= 8"]
              // "browsers": ["> 1%", "last 2 versions", "ie >= 11", "not ie <= 8"]
            }
          }]
        ],
        plugins: ['@babel/plugin-transform-arrow-functions', '@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-typeof-symbol', '@babel/plugin-transform-runtime'],
      },
      // explicitly transpile these
      transpile: ['cytosis', 'vuex-cache', 'markdownit', 'markdown-it-attrs'],
      // transpile: ['cytosis', 'vuex-cache', 'markdownit'],

      // extend(config, ctx) {
      //   // Run ESLint on save
      //   if (ctx.isDev && ctx.isClient) {
      //     config.module.rules.push({
      //       enforce: "pre",
      //       test: /\.(js|vue)$/,
      //       loader: "eslint-loader",
      //       exclude: /(node_modules)/
      //     })
      //   }
      // }
    },


    css: [
      // coeur style guide
      // '@/assets/css/settings.scss',
      // '@/node_modules/coeur/styles/index.scss', // this imports EVERYTHING; is going to be huge; overrides 'settings'

      // main project styles
      '@/assets/css/main.scss'
    ],

    router: {
      // middleware: 'pageload', // middleware added on the template
      extendRoutes (routes, resolve) {
        // capsid should resolve anything from phages
        // to people and orgs; easier w/ a uniform id resolver
        routes.push(
          // {
          //   name: 'capsid',
          //   path: '/d/:capsid',
          //   component: resolve(__dirname, 'pages/Dir.vue')
          // },
          {
            name: 'capsid',
            path: '/capsid',
            component: resolve(__dirname, 'pages/capsidlist.vue')
          },
          {
            // always shows the latest capsid; GOES BEFORE capsidIssue / capsid/:slug
            name: 'capsidLatest',
            path: '/capsid/latest',
            component: resolve(__dirname, 'pages/capsidlatest.vue')
          },
          {
            // opens each issue separately, good for deeplinking, possibly comments
            name: 'capsidIssue',
            path: '/capsid/:slug',
            component: resolve(__dirname, 'pages/capsidissue.vue')
          },
          {
            // email-generated issue to be pasted into mailchimp
            name: 'capsidEmail',
            path: '/capsidemail/:slug',
            component: resolve(__dirname, 'pages/capsidemail.vue')
          },

          {
            name: 'search',
            path: '/search/:searchstr',
            component: resolve(__dirname, 'pages/directory.vue')
          },
          {
            name: 'phages',
            path: '/phages',
            component: resolve(__dirname, 'pages/directory.vue')
          },
          {
            name: 'hosts',
            path: '/hosts',
            component: resolve(__dirname, 'pages/directory.vue')
          },
          {
            name: 'organisms',
            path: '/organisms',
            component: resolve(__dirname, 'pages/directory.vue')
          },
          {
            name: 'diseases',
            path: '/diseases',
            component: resolve(__dirname, 'pages/directory.vue')
          },
          {
            name: 'antibiotics',
            path: '/antibiotics',
            component: resolve(__dirname, 'pages/directory.vue')
          },
          // {
          //   name: 'orgs',
          //   path: '/orgs',
          //   component: resolve(__dirname, 'pages/directory.vue')
          // },
          {
            name: 'labs',
            path: '/labs',
            component: resolve(__dirname, 'pages/directory.vue')
          },

          {
            // opens each issue separately, good for deeplinking, possibly comments
            name: 'jobs',
            path: '/jobs',
            component: resolve(__dirname, 'pages/joblist.vue')
          },
          {
            // opens each issue separately, good for deeplinking, possibly comments
            name: 'job',
            path: '/jobs/:slug',
            component: resolve(__dirname, 'pages/jobpage.vue')
          },

          // {
          //   name: 'people',
          //   path: '/people',
          //   component: resolve(__dirname, 'pages/directory.vue')
          // },
          // {
          //   name: 'apply',
          //   path: '/projects/:id/apply',
          //   component: resolve(__dirname, 'pages/ApplyPage.vue')
          // },

          // news alerts
          // {
          //   name: 'alerts',
          //   path: '/alerts/:id',
          //   component: resolve(__dirname, 'pages/alerts.vue')
          // },


          // blog / news / 'viral' newsletter; resolves to generic Blog page
          // {
          //   name: 'Update.item',
          //   path: '/updates/:slug',
          //   component: resolve(__dirname, 'pages/Updates.vue')
          // },
          // { // split up into the news component
          //   name: 'News',
          //   path: '/news',
          //   component: resolve(__dirname, 'pages/Blog.vue')
          // },
          // {
          //   name: 'News.item',
          //   path: '/news/:slug',
          //   component: resolve(__dirname, 'pages/Blog.vue')
          // },
          // {
          //   name: 'Updates',
          //   path: '/updates',
          //   component: resolve(__dirname, 'pages/Blog.vue')
          // },
          // {
          //   name: 'Updates.item',
          //   path: '/updates/:slug',
          //   component: resolve(__dirname, 'pages/updates.vue')
          // },

          // other resolvers
          {
            name: 'questions',
            path: '/questions',
            component: resolve(__dirname, 'pages/feedback.vue')
          },
          {
            name: 'legal',
            path: '/legal',
            component: resolve(__dirname, 'pages/policies.vue')
          },



          // experimental
          {
            name: 'phagefutures-alt',
            path: '/phage-futures',
            component: resolve(__dirname, 'pages/phagefutures.vue')
          },
          {
            name: 'phagefutures-agenda',
            path: '/phagefutures/agenda',
            component: resolve(__dirname, 'pages/phagefutures.vue')
          },
          {
            name: 'phagefutures-posters',
            path: '/phagefutures/posters',
            component: resolve(__dirname, 'pages/phagefutures.vue')
          },
          {
            name: 'phagefutures-about',
            path: '/phagefutures/about',
            component: resolve(__dirname, 'pages/phagefutures.vue')
          },
          // {
          //   name: 'phagefutures-feedback',
          //   path: '/phage-futures/feedback',
          //   component: resolve(__dirname, 'pages/phagefutures.vue')
          // },



          // {
          //   name: 'phagefutures-agenda',
          //   path: '/phagefutures/agenda',
          //   component: resolve(__dirname, 'pages/phagefutures.vue')
          // },
          // {
          //   name: 'phagefutures-posters',
          //   path: '/phagefutures/posters',
          //   component: resolve(__dirname, 'pages/phagefutures.vue')
          // },
          // {
          //   name: 'phagefutures-about',
          //   path: '/phagefutures/about',
          //   component: resolve(__dirname, 'pages/phagefutures.vue')
          // },
          // {
          //   name: 'phagefutures-feedback',
          //   path: '/phagefutures/feedback',
          //   component: resolve(__dirname, 'pages/phagefutures.vue')
          // },
        )
      },

    },
    generate: {
      interval: 500, // slow down api calls // https://nuxtjs.org/api/configuration-generate/
      // fallback: false, // if you want to use '404.html' — for surge, use false if you want to use 200 spa fallback
      // concurrency: 1, // reduce server strain
      routes: async function (callback) {

        const airKey = airtable_api
        const airBase = airtable_base

        // only generate once
        if(!site_routes) {
          console.log('[generator]: fetch from cytosis')
          site_routes = await new Cytosis({
            airKey, 
            airBase, 
            tableQuery: '_gen-routes',
            caller: 'generator'
          })
        }

        let routeList = []

        // build C&T issues
        let ctr = 0
        for (let capsid of site_routes.tables['C&T']) {
          if(capsid.fields['Slug'])
            if(ctr > 5) {
              break
            } else {
              console.log('adding Capsid: ', capsid.fields['Slug'])
              routeList.push(`/capsid/${capsid.fields['Slug']}`)
              ctr = ctr + 1
            }
        }

        // // build Jobs pages
        for (let jobs of site_routes.tables['Jobs']) {
          if(jobs.fields['Slug'])
            routeList.push(`/jobs/${jobs.fields['Slug']}`)
        }

        console.log('[generator] routes: ', routeList)
        callback(null, routeList)
      }
    }

  }

  return obj
})()






