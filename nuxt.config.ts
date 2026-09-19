// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    '@nuxtjs/mcp-toolkit'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // TODO: mettre à jour `domain` avec l'URL de déploiement définitive, et
  // les `sections` avec les vraies sections une fois l'arborescence validée.
  llms: {
    domain: 'https://claude-tips.example.com/',
    title: 'Claude Code, expliqué simplement',
    description: 'Documentation pédagogique en français sur Claude Code, l\'outil en ligne de commande.'
  },

  mcp: {
    name: 'Claude Code, expliqué simplement'
  },

  ogImage: {
    zeroRuntime: true
  }
})
