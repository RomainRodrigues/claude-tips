// Nuxt Content publie le contenu de chaque collection en base64+gzip d'un
// tableau JSON de requêtes SQL (`.output/public/dump.<collection>.sql`), pensé
// pour être servi via HTTP (décompression faite par le navigateur/fetch), pas
// lu tel quel sur disque. Ce script refait cette décompression pour produire
// de vrais fichiers .sql, exploitables par `wrangler d1 execute --file`.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'

const collections = ['docs', 'landing']

mkdirSync('.output/d1', { recursive: true })

for (const collection of collections) {
  const raw = readFileSync(`.output/public/dump.${collection}.sql`, 'utf8')
  const statements = JSON.parse(gunzipSync(Buffer.from(raw, 'base64')).toString('utf8'))
  // `_content_info` n'est jamais droppé entre deux dumps (contrairement aux
  // tables de contenu, recréées à chaque fois) : sur un redeploy, l'INSERT
  // brut entre en conflit avec la ligne déjà présente pour ce même id.
  const sql = statements
    .join('\n')
    .replace(/INSERT INTO _content_info/g, 'INSERT OR REPLACE INTO _content_info')
  writeFileSync(`.output/d1/${collection}.sql`, sql)
}
