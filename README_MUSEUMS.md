# 🏛️ Système de Gestion des Musées - Guide Rapide

## 🎯 Résumé

Vous avez maintenant un système complet de gestion des musées intégré avec Sanity CMS. Vous pouvez créer, éditer et gérer vos musées directement depuis Sanity Studio sans toucher au code!

---

## 📁 Fichiers Créés

### Layouts & Templates
- ✅ `src/layouts/MuseumLayout.astro` - Layout principal pour les pages de musées
- ✅ `src/pages/museums/[slug].astro` - Page dynamique pour chaque musée
- ✅ `src/pages/museums/index.astro` - Page listant tous les musées
- ✅ `src/pages/museums/example-museum-template.astro` - Template d'exemple (référence)

### Sanity Schema
- ✅ `sanity/schemas/place.ts` - Schéma mis à jour avec champs spécifiques aux musées

### Scripts & Data
- ✅ `scripts/add-example-museums.js` - Script pour importer les exemples automatiquement
- ✅ `scripts/example-museums.json` - Données d'exemple en JSON

### Documentation
- ✅ `MUSEUM_SETUP_GUIDE.md` - Guide détaillé en français
- ✅ `README_MUSEUMS.md` - Ce fichier

---

## 🚀 Démarrage Rapide (3 étapes)

### Étape 1: Importer les Exemples

**Option A - Automatique (Recommandé):**

```bash
# 1. Ajoutez votre token Sanity dans .env.local
SANITY_WRITE_TOKEN=votre_token_ici

# 2. Lancez le script
node scripts/add-example-museums.js
```

**Option B - Manuel:**
Suivez le guide détaillé dans [MUSEUM_SETUP_GUIDE.md](MUSEUM_SETUP_GUIDE.md)

### Étape 2: Vérifier dans Sanity Studio

1. Ouvrez votre Sanity Studio
2. Allez dans "Place"
3. Vous devriez voir 3 musées d'exemple:
   - 🏛️ Kasbah Museum of Mediterranean Cultures
   - 📜 American Legation Museum
   - 🎨 Tangier Museum of Contemporary Art

### Étape 3: Visualiser sur le Site

```bash
# Développement
npm run dev

# Puis ouvrez:
http://localhost:4321/museums/
http://localhost:4321/museums/kasbah-museum
http://localhost:4321/museums/american-legation-museum
http://localhost:4321/museums/contemporary-art-museum
```

---

## 🎨 Ce que Vous Pouvez Éditer dans Sanity

### Informations de Base
- ✅ Titre et description
- ✅ Images (principale + galerie)
- ✅ Catégorie et tags
- ✅ Note et prix

### Informations Pratiques
- ✅ Horaires d'ouverture
- ✅ Adresse et coordonnées GPS
- ✅ Téléphone, email, site web
- ✅ Durée de visite recommandée

### Spécifique aux Musées
- ✅ **Prix d'entrée** (adulte, étudiant, enfant, senior, groupe)
- ✅ **Collections** permanentes (nom, description, image)
- ✅ **Expositions** temporaires et permanentes (avec dates)
- ✅ **Règles du musée** (liste de règles)
- ✅ **Accessibilité étendue** (audioguides, visites guidées, langues, etc.)

### Design & Présentation
- ✅ Points forts (highlights)
- ✅ Équipements (amenities)
- ✅ Conseils pour la visite

---

## 📝 Créer un Nouveau Musée

### Dans Sanity Studio:

1. **Place** → **Create new Place**
2. Remplissez les champs de base
3. **Subcategory** → Sélectionnez **"Museums"** ⭐
4. Les champs spécifiques aux musées apparaissent automatiquement!
5. Remplissez-les selon vos besoins
6. **Publish** ✓

### Guide Complet:
Consultez [MUSEUM_SETUP_GUIDE.md](MUSEUM_SETUP_GUIDE.md) pour un guide étape par étape avec captures d'écran.

---

## 🎯 Structure des URLs

```
/museums/                    → Liste de tous les musées
/museums/kasbah-museum       → Page du Kasbah Museum
/museums/[slug]              → Page de n'importe quel musée
```

Le slug est généré automatiquement à partir du titre dans Sanity.

---

## 🎨 Personnalisation du Design

### Couleurs
Les couleurs sont définies dans `src/layouts/MuseumLayout.astro`:
- Couleur principale: `#0f766e` (teal-700)
- Couleur accent: `#115e59` (teal-800)

### Modifications CSS
Toutes les classes CSS sont dans le même fichier `MuseumLayout.astro` dans la balise `<style>`.

---

## 📊 Données d'Exemple Incluses

### 🏛️ Kasbah Museum
- Type: Musée historique
- Prix: 30 MAD (€3)
- 4 collections permanentes
- 2 expositions
- Note: 4.5/5

### 📜 American Legation Museum
- Type: Musée historique/diplomatique
- Prix: Gratuit (donations)
- 4 collections permanentes
- 2 expositions permanentes
- Note: 4.7/5

### 🎨 Tangier Museum of Contemporary Art
- Type: Galerie d'art contemporain
- Prix: 50 MAD (€5)
- 4 collections
- 3 expositions (2 temporaires + 1 permanente)
- Note: 4.3/5

---

## ✅ Checklist - Ce qui est Inclus

- [x] Layout museum responsive et moderne
- [x] Intégration Sanity CMS complète
- [x] Champs spécifiques aux musées
- [x] Page de liste des musées
- [x] Pages individuelles dynamiques
- [x] SEO optimisé (structured data)
- [x] Google Maps intégré
- [x] Galerie d'images
- [x] Collections et expositions
- [x] Horaires et prix
- [x] Accessibilité
- [x] Boutons d'action (directions, partage, impression)
- [x] Design responsive (mobile, tablet, desktop)
- [x] 3 exemples de musées prêts à l'emploi
- [x] Scripts d'import automatique
- [x] Documentation complète en français

---

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Importer les exemples de musées
node scripts/add-example-museums.js

# Ouvrir Sanity Studio (si configuré)
npm run sanity
```

---

## 📚 Documentation Complète

- **[MUSEUM_SETUP_GUIDE.md](MUSEUM_SETUP_GUIDE.md)** - Guide complet étape par étape
- **[example-museum-template.astro](src/pages/museums/example-museum-template.astro)** - Template commenté
- **[example-museums.json](scripts/example-museums.json)** - Données JSON d'exemple

---

## 🐛 Problèmes Courants

### Les champs museum n'apparaissent pas
→ Vérifiez que subcategory = "museums", "art-galleries" ou "cultural-centers"

### Les images ne chargent pas
→ Vérifiez la config Sanity dans `.env.local`

### Le site ne compile pas
→ Vérifiez que toutes les dépendances sont installées: `npm install`

### Les musées n'apparaissent pas
→ Vérifiez qu'ils sont publiés dans Sanity (bouton "Publish")

---

## 🎓 Prochaines Étapes

1. ✅ Importez les exemples
2. ✅ Explorez les pages dans le navigateur
3. ✅ Éditez un musée dans Sanity Studio
4. ✅ Créez votre premier vrai musée
5. ✅ Personnalisez les couleurs/styles si besoin
6. ✅ Ajoutez de vraies images
7. ✅ Déployez!

---

## 💡 Conseils Pro

1. **Images**: Utilisez des images de haute qualité (min 1200px de large)
2. **Descriptions**: Soyez descriptif mais concis (200-300 mots max pour la description courte)
3. **Collections**: Ajoutez au moins 2-3 collections par musée
4. **Tags**: Utilisez des tags pertinents pour le SEO
5. **Coordonnées GPS**: Vérifiez-les sur Google Maps pour l'exactitude
6. **Horaires**: Gardez-les à jour, surtout pour les jours fériés

---

## 🎉 C'est Prêt!

Vous avez maintenant tout ce qu'il faut pour gérer vos musées professionnellement. Bonne création! 🏛️

---

**Questions?** Consultez [MUSEUM_SETUP_GUIDE.md](MUSEUM_SETUP_GUIDE.md) pour plus de détails.
