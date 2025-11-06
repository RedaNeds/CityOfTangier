# 🏛️ Nouveau Système de Musées - Simplifié

## ✅ Ce qui a Changé

### Avant ❌
- Schéma `place` avec 100+ champs
- Trop de champs inutilisés
- Design qui ne correspondait pas au mockup
- Un seul type pour tous les lieux

### Maintenant ✅
- **Schéma `museum` séparé** avec seulement ~12 champs essentiels
- Design exact du mockup (beige/sable)
- Templates séparés pour chaque type d'attraction
- Interface Sanity propre et simple

---

## 🚀 Démarrage Rapide

### 1. Créez un musée d'exemple

```bash
npm run create:museum
```

### 2. Lancez le site

```bash
npm run dev
```

### 3. Visitez

```
http://localhost:4321/museums/kasbah-museum
```

---

## 📝 Champs Sanity (12 seulement!)

### Informations de Base
1. **Museum Name** - Nom du musée
2. **Slug** - URL (généré automatiquement)
3. **Subtitle** - Sous-titre (optionnel)
4. **Short Description** - Description courte

### Images
5. **Hero Image** - Grande image principale
6. **Photo Gallery** - Max 12 photos

### Localisation
7. **Location** - Adresse, ville, coordonnées GPS

### Horaires & Tarifs
8. **Opening Hours** - Jours et heures d'ouverture
9. **Ticket Prices** - Tarifs (adulte, étudiant, enfant, note groupe)

### Contenu
10. **Collections & Exhibitions** - Max 6 collections (titre, description, image)
11. **History Section** - Historique avec timeline
12. **Contact Information** - Téléphone, email, site web

**C'est tout!** Simple et efficace.

---

## 🎨 Design

Le nouveau design correspond exactement au mockup:

- ✅ Fond beige (#F5F1E8)
- ✅ Grande hero image
- ✅ Collections en grille de 3
- ✅ Gallery avec miniatures 8 colonnes
- ✅ Section histoire avec fond sable (#E8DCC8)
- ✅ Plan Your Visit avec horaires et tarifs côte à côte
- ✅ Typographie serif pour les titres

---

## 📋 Créer un Musée dans Sanity

### 1. Ouvrez Sanity Studio

Allez dans votre Sanity Studio

### 2. Cliquez sur "Museum"

Dans le menu latéral → **Museum** (nouveau type!)

### 3. Créez un nouveau musée

Cliquez **"Create new Museum"**

### 4. Remplissez les champs essentiels

**Minimum requis:**
- Museum Name
- Slug (cliquez "Generate")
- Short Description
- Hero Image
- Location (adresse + ville + GPS)
- Opening Hours (au moins 3 entrées)
- Ticket Prices (au moins adult)

**Recommandé:**
- 3-6 Collections
- 8-12 Gallery photos
- History avec 3-5 timeline events
- Contact info

### 5. Publish!

---

## 🎯 Templates Séparés (À Venir)

Le système est conçu pour être étendu facilement:

```
schemas/
├── museum.ts        ✅ Fait
├── historicSite.ts  🔜 À venir
├── market.ts        🔜 À venir
├── beach.ts         🔜 À venir
└── park.ts          🔜 À venir
```

Chaque type aura:
- **Son propre schéma** (10-15 champs pertinents)
- **Son propre template** (design adapté)
- **Son propre design** (couleurs, layout)

---

## 📊 Comparaison

### Ancien Système
```
place.ts (1000+ lignes)
  ├─ 100+ champs
  ├─ Champs conditionnels complexes
  ├─ Schéma difficile à maintenir
  └─ Interface Sanity écrasante
```

### Nouveau Système
```
museum.ts (150 lignes)
  ├─ 12 champs essentiels
  ├─ Schéma simple et clair
  ├─ Interface Sanity propre
  └─ Facile à dupliquer pour autres types
```

---

## 🔄 Migration

### Garder l'Ancien Système

L'ancien système `place` reste intact. Vous pouvez:
- Continuer à l'utiliser pour d'autres lieux
- Migrer progressivement vers les nouveaux types
- Garder les deux systèmes en parallèle

### Nouveau Musée = Nouveau Type

Pour les musées, utilisez maintenant le type **Museum**:
- Plus simple
- Plus propre
- Design adapté

---

## 💡 Avantages

### Pour les Éditeurs
- ✅ Interface simple (12 champs au lieu de 100+)
- ✅ Champs clairs et pertinents
- ✅ Pas de confusion
- ✅ Preview immédiat dans Sanity

### Pour les Développeurs
- ✅ Code plus simple
- ✅ Schémas séparés (facile à maintenir)
- ✅ Templates dédiés (design optimal)
- ✅ Extensible facilement

### Pour les Utilisateurs
- ✅ Design magnifique (correspond au mockup)
- ✅ Pages rapides
- ✅ Informations bien organisées
- ✅ Responsive parfait

---

## 🎨 Créer un Autre Type (Exemple: Historic Site)

```typescript
// sanity/schemas/historicSite.ts
export const historicSite = defineType({
  name: 'historicSite',
  title: 'Historic Site',
  fields: [
    // 10-15 champs pertinents pour les sites historiques
    // Ex: period, architecture style, historical events, etc.
  ]
})
```

Puis créez: `src/pages/historic-sites/[slug].astro` avec le design adapté.

---

## 📞 Commandes

```bash
# Créer un musée d'exemple
npm run create:museum

# Développement
npm run dev

# Build
npm run build
```

---

## ✅ Checklist Création Musée

### Dans Sanity Studio

- [ ] Museum Name rempli
- [ ] Slug généré
- [ ] Description (150-200 caractères)
- [ ] Hero Image uploadée
- [ ] Location → Address, City, GPS
- [ ] Opening Hours → Au moins 3 jours
- [ ] Ticket Prices → Adult price minimum
- [ ] Collections → 3-6 items
- [ ] Gallery → 8-12 photos
- [ ] History → Description + timeline
- [ ] Contact → Phone ou email ou website
- [ ] **Publish!**

---

## 🎯 Résultat Final

Votre page musée aura exactement le design du mockup:
- Grande hero image immersive
- Collections en belle grille
- Gallery élégante
- Section histoire design
- Informations pratiques bien organisées
- Design beige/sable raffiné

---

**C'est tout!** Beaucoup plus simple, non? 😊

Pour commencer: `npm run create:museum`
