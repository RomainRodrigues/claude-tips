export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'Claude Code, expliqué simplement'
  },
  header: {
    title: 'Claude Code, expliqué simplement',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/RomainRodrigues/claude-tips',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  footer: {
    credits: `Guide non officiel sur Claude Code • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/RomainRodrigues/claude-tips',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  toc: {
    title: 'Sommaire',
    bottom: {
      title: 'Ressources',
      edit: 'https://github.com/RomainRodrigues/claude-tips/edit/main/content',
      links: [{
        icon: 'i-lucide-book-open',
        label: 'Doc officielle Claude Code',
        to: 'https://code.claude.com/docs',
        target: '_blank'
      }]
    }
  }
})
