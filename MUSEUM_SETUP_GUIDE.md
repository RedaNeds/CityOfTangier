# Guide de Configuration des Musées

Ce guide explique comment configurer et utiliser le système de gestion des musées avec Sanity CMS.

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Importer les Exemples](#importer-les-exemples)
3. [Créer un Musée dans Sanity](#créer-un-musée-dans-sanity)
4. [Structure des Champs](#structure-des-champs)
5. [Visualiser les Musées](#visualiser-les-musées)

---

## Prérequis

- Accès à votre Sanity Studio
- Token d'écriture Sanity (pour l'import automatique)
- Node.js installé

---

## Importer les Exemples

### Option 1: Script Automatique (Recommandé)

1. **Configurez votre token Sanity:**

   Ajoutez à votre fichier `.env.local`:
   ```env
   SANITY_WRITE_TOKEN=votre_token_ici
   ```

   Pour obtenir un token:
   - Allez sur https://sanity.io/manage
   - Sélectionnez votre projet
   - API → Tokens → Add API token
   - Donnez-lui les permissions "Editor" ou "Administrator"

2. **Exécutez le script d'import:**

   ```bash
   node scripts/add-example-museums.js
   ```

   Cela créera automatiquement 3 musées d'exemple:
   - ✅ Kasbah Museum of Mediterranean Cultures
   - ✅ American Legation Museum
   - ✅ Tangier Museum of Contemporary Art

### Option 2: Création Manuelle

Suivez les instructions dans la section suivante pour créer les musées manuellement.

---

## Créer un Musée dans Sanity

### Étape 1: Ouvrir Sanity Studio

1. Accédez à votre Sanity Studio (généralement `/studio` ou votre URL Sanity)
2. Connectez-vous si nécessaire

### Étape 2: Créer un Nouveau "Place"

1. Cliquez sur **"Place"** dans le menu latéral
2. Cliquez sur **"Create new Place"** (bouton vert en haut)

### Étape 3: Remplir les Informations de Base

#### 📝 Informations Principales
- **Title:** "Kasbah Museum of Mediterranean Cultures"
- **Slug:** Cliquez sur "Generate" → `kasbah-museum`
- **Description:** Une description courte (max 200 caractères)
- **Main Description:** Contenu détaillé avec plusieurs paragraphes

#### 🏷️ Catégorisation
- **Category:** Sélectionnez "Attractions" ou "See & Do"
- **Subcategory:** Sélectionnez **"Museums"** ⭐ (Ceci activera les champs spécifiques aux musées)
- **Tags:** Ajoutez des tags: `history`, `culture`, `art`, `archaeology`, etc.

#### 🖼️ Images
- **Featured Image:** Téléchargez l'image principale du musée
- **Gallery:** Ajoutez plusieurs images (8-10 recommandées)

#### ⭐ Notation et Prix
- **Rating:** 4.5 (sur 5)
- **Price Level:** Sélectionnez € ou €€ ou €€€

### Étape 4: Horaires et Localisation

#### 🕐 Opening Hours
Cliquez sur "Add item" pour chaque jour:
```
Monday    → 9:00 AM - 4:00 PM
Tuesday   → Closed
Wednesday → 9:00 AM - 4:00 PM
Thursday  → 9:00 AM - 4:00 PM
Friday    → 9:00 AM - 4:00 PM
Saturday  → 9:00 AM - 4:00 PM
Sunday    → 9:00 AM - 4:00 PM
```

#### 📍 Location
- **Location:** "Kasbah, Tangier, Morocco"
- **Address:** "Place de la Kasbah, Tangier 90000, Morocco"
- **Coordinates:**
  - Latitude: `35.7897`
  - Longitude: `-5.8137`

### Étape 5: Points Forts et Contact

#### ✨ Highlights
Ajoutez des points forts (cliquez sur "Add item"):
- "17th-century palace with stunning architecture"
- "Panoramic views of the Strait of Gibraltar"
- "Extensive collection of Moroccan ceramics"
- "Ancient Roman mosaics from Volubilis"
- "Traditional Moroccan costumes and jewelry"
- "Beautiful Andalusian gardens"

#### 📞 Contact Information
- **Phone:** +212 539 93 20 97
- **Email:** info@kasbahmuseum.ma
- **Website:** https://kasbahmuseum.ma

#### 🎯 Amenities
- Audio guides
- Guided tours
- Gift shop
- Restrooms
- Photography allowed (no flash)
- Wheelchair accessible (partial)

#### ♿ Accessibility
- **Wheelchair Accessible:** ✓ Oui
- **Parking:** ✗ Non
- **WiFi:** ✗ Non

---

### Étape 6: Champs Spécifiques aux Musées 🏛️

**Cette section apparaît automatiquement quand vous sélectionnez "Museums" comme subcategory**

#### ⏱️ Visit Information
- **Recommended Visit Duration:** "1-2 hours"
- **Best Time to Visit:** "Weekday mornings (9-11 AM) for fewer crowds and better lighting for photos"

#### 💰 Admission Prices
Développez la section "Admission Prices":
- **Adult:** "30 MAD (€3)"
- **Student:** "15 MAD (€1.50)"
- **Child:** "Free (under 12)"
- **Senior:** "15 MAD (€1.50)"
- **Group:** "20 MAD per person (€2)"
- **Notes:** "Tickets can be purchased at the entrance. Cash and cards accepted."

#### 🏺 Collections
Cliquez sur "Add item" pour chaque collection:

**Collection 1:**
- Name: "Archaeological Collection"
- Description: "Roman and Phoenician artifacts including pottery, coins, and ancient tools discovered in and around Tangier."

**Collection 2:**
- Name: "Moroccan Art & Crafts"
- Description: "Traditional ceramics, textiles, carpets, and metalwork showcasing Morocco's rich artistic heritage."

**Collection 3:**
- Name: "Historical Documents"
- Description: "Manuscripts, maps, and documents tracing Tangier's multicultural history as an international zone."

**Collection 4:**
- Name: "Traditional Costumes"
- Description: "Beautifully preserved traditional Moroccan clothing and jewelry from different regions and periods."

#### 🎨 Current Exhibitions
**Exhibition 1 (Temporaire):**
- Title: "Contemporary Art at the Kasbah"
- Description: "A rotating exhibition featuring modern Moroccan artists..."
- **Temporary Exhibition:** ✓ Oui
- Start Date: 2024-09-01
- End Date: 2024-12-31

**Exhibition 2 (Permanente):**
- Title: "Moroccan Musical Instruments"
- Description: "Permanent collection showcasing traditional instruments..."
- **Temporary Exhibition:** ✗ Non

#### ⚠️ Museum Rules
Ajoutez chaque règle comme un tag:
- "No flash photography inside exhibition halls"
- "Do not touch artifacts or displays"
- "Maintain a quiet atmosphere"
- "Bags larger than 40x30cm must be left at reception"
- "Food and beverages not allowed inside exhibition areas"
- "Children must be accompanied by an adult"

#### ♿ Extended Accessibility
- **Audio Guides Available:** ✓ Oui
  - **Languages:** Arabic, French, English, Spanish
- **Guided Tours Available:** ✓ Oui
  - **Languages:** Arabic, French, English, Spanish
- **Gift Shop:** ✓ Oui
- **Café/Restaurant:** ✗ Non
- **Public Restrooms:** ✓ Oui
- **Lockers/Bag Storage:** ✓ Oui
- **Photography Allowed:** ✓ Oui
  - **Notes:** "No flash photography. Some special exhibitions may have restrictions."

---

### Étape 7: Publier

1. Vérifiez que tous les champs importants sont remplis
2. Cliquez sur **"Publish"** (bouton vert en haut à droite)
3. Votre musée est maintenant en ligne! 🎉

---

## Structure des Champs

### Champs Standards (Pour tous les Places)
```
✓ Title
✓ Slug
✓ Description
✓ Main Description
✓ Category
✓ Subcategory
✓ Tags
✓ Featured Image
✓ Gallery
✓ Rating
✓ Price Level
✓ Opening Hours
✓ Location
✓ Address
✓ Coordinates
✓ Highlights
✓ Contact (phone, email, website)
✓ Amenities
✓ Accessibility
```

### Champs Spécifiques aux Musées (Apparaissent uniquement pour Museums/Art Galleries/Cultural Centers)
```
Museum-Specific Fields:
  ✓ Visit Duration
  ✓ Best Time to Visit
  ✓ Admission Prices (Adult, Student, Child, Senior, Group, Notes)
  ✓ Collections (Name, Description, Image)
  ✓ Exhibitions (Title, Description, Temporary, Dates, Image)
  ✓ Museum Rules
  ✓ Extended Accessibility (Audio Guides, Tours, Languages, Facilities)
```

---

## Visualiser les Musées

### URLs des Pages

- **Liste de tous les musées:** `/museums/`
- **Page individuelle:** `/museums/[slug]`

### Exemples:
- `/museums/kasbah-museum`
- `/museums/american-legation-museum`
- `/museums/contemporary-art-museum`

---

## 🎨 Personnalisation

### Modifier les Couleurs du Thème

Les couleurs des musées sont dans `src/layouts/MuseumLayout.astro`:
- Couleur principale: `#0f766e` (teal-700)
- Couleur secondaire: `#115e59` (teal-800)

### Ajouter de Nouveaux Types de Musées

Dans `sanity/schemas/place.ts`, ajoutez à la liste des subcategories:
```javascript
{ title: 'Science Museums', value: 'science-museums' },
```

---

## 🐛 Dépannage

### Les champs du musée n'apparaissent pas
- Vérifiez que la subcategory est bien "museums", "art-galleries" ou "cultural-centers"
- Rechargez Sanity Studio (Ctrl+R / Cmd+R)

### Les images ne s'affichent pas
- Vérifiez que les images sont bien téléchargées dans Sanity
- Vérifiez la configuration de votre CDN Sanity

### Le musée n'apparaît pas sur le site
- Vérifiez que le document est bien publié (bouton vert "Publish")
- Reconstruisez votre site: `npm run build`
- Pour le développement: `npm run dev`

---

## 📞 Support

Pour toute question ou problème:
1. Consultez la documentation Sanity: https://www.sanity.io/docs
2. Vérifiez les logs de votre console de développement
3. Contactez l'équipe de développement

---

## ✅ Checklist de Création d'un Musée

- [ ] Informations de base (titre, description, slug)
- [ ] Catégorie = "Museums" ou "Art Galleries"
- [ ] Images (featured + galerie)
- [ ] Horaires d'ouverture
- [ ] Coordonnées GPS
- [ ] Informations de contact
- [ ] Prix d'entrée
- [ ] Collections (au moins 2-3)
- [ ] Points forts
- [ ] Règles du musée
- [ ] Accessibilité
- [ ] Publié ✓

---

Bon travail! 🎉
