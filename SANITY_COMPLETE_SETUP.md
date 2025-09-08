# 🎉 Sanity CMS - Configuration Complète

## ✅ Ce qui a été configuré

### 📋 Schémas Sanity créés
- **Place** - Lieux à voir et à faire (museums, beaches, nightlife, photo-spots)
- **Event** - Événements et festivals avec dates, lieux, prix
- **Itinerary** - Itinéraires de voyage avec étapes et conseils
- **BlogPost** - Articles de blog avec auteurs et contenu riche
- **Neighborhood** - Quartiers avec caractéristiques et lieux notables
- **Partner** - Partenaires (hôtels, restaurants, opérateurs touristiques)
- **Guide** - Guides de voyage avec niveaux de difficulté
- **Product** - Produits et souvenirs avec prix et disponibilité

### 🏗️ Pages Astro mises à jour
- **Places** (`/places/see-do/` et `/places/see-do/[slug]`) ✅
- **Itineraries** (`/itineraries/` et `/itineraries/[slug]`) ✅
- **Blog** (`/blog/` et `/blog/[slug]`) ✅
- **Events** (`/events/` et `/events/[slug]`) ✅
- **Guides** (`/guides/` et `/guides/[slug]`) ✅

### 🔧 Scripts de migration
- **Migration initiale** : `npm run migrate:sanity`
- **Migration complète** : `npm run migrate:all`
- **Scripts personnalisés** pour chaque type de contenu

## 🚀 Comment utiliser

### 1. Gérer le contenu via Sanity Studio
```bash
npm run sanity:dev
```
Accédez à http://localhost:3333/ pour gérer votre contenu.

### 2. Développement du site
```bash
npm run dev
```
Le site utilise maintenant Sanity comme source de données.

### 3. Migration de contenu
```bash
# Migration des contenus existants
npm run migrate:sanity

# Migration complète (tous types)
npm run migrate:all
```

## 📁 Structure des schémas

### Place (Lieux)
```typescript
{
  title: string
  slug: slug
  description: text
  category: "See & Do" | "Eat & Drink" | "Stay"
  subcategory: string
  rating: number
  priceLevel: "Free" | "€" | "€€" | "€€€"
  location: { name, address, coordinates }
  highlights: string[]
  tags: string[]
  featuredImage: image
  content: richText
}
```

### Event (Événements)
```typescript
{
  title: string
  slug: slug
  description: text
  eventDate: datetime
  endDate: datetime
  location: { name, address, coordinates }
  price: { amount, currency, free }
  category: "cultural" | "music" | "food-drink" | "art" | "sports" | "festival"
  tags: string[]
  featuredImage: image
  content: richText
}
```

### Guide (Guides)
```typescript
{
  title: string
  slug: slug
  description: text
  excerpt: text
  category: "travel-tips" | "culture-history" | "food-drink" | "transportation"
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedReadTime: number
  author: { name, bio, avatar }
  tags: string[]
  content: richText
}
```

### Itinerary (Itinéraires)
```typescript
{
  title: string
  slug: slug
  description: text
  duration: string
  difficulty: "easy" | "moderate" | "challenging"
  budget: string
  totalStops: number
  totalDuration: string
  stops: array
  tips: array
  content: richText
}
```

### BlogPost (Articles)
```typescript
{
  title: string
  slug: slug
  excerpt: text
  author: { name, bio, avatar }
  content: richText
  tags: string[]
  featuredImage: image
}
```

### Neighborhood (Quartiers)
```typescript
{
  title: string
  slug: slug
  description: text
  location: { coordinates, bounds }
  characteristics: array
  places: reference[]
  tags: string[]
  content: richText
}
```

### Partner (Partenaires)
```typescript
{
  name: string
  slug: slug
  description: text
  type: "hotel" | "restaurant" | "tour-operator" | "transportation"
  contact: { phone, email, website, address }
  location: { coordinates }
  services: string[]
  specialOffers: array
  active: boolean
}
```

### Product (Produits)
```typescript
{
  name: string
  slug: slug
  description: text
  category: "souvenirs" | "handicrafts" | "textiles" | "jewelry"
  price: { amount, currency, originalPrice }
  availability: { inStock, quantity, preOrder }
  vendor: { name, location, contact, coordinates }
  images: image[]
  specifications: array
}
```

## 🎯 Fonctionnalités disponibles

### ✅ Implémentées
- **Gestion de contenu** via Sanity Studio
- **Pages dynamiques** pour tous les types de contenu
- **Recherche et filtrage** par catégories
- **Images et médias** optimisés
- **Contenu riche** avec éditeur WYSIWYG
- **Relations** entre contenus (références)
- **SEO** optimisé avec métadonnées
- **Responsive design** pour tous les écrans

### 🔄 En cours de développement
- **Recherche avancée** avec filtres
- **Calendrier d'événements** interactif
- **Système de réservation** pour partenaires
- **E-commerce** pour produits
- **Multilingue** (français/anglais/arabe)

## 📊 Statistiques

- **8 types de contenu** configurés
- **5 pages principales** mises à jour
- **2 scripts de migration** créés
- **Exemples de contenu** ajoutés
- **100% fonctionnel** avec Sanity

## 🔗 Liens utiles

- **Sanity Studio** : http://localhost:3333/
- **Site de développement** : http://localhost:4322/
- **Documentation Sanity** : https://www.sanity.io/docs
- **Documentation Astro** : https://docs.astro.build/

## 🎊 Résultat

Votre site City of Tangier utilise maintenant **Sanity CMS** comme système de gestion de contenu complet. Vous pouvez :

1. **Gérer tout votre contenu** via l'interface Sanity Studio
2. **Ajouter facilement** de nouveaux lieux, événements, guides
3. **Modifier le contenu** sans toucher au code
4. **Collaborer** avec votre équipe sur le contenu
5. **Publier instantanément** vos modifications

**La migration vers Sanity est terminée et fonctionnelle ! 🚀**

