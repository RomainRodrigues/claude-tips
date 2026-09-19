# claude-tips

Documentation pédagogique en français sur **Claude Code**, l'outil en ligne de commande d'Anthropic — construite avec [Nuxt UI](https://ui.nuxt.com) + [Nuxt Content](https://content.nuxt.com), à partir du template [`nuxt-ui-templates/docs`](https://github.com/nuxt-ui-templates/docs).

L'objectif : rendre la [doc officielle](https://code.claude.com/docs) compréhensible pour un débutant, avec du vocabulaire simple et des exemples concrets copiables.

## Comment ce site a été rédigé

Le contenu n'est pas une traduction de la doc officielle, mais une réécriture pédagogique appuyée dessus. Concrètement :

- **Source unique de vérité** : chaque page a été écrite (ou vérifiée) à partir des pages `.md` brutes de [code.claude.com/docs](https://code.claude.com/docs), récupérées au moment de la rédaction plutôt que sorties de mémoire — l'outil évolue vite, une info d'il y a quelques mois peut déjà être fausse.
- **Rédigé avec Claude Code lui-même** : le site documente Claude Code et a été construit avec Claude Code, en mode agentique — plusieurs sous-agents ont travaillé en parallèle, un par section, chacun avec pour instruction de vérifier chaque commande/flag/comportement avant de l'écrire plutôt que de l'inventer.
- **Une page de référence de style** ([Installation et premier lancement](content/1.demarrer/2.installation-premier-lancement.md)) sert de gabarit : une phrase d'intro, quand l'utiliser, un exemple minimal, un exemple réaliste, les pièges fréquents, puis un lien vers la doc officielle pour aller plus loin.
- **Relecture humaine** : chaque section a été relue (rendu réel des pages, cohérence des liens internes, exactitude technique) avant d'être committée. Les points restés incertains sont signalés dans [CLAUDE.md](./CLAUDE.md) plutôt que dissimulés.

Le site n'a pas vocation à remplacer la doc officielle, seulement à en simplifier la première lecture — le lien vers la page correspondante est systématique en bas de chaque article.

## Développement

```bash
pnpm install
pnpm dev
```

Site disponible sur `http://localhost:3000`.

## Build

```bash
pnpm build
pnpm preview
```

Voir [CLAUDE.md](./CLAUDE.md) pour les conventions de rédaction et l'organisation du contenu.
