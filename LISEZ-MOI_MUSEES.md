# 🏛️ Système de Musées - LISEZ-MOI

## 🎉 Tout est Prêt!

Vous avez maintenant un **système complet de gestion des musées** intégré avec Sanity CMS.

---

## ⚡ Démarrage Ultra-Rapide

### 1. Configurez votre Token Sanity

Dans le fichier `.env.local`, ajoutez votre token:

```env
SANITY_WRITE_TOKEN=votre_token_sanity_ici
```

**Comment obtenir un token:**
1. Allez sur https://sanity.io/manage
2. Sélectionnez votre projet
3. API → Tokens → Add API token
4. Donnez les permissions "Editor"
5. Copiez le token

---

### 2. Importez les 3 Musées d'Exemple

```bash
npm run create:museums
```

Cela va créer:
- 🏛️ Kasbah Museum
- 📜 American Legation Museum
- 🎨 Tangier Museum of Contemporary Art

---

### 3. Lancez le Site

```bash
npm run dev
```

---

### 4. Admirez le Résultat!

Ouvrez votre navigateur:

- **Liste des musées:** http://localhost:4321/museums/
- **Kasbah Museum:** http://localhost:4321/museums/kasbah-museum
- **American Legation:** http://localhost:4321/museums/american-legation-museum
- **Art Contemporain:** http://localhost:4321/museums/contemporary-art-museum

---

## 🎨 Éditer les Musées

### Dans Sanity Studio:

1. Ouvrez votre Sanity Studio
2. Allez dans **"Place"**
3. Cliquez sur un musée
4. Modifiez ce que vous voulez
5. Cliquez **"Publish"**
6. Rechargez la page web → Les changements sont en direct! ✨

---

## ➕ Créer un Nouveau Musée

### Méthode Simple:

1. **Sanity Studio** → **Place** → **Create new Place**

2. **Remplissez les infos de base:**
   - Titre
   - Slug (cliquez "Generate")
   - Description
   - Catégorie: "Attractions"
   - **Subcategory: "Museums"** ⭐ IMPORTANT!

3. **Les champs spéciaux musées apparaissent!**

4. **Remplissez au minimum:**
   - Image principale
   - Horaires (quelques jours)
   - Adresse
   - Coordonnées GPS
   - Prix d'entrée
   - 1-2 collections
   - Quelques points forts

5. **Publish** ✓

6. **C'est en ligne!** 🎉

---

## 📚 Documentation Complète

Vous avez **4 guides** à votre disposition:

### 1. 🚀 MUSEUMS_QUICK_START.md
**Pour qui:** Tout le monde
**Temps:** 5 minutes
**Contenu:** Démarrage ultra-rapide avec visuels

### 2. 📖 MUSEUM_SETUP_GUIDE.md
**Pour qui:** Créateurs de contenu
**Temps:** 20 minutes
**Contenu:** Guide pas à pas complet avec tous les champs expliqués

### 3. 📘 README_MUSEUMS.md
**Pour qui:** Développeurs et utilisateurs avancés
**Temps:** 15 minutes
**Contenu:** Vue d'ensemble technique complète

### 4. 📁 MUSEUMS_FILES_SUMMARY.md
**Pour qui:** Développeurs
**Temps:** 10 minutes
**Contenu:** Liste de tous les fichiers créés

---

## ✅ Qu'est-ce qui a été créé?

### 🎨 Templates (4 fichiers)
- Layout musée responsive
- Page dynamique pour chaque musée
- Page de liste de tous les musées
- Template d'exemple commenté

### 🗄️ Backend (1 fichier)
- Schéma Sanity étendu avec champs musées

### 📊 Données (2 fichiers)
- Script d'import automatique
- Données JSON de 3 musées d'exemple

### 📚 Documentation (5 fichiers)
- 4 guides en français
- 1 fichier résumé

**TOTAL: 12 fichiers** créés ou modifiés

---

## 🎯 Ce que Vous Pouvez Gérer

### Depuis Sanity Studio:

✅ **Informations de Base**
- Titre, description
- Images (principale + galerie)
- Catégorie, tags
- Note, niveau de prix

✅ **Horaires & Localisation**
- Horaires d'ouverture
- Adresse
- Coordonnées GPS
- Meilleur moment pour visiter

✅ **Tarification**
- Prix adulte
- Prix étudiant
- Prix enfant
- Prix senior
- Prix groupe
- Notes sur les tarifs

✅ **Collections**
- Nom de la collection
- Description
- Images

✅ **Expositions**
- Titre
- Description
- Temporaire ou permanente
- Dates (pour les temporaires)
- Images

✅ **Règles du Musée**
- Liste des règles
- Restrictions photo
- Comportements attendus

✅ **Accessibilité**
- Accès fauteuil roulant
- Audioguides (avec langues)
- Visites guidées (avec langues)
- Boutique
- Café
- Toilettes
- Casiers
- Politique photo

✅ **Points Forts**
- Liste des attractions principales

✅ **Contact**
- Téléphone
- Email
- Site web

---

## 🎨 Apparence

### Design Moderne avec:
- ✅ Hero section avec grande image
- ✅ Cartes d'info rapides (note, prix, durée, lieu)
- ✅ Badges et tags colorés
- ✅ Grille de collections
- ✅ Expositions mises en avant
- ✅ Galerie d'images
- ✅ Google Maps intégré
- ✅ Boutons d'action (directions, partage, impression)
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Optimisé pour l'impression

### Couleurs:
- Couleur principale: Teal (#0f766e)
- Accents: Dégradés verts/bleus
- Moderne et professionnel

---

## 🔧 Commandes Utiles

```bash
# Importer les musées d'exemple
npm run create:museums

# Lancer en développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview
```

---

## 🐛 Problèmes Fréquents

### ❌ "Les champs musée n'apparaissent pas"
➡️ **Solution:** Vérifiez que Subcategory = "Museums", "Art Galleries" ou "Cultural Centers"

### ❌ "Erreur lors de l'import"
➡️ **Solution:** Vérifiez que `SANITY_WRITE_TOKEN` est dans `.env.local`

### ❌ "Les musées ne s'affichent pas"
➡️ **Solution:** Vérifiez qu'ils sont bien publiés (bouton "Publish" dans Sanity)

### ❌ "Les images ne chargent pas"
➡️ **Solution:** Vérifiez votre configuration Sanity dans `.env.local`

---

## 🎓 Recommandations

### Pour un Musée de Qualité:

1. **Images:** Minimum 1200px de large
2. **Description courte:** 150-200 caractères
3. **Collections:** Au moins 2-3 collections
4. **Expositions:** Indiquez si temporaire ou permanent
5. **Horaires:** Tous les jours de la semaine
6. **GPS:** Vérifiez sur Google Maps
7. **Langues:** Indiquez les langues des audioguides/visites
8. **Règles:** 4-6 règles claires
9. **Points forts:** 4-6 highlights importants

---

## 🌟 Fonctionnalités Incluses

✅ SEO optimisé (structured data)
✅ Responsive design
✅ Google Maps intégré
✅ Partage social
✅ Impression optimisée
✅ Galeries d'images
✅ Collections gérables
✅ Expositions temporaires et permanentes
✅ Tarification flexible
✅ Multi-langues (audioguides/visites)
✅ Accessibilité complète
✅ Sans code requis après setup

---

## 🎯 Prochaines Étapes

1. ✅ Lancez `npm run create:museums`
2. ✅ Explorez les 3 musées d'exemple
3. ✅ Ouvrez Sanity Studio
4. ✅ Modifiez un musée d'exemple
5. ✅ Créez votre premier vrai musée
6. ✅ Ajoutez de vraies images
7. ✅ Invitez votre équipe sur Sanity
8. ✅ Déployez!

---

## 📞 Besoin d'Aide?

1. **Quick Start:** Lisez `MUSEUMS_QUICK_START.md`
2. **Guide Complet:** Lisez `MUSEUM_SETUP_GUIDE.md`
3. **Documentation Technique:** Lisez `README_MUSEUMS.md`
4. **Liste des Fichiers:** Lisez `MUSEUMS_FILES_SUMMARY.md`

---

## 🎉 Vous êtes Prêt!

Tout est configuré et fonctionnel. Il ne vous reste plus qu'à créer vos musées!

**Amusez-vous bien!** 🏛️✨

---

*Système créé avec ❤️ pour City of Tangier*
