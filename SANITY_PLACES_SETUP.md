# Configuration Sanity CMS pour la Gestion des Lieux

## 🎯 Objectif

Ce guide vous explique comment configurer Sanity CMS pour gérer les lieux de Tangier. Vous pourrez ainsi ajouter, modifier ou supprimer des lieux facilement depuis une interface d'administration.

## 🚀 Étapes de Configuration

### 1. Obtenir un Token API Sanity

1. **Allez sur [Sanity Manage](https://sanity.io/manage)**
2. **Sélectionnez votre projet "City of Tangier"**
3. **Allez dans l'onglet "API"**
4. **Cliquez sur "Add API token"**
5. **Configurez le token :**
   - **Name**: `Places Management Token`
   - **Permissions**: `Editor` (pour pouvoir créer/modifier/supprimer)
6. **Copiez le token généré**

### 2. Configurer les Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Sanity Configuration
SANITY_PROJECT_ID=0lav3g2f
SANITY_DATASET=production
SANITY_API_TOKEN=votre-token-ici
```

**Remplacez `votre-token-ici` par le token que vous avez copié à l'étape 1.**

### 3. Démarrer Sanity Studio

```bash
npm run sanity:dev
```

Sanity Studio sera accessible sur `http://localhost:3333`

### 4. Migrer les Lieux Existants

```bash
npm run migrate:places
```

Ce script va :
- Lire les lieux existants depuis `src/content/places/`
- Les créer dans Sanity CMS
- Créer des exemples si aucun lieu n'existe

## 📱 Utilisation de Sanity Studio

### Accéder à l'Interface

1. **Ouvrez [http://localhost:3333](http://localhost:3333)**
2. **Connectez-vous avec votre compte Sanity**
3. **Naviguez vers "Places" dans le menu**

### Gérer les Lieux

#### Ajouter un Nouveau Lieu

1. **Cliquez sur "Create" → "Place"**
2. **Remplissez les informations :**
   - **Title**: Nom du lieu
   - **Slug**: URL du lieu (généré automatiquement)
   - **Description**: Description courte
   - **Category**: Catégorie (Eat & Drink, See & Do, etc.)
   - **Subcategory**: Sous-catégorie spécifique
   - **Tags**: Mots-clés
   - **Rating**: Note sur 5
   - **Price Level**: Niveau de prix (€, €€, €€€, €€€€)
   - **Location**: Localisation générale
   - **Address**: Adresse complète
   - **Coordinates**: Coordonnées GPS (lat, lng)
   - **Highlights**: Points forts du lieu
   - **Contact**: Téléphone, email, site web
   - **Amenities**: Équipements disponibles
   - **Accessibility**: Accessibilité (fauteuil roulant, parking, WiFi)
   - **Opening Hours**: Horaires d'ouverture
   - **Content**: Contenu détaillé (texte riche)
3. **Cliquez sur "Publish"**

#### Modifier un Lieu Existant

1. **Trouvez le lieu dans la liste**
2. **Cliquez dessus pour l'ouvrir**
3. **Modifiez les informations nécessaires**
4. **Cliquez sur "Publish"**

#### Supprimer un Lieu

1. **Ouvrez le lieu**
2. **Cliquez sur "Delete"**
3. **Confirmez la suppression**

## 🌐 Pages Web Générées

### Pages Individuelles

Chaque lieu créé dans Sanity génère automatiquement une page web :

- **URL**: `/places/sanity/[slug]`
- **Exemple**: `/places/sanity/cafe-hafa`

### Page de Gestion

- **URL**: `/places/sanity`
- **Description**: Liste tous les lieux gérés par Sanity

### Intégration avec la Page Principale

La page principale `/places` inclut maintenant des liens vers :
- **Gestion Sanity**: `/places/sanity`
- **Sanity Studio**: `http://localhost:3333`

## 🔧 Structure des Données

### Schéma Sanity

Le schéma `place` inclut tous les champs nécessaires :

```typescript
{
  title: string,
  slug: { current: string },
  description: string,
  category: 'eat-drink' | 'see-do' | 'accommodation' | 'shopping' | 'services',
  subcategory: string,
  tags: string[],
  rating: number (1-5),
  priceLevel: 'Free' | '€' | '€€' | '€€€' | '€€€€',
  location: string,
  address: string,
  coordinates: { lat: number, lng: number },
  highlights: string[],
  contact: { phone?: string, email?: string, website?: string },
  amenities: string[],
  accessibility: { wheelchairAccessible?: boolean, parking?: boolean, wifi?: boolean },
  openingHours: { day: string, hours: string }[],
  content: richText,
  featuredImage: image,
  gallery: image[],
  publishedAt: datetime,
  author: string
}
```

## 🎨 Interface Utilisateur

### Fonctionnalités des Pages

- **Galerie d'images** interactive
- **Informations détaillées** (horaires, contact, accessibilité)
- **Boutons d'action** (Directions, Call, Website, Print, Share)
- **Lieux liés** automatiques
- **Design responsive** pour tous les appareils
- **SEO optimisé** avec structured data

### Navigation

- **Filtrage par catégorie** et sous-catégorie
- **Recherche** par nom, tags, ou description
- **Tri** par nom, catégorie, ou date de publication
- **Pagination** pour de grandes listes

## 🚨 Dépannage

### Erreur "Unauthorized - Session not found"

**Cause**: Token API manquant ou invalide

**Solution**:
1. Vérifiez que le token est correct dans `.env.local`
2. Assurez-vous que le token a les permissions "Editor"
3. Redémarrez le serveur de développement

### Erreur "Project not found"

**Cause**: Project ID incorrect

**Solution**:
1. Vérifiez le Project ID dans `.env.local`
2. Assurez-vous que le projet existe sur Sanity

### Les changements ne s'affichent pas

**Cause**: Cache ou problème de build

**Solution**:
1. Redémarrez le serveur de développement
2. Videz le cache du navigateur
3. Vérifiez que les changements sont publiés dans Sanity

## 📚 Ressources Utiles

- **Documentation Sanity**: [https://sanity.io/docs](https://sanity.io/docs)
- **Sanity Studio**: [http://localhost:3333](http://localhost:3333)
- **Gestion des Projets**: [https://sanity.io/manage](https://sanity.io/manage)
- **API Reference**: [https://sanity.io/docs/reference](https://sanity.io/docs/reference)

## 🎉 Félicitations !

Vous avez maintenant un système complet de gestion des lieux avec Sanity CMS ! Vous pouvez :

- ✅ **Ajouter** de nouveaux lieux facilement
- ✅ **Modifier** les informations existantes
- ✅ **Supprimer** les lieux obsolètes
- ✅ **Gérer** les images et galeries
- ✅ **Organiser** par catégories et tags
- ✅ **Publier** instantanément sur le site web

Le système est entièrement intégré et les changements sont reflétés automatiquement sur le site web.
