---
seo:
  title: Claude Code, expliqué simplement
  description: La doc officielle de Claude Code, rendue lisible pour un débutant : fonctionnalités expliquées simplement, avec des exemples concrets.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
Claude Code, [expliqué simplement]{.text-primary}.

#description
La doc officielle est complète mais dense. Ici, chaque fonctionnalité de Claude Code est expliquée en français, avec du vocabulaire simple et des exemples que tu peux copier-coller directement dans ton terminal.

#links
  :::u-button
  ---
  to: /demarrer/vue-densemble
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Commencer
  :::

  :::u-button
  ---
  icon: i-lucide-external-link
  color: neutral
  variant: outline
  size: xl
  to: https://code.claude.com/docs
  target: _blank
  ---
  Doc officielle
  :::

#default
  :::prose-pre
  ---
  code: |
    cd mon-projet
    claude
  filename: Terminal
  ---

  ```bash [Terminal]
  cd mon-projet
  claude
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Pourquoi ce site

#features
  :::u-page-feature
  ---
  icon: i-lucide-graduation-cap
  ---
  #title
  Pensé pour débuter

  #description
  Zéro jargon non expliqué. Chaque notion est introduite avec le vocabulaire minimal nécessaire pour comprendre, pas plus.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-terminal
  ---
  #title
  Des exemples copiables

  #description
  Chaque page propose un exemple minimal et un exemple réaliste, directement utilisables dans ton terminal.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-triangle-alert
  ---
  #title
  Les pièges connus

  #description
  Les erreurs fréquentes et les comportements surprenants sont signalés dans des encarts dédiés.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-refresh-cw
  ---
  #title
  À jour avec l'outil

  #description
  Claude Code évolue vite. Ce site est vérifié régulièrement par rapport à la documentation officielle.
  :::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Commencer
      to: /demarrer/vue-densemble
      trailingIcon: i-lucide-arrow-right
    - label: Voir la doc officielle
      to: 'https://code.claude.com/docs'
      target: _blank
      variant: subtle
      icon: i-lucide-external-link
  title: Prêt à démarrer avec Claude Code ?
  description: Parcours les sections dans l'ordre, du premier lancement jusqu'à l'automatisation.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
