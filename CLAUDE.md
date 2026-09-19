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

Validée avec l'utilisateur le 2026-09-19. Rédaction complète (8/8 sections) le 2026-09-19.

- **1. Démarrer** (`1.demarrer/`) ✅ — vue d'ensemble, installation et premier lancement, authentification, premier vrai cas d'usage (quickstart), interface du mode interactif
- **2. Utilisation quotidienne** (`2.usage-quotidien/`) ✅ — modes de permission, raccourcis clavier, commandes slash, gérer le contexte (`/compact`, `/clear`), checkpoints/rewind, sessions, workflows courants, bonnes pratiques
- **3. Mémoire & configuration** (`3.memoire-configuration/`) ✅ — `CLAUDE.md` et mémoire auto, fichiers de settings (user/projet/local) et priorité, permissions en détail, modèle/fast mode/output styles, personnaliser le terminal
- **4. Étendre Claude Code** (`4.etendre/`) ✅ — commandes personnalisées, subagents, skills, hooks, MCP, plugins
- **5. Automatiser** (`5.automatiser/`) ✅ — mode headless (`-p`) et scripts, GitHub Actions / GitLab CI, tâches planifiées (`/loop`, routines)
- **6. Agent SDK** (`6.agent-sdk/`) ✅ — vue d'ensemble et quickstart, boucle agentique, sessions et streaming, outils personnalisés et MCP, permissions et hooks dans le SDK, références TypeScript/Python
- **7. Recettes** (`7.recettes/`) ✅ — 5 cas d'usage bout en bout (bug fix, tests, refactor sécurisé, revue de PR en CI, brancher sa doc via MCP)
- **8. Référence rapide** (`8.reference/`) ✅ — CLI reference, variables d'environnement, glossaire, erreurs courantes

**Hors périmètre pour l'instant** (noté comme piste future, pas de page créée) : les autres surfaces de Claude Code (VS Code, JetBrains, Desktop, Web, mobile, Slack) et la partie entreprise/admin (déploiement, gateways, SSO). À reconsidérer plus tard si le site devient plus large que l'usage terminal.

**Convention de lien interne** : toujours utiliser le chemin sans le préfixe numérique du dossier — `[Sessions](/usage-quotidien/sessions)`, jamais `/2.usage-quotidien/6.sessions`. Nuxt Content retire les préfixes numériques des routes réelles ; un lien qui les garde renvoie une 404. Un lien vers la racine d'une section (`/usage-quotidien` seul) 404 aussi : il n'y a pas de page d'index par section, seulement des pages enfants — toujours lier une page précise.

## Points de vigilance restants (relecture humaine conseillée)

- `content/8.reference/4.erreurs-courantes.md` : la page officielle source (`errors.md`) a refusé une extraction verbatim ; le contenu s'appuie sur des erreurs génériques bien connues plutôt qu'une table exhaustive vérifiée mot pour mot. À enrichir si besoin d'exhaustivité.
- `content/8.reference/2.variables-denvironnement.md` : la page officielle (`env-vars.md`) est très longue et le fetch a été tronqué après les variables en A–C ; le reste du tableau s'appuie sur des mentions croisées dans d'autres pages plutôt que la table complète. À revérifier si une variable précise manque.
- Les liens internes ont été audités et corrigés une fois (préfixes numériques retirés) — si de nouvelles pages sont ajoutées, re-vérifier ce point avant de committer.

## Déploiement (Cloudflare Workers)

Preset Nitro : `cloudflare-module` (nom interne du preset moderne "Workers + assets statiques" ; son `stdName` est `cloudflare_workers`, mais seul `cloudflare-module` — ou `cloudflare` tout court — se résout correctement avec la date de compatibilité du projet : voir `nitropack/dist/presets/cloudflare/preset.mjs`).

```bash
pnpm build:cloudflare   # NITRO_PRESET=cloudflare-module nuxt build
pnpm deploy             # build + wrangler deploy + seed D1 (usage local, nécessite `pnpm approve-builds` une fois)
pnpm db:seed            # réinjecte le contenu dans D1 sans redéployer le Worker
```

Points spécifiques découverts en mettant ça en place (à ne pas re-découvrir à froid) :

- **`@nuxt/content` bascule automatiquement sur Cloudflare D1** (binding `DB`) dès que le preset contient "cloudflare" — pas de SQLite sur Workers. Il faut une base D1 créée côté Cloudflare (`wrangler d1 create claude-tips-content`), son `database_id` renseigné dans `wrangler.jsonc`, et la réinjecter à chaque déploiement (le contenu ne se resynchronise pas tout seul).
- **Les dumps de contenu (`.output/public/dump.<collection>.sql`) ne sont pas du SQL brut** : c'est un tableau JSON de requêtes, gzippé puis encodé en base64 (pensé pour être décompressé côté HTTP, pas lu tel quel sur disque). `scripts/seed-d1.mjs` fait cette décompression avant de générer de vrais fichiers `.sql` dans `.output/d1/`, consommables par `wrangler d1 execute --file`.
- **`@nuxtjs/mcp-toolkit` a besoin du paquet `agents`** (déjà ajouté aux dépendances) pour servir `/mcp` sur Cloudflare — sans lui, le build échoue (`Cannot resolve "agents/mcp"`). Bonne nouvelle : la fonction utilisée (`createMcpHandler`) est stateless, donc **pas besoin de Durable Object** ni de binding supplémentaire pour ça.
- **`wrangler` (devDependency) a un postinstall (`workerd`) ignoré par pnpm par défaut** (`ERR_PNPM_IGNORED_BUILDS`, non bloquant pour `pnpm install`/le CI). Pour lancer `wrangler` en local (`pnpm deploy`, `pnpm db:seed`), il faut d'abord `pnpm approve-builds` une fois. En CI, `.github/workflows/deploy.yml` passe par `cloudflare/wrangler-action`, qui gère son propre wrangler et n'est pas concerné.
- Le warning `[cloudflare] Node.js compatibility is not enabled` disparaît une fois `wrangler.jsonc` présent à la racine avec `compatibility_flags: ["nodejs_compat"]` (déjà fait).
- `nuxt-og-image` a une liste figée de presets Cloudflare connus (`cloudflare`, `cloudflare-pages`, `cloudflare-module`, `cloudflare-durable`) — il ne reconnaît pas `cloudflare_workers`/`cloudflare-workers` (stdName). Utiliser `cloudflare-module` évite un warning inutile ; `ogImage.zeroRuntime: true` rend de toute façon ce détail sans impact réel (les images OG sont déjà générées au build).

**Reste à faire côté compte Cloudflare (pas faisable sans les identifiants de l'utilisateur)** :
1. `wrangler login` (ou un token) puis `wrangler d1 create claude-tips-content` → reporter le `database_id` dans `wrangler.jsonc`.
2. Ajouter les secrets GitHub `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` (repo Settings → Secrets and variables → Actions).
3. Le domaine cible est `claude.romrd.fr` (déjà renseigné dans `wrangler.jsonc` et `nuxt.config.ts` → `llms.domain`) — vérifier que sa zone DNS est bien gérée par Cloudflare avant le premier déploiement, sinon `custom_domain: true` échouera.
4. Premier déploiement manuel conseillé (`pnpm deploy` en local) avant de laisser la CI prendre le relai sur chaque push `main`.

## À ne pas oublier

- Dépôt : [github.com/RomainRodrigues/claude-tips](https://github.com/RomainRodrigues/claude-tips) — déjà renseigné dans `app/app.config.ts` (`header.links`, `footer.links`, `toc.bottom.edit`).
- `nuxt.config.ts` → `llms.domain` est réglé sur `https://claude.romrd.fr/`, le domaine cible du déploiement (voir section Déploiement ci-dessus).
- `nuxt.config.ts` → `llms.sections` référence les 8 sections ci-dessus (filtres par préfixe de chemin) ; `/llms.txt` les reflète déjà toutes.
