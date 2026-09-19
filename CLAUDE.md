# claude-tips

Documentation pédagogique **en français** sur Claude Code (l'outil en ligne de commande d'Anthropic), destinée à des débutants. Objectif : rendre la [doc officielle](https://code.claude.com/docs) compréhensible, avec du vocabulaire simple et des exemples concrets copiables. Site d'abord personnel, potentiellement public plus tard.

## Stack

- **Nuxt 4** + **Nuxt UI 4** + **Nuxt Content 3**, à partir du template [`nuxt-ui-templates/docs`](https://github.com/nuxt-ui-templates/docs)
- Gestionnaire de paquets : **pnpm** (`packageManager` figé dans `package.json`)
- Modules additionnels du template : `nuxt-og-image` (images OG auto), `nuxt-llms` (génère `/llms.txt`), `@nuxtjs/mcp-toolkit` (expose `/mcp`, un serveur MCP qui permet à un client comme Claude Code de lire directement le contenu du site — cohérent avec le sujet)

## Commandes utiles

```bash
pnpm install       # installer les dépendances
pnpm dev           # serveur de dev sur http://localhost:3000
pnpm lint          # eslint (zéro erreur exigé avant commit)
pnpm typecheck     # vue-tsc
pnpm build         # build de prod — à lancer avant de considérer une étape terminée
pnpm preview       # prévisualiser le build de prod
```

## Comment fonctionne le contenu (Nuxt Content)

- **Navigation** : le dossier `content/` = le menu. Les sous-dossiers sont préfixés par un nombre (`1.demarrer`, `2.usage-quotidien`, ...) qui fixe l'ordre d'affichage ; le préfixe n'apparaît pas dans l'URL. Chaque dossier a un `.navigation.yml` (`title`, `icon` optionnel) qui nomme la section dans le menu. L'arbre de navigation est généré automatiquement (`queryCollectionNavigation('docs')`) — ne jamais le déclarer à la main.
- **Deux collections** (`content.config.ts`) : `landing` = `content/index.md` uniquement (page d'accueil, composants `u-page-hero`/`u-page-section`/`u-page-cta`) ; `docs` = toutes les autres pages (sidebar + ToC + recherche).
- **Frontmatter** type d'une page :
  ```yaml
  title: Titre affiché
  description: Résumé utilisé pour le <head> et le fil d'Ariane
  navigation:
    icon: i-lucide-xxx   # icône dans le menu
  ```
  `seo.title` / `seo.description` optionnels pour surcharger le `<head>` sans changer le titre affiché sur la page.

## Composants MDC à utiliser (jamais de HTML custom)

Callouts : `::note` / `::tip` / `::warning` / `::caution` (pas de prop `title` — mettre le titre en gras dans le corps du texte). Structure : `::card` / `::card-group`, `::accordion`, `::badge`, `::collapsible`, `::field` / `::field-group`, `:icon`, `:kbd`, `::tabs`, `::steps{level="N"}` (numérote les titres de niveau N). Code : blocs avec nom de fichier `` ```ts [nuxt.config.ts] ``, surlignage `{4-5}`, `::code-group` (onglets), `::code-tree`, `::code-preview`, `::code-collapse`.

Attention à la profondeur des `:` quand un bloc en contient un autre (ex. `::code-group` imbriqué dans `::warning` doit utiliser `:::`).

## Convention de rédaction (une page = ce plan, dans cet ordre)

1. En une phrase : c'est quoi et pourquoi ça sert
2. Quand l'utiliser
3. Exemple minimal copiable
4. Exemple réaliste
5. Pièges fréquents (en `::warning` / `::caution` / `::note`)
6. Lien(s) vers la page officielle correspondante pour aller plus loin

Ton : clair, direct, **tutoiement**, zéro jargon non expliqué. Chaque info technique (commande, flag, comportement par défaut) doit être vérifiée dans la doc officielle (`https://code.claude.com/docs`, index complet sur `https://code.claude.com/docs/llms.txt`) — en cas de doute, le signaler plutôt que d'inventer. L'outil évolue vite : ne pas se fier uniquement à la mémoire du modèle.

Page de référence de style déjà écrite : [`content/1.demarrer/2.installation-premier-lancement.md`](content/1.demarrer/2.installation-premier-lancement.md).

## Arborescence du contenu

Validée avec l'utilisateur le 2026-09-19. État : ✅ écrite, ⏳ pas encore rédigée (dossier/fichier à créer).

- **1. Démarrer** (`1.demarrer/`)
  - ⏳ Vue d'ensemble — c'est quoi Claude Code
  - ✅ Installation et premier lancement (`2.installation-premier-lancement.md`)
  - ⏳ Authentification
  - ⏳ Premier vrai cas d'usage (quickstart)
  - ⏳ L'interface du mode interactif
- **2. Utilisation quotidienne** (`2.usage-quotidien/`)
  - Modes de permission (normal / plan / auto-accept), raccourcis clavier, commandes slash intégrées, gérer le contexte (`/compact`, `/clear`), checkpoints/rewind, sessions, workflows courants, bonnes pratiques
- **3. Mémoire & configuration** (`3.memoire-configuration/`)
  - `CLAUDE.md` et mémoire auto, fichiers de settings (user/projet/local) et priorité, permissions en détail, modèle/fast mode/output styles, personnaliser le terminal (statusline, rendu, accessibilité)
- **4. Étendre Claude Code** (`4.etendre/`)
  - Commandes personnalisées, subagents, skills, hooks, MCP, plugins
- **5. Automatiser** (`5.automatiser/`)
  - Mode headless (`-p`) et scripts, GitHub Actions / GitLab CI, tâches planifiées (`/loop`, routines)
- **6. Agent SDK** (`6.agent-sdk/`)
  - Vue d'ensemble et quickstart, boucle agentique, sessions et streaming, outils personnalisés et MCP, permissions et hooks dans le SDK, références TypeScript/Python
- **7. Recettes** (`7.recettes/`)
  - Cas d'usage bout en bout — liste à définir, section vide pour l'instant
- **8. Référence rapide** (`8.reference/`)
  - CLI reference, variables d'environnement, glossaire, erreurs courantes

**Hors périmètre pour l'instant** (noté comme piste future, pas de page créée) : les autres surfaces de Claude Code (VS Code, JetBrains, Desktop, Web, mobile, Slack) et la partie entreprise/admin (déploiement, gateways, SSO). À reconsidérer plus tard si le site devient plus large que l'usage terminal.

## À ne pas oublier

- Dépôt : [github.com/RomainRodrigues/claude-tips](https://github.com/RomainRodrigues/claude-tips) — déjà renseigné dans `app/app.config.ts` (`header.links`, `footer.links`, `toc.bottom.edit`).
- `nuxt.config.ts` → `llms.domain` reste un placeholder (`claude-tips.example.com`) — à remplacer par l'URL de déploiement définitive une fois le site en ligne.
- `nuxt.config.ts` → `llms.sections` référence déjà les 8 sections validées ci-dessus (filtres par préfixe de chemin) ; `/llms.txt` inclura chaque section au fur et à mesure qu'elle sera peuplée, aucune modification nécessaire en ajoutant du contenu.
