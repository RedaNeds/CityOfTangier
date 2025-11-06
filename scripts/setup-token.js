// Charger les variables d'environnement
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

console.log(`
🔑 Configuration du token API Sanity

Pour créer un token API :

1. Allez sur https://sanity.io/manage
2. Sélectionnez votre projet "City of Tangier" (ID: 0lav3g2f)
3. Allez dans l'onglet "API"
4. Cliquez sur "Add API token"
5. Donnez un nom au token (ex: "Migration Token")
6. Laissez les permissions par défaut
7. Copiez le token généré

Ensuite, ajoutez le token à votre fichier .env.local :
SANITY_API_TOKEN=votre-token-ici

Ou exportez-le temporairement :
export SANITY_API_TOKEN=votre-token-ici

Puis relancez la migration :
npm run migrate:sanity
`)

// Vérifier si le token est configuré
if (process.env.SANITY_API_TOKEN) {
  console.log('✅ Token API détecté!')
  console.log(`Token: ${process.env.SANITY_API_TOKEN.substring(0, 20)}...`)
} else {
  console.log('❌ Aucun token API trouvé. Veuillez suivre les instructions ci-dessus.')
}
