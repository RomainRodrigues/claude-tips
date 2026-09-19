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

  llms: {
    domain: 'https://claude.romrd.fr/',
    title: 'Claude Code, expliqué simplement',
    description: 'Documentation pédagogique en français sur Claude Code, l\'outil en ligne de commande.',
    sections: [
      {
        title: 'Démarrer',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/demarrer%' }]
      },
      {
        title: 'Utilisation quotidienne',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/usage-quotidien%' }]
      },
      {
        title: 'Mémoire & configuration',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/memoire-configuration%' }]
      },
      {
        title: 'Étendre Claude Code',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/etendre%' }]
      },
      {
        title: 'Automatiser',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/automatiser%' }]
      },
      {
        title: 'Agent SDK',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/agent-sdk%' }]
      },
      {
        title: 'Recettes',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/recettes%' }]
      },
      {
        title: 'Référence rapide',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/reference%' }]
      }
    ]
  },

  mcp: {
    name: 'Claude Code, expliqué simplement'
  },

  ogImage: {
    zeroRuntime: true
  }
})
