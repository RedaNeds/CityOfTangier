# 🚀 Démarrage Ultra-Rapide - Musées

## En 5 Minutes Chrono ⏱️

### 1️⃣ Importer les Musées d'Exemple

```bash
npm run create:museums
```

✅ Ça va créer 3 musées automatiquement dans Sanity!

---

### 2️⃣ Lancer le Site

```bash
npm run dev
```

---

### 3️⃣ Voir les Résultats

Ouvrez dans votre navigateur:

- **Liste:** http://localhost:4321/museums/
- **Kasbah Museum:** http://localhost:4321/museums/kasbah-museum
- **American Legation:** http://localhost:4321/museums/american-legation-museum
- **Art Contemporain:** http://localhost:4321/museums/contemporary-art-museum

---

## 🎨 Ce que Vous Allez Voir

### Page de Liste (`/museums/`)
```
┌─────────────────────────────────────────────┐
│  🏛️ Museums & Cultural Sites in Tangier    │
│  Discover Tangier's rich cultural heritage  │
├─────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │ 🏛️   │  │ 📜   │  │ 🎨   │              │
│  │Museum│  │Museum│  │Museum│              │
│  └──────┘  └──────┘  └──────┘              │
└─────────────────────────────────────────────┘
```

### Page Individuelle (`/museums/kasbah-museum`)
```
┌─────────────────────────────────────────────┐
│          [Grande Image Hero]                │
│     Kasbah Museum of Mediterranean          │
│          Cultures                            │
├─────────────────────────────────────────────┤
│ ⭐ 4.5  | 💰 30 MAD | ⏱️ 1-2h | 📍 Kasbah  │
├─────────────────────────────────────────────┤
│ À Propos                                    │
│ Description complète du musée...            │
├─────────────────────────────────────────────┤
│ 🕐 Horaires      | 🎫 Prix                 │
│ Lun-Dim 9h-16h  | Adulte: 30 MAD          │
│ Mar: Fermé      | Étudiant: 15 MAD        │
├─────────────────────────────────────────────┤
│ ⭐ Points Forts                             │
│ • Architecture 17e siècle                   │
│ • Vues sur Gibraltar                        │
│ • Mosaïques romaines                        │
├─────────────────────────────────────────────┤
│ 🏺 Collections                              │
│ ┌──────────────┐ ┌──────────────┐         │
│ │Archaeological│ │Moroccan Art  │         │
│ │Collection    │ │& Crafts      │         │
│ └──────────────┘ └──────────────┘         │
├─────────────────────────────────────────────┤
│ 🎨 Expositions                              │
│ [Contemporary Art - Temporaire]             │
│ [Musical Instruments - Permanent]           │
├─────────────────────────────────────────────┤
│ 📷 Galerie                                  │
│ [Grid d'Images]                             │
├─────────────────────────────────────────────┤
│ ♿ Équipements                               │
│ ✓ Audioguides  ✓ Visites   ✓ Boutique     │
├─────────────────────────────────────────────┤
│ ⚠️ Règles                                   │
│ • Pas de flash                              │
│ • Ne pas toucher les objets                 │
├─────────────────────────────────────────────┤
│ 📍 Localisation                             │
│ [Google Maps]                               │
│ 📞 Contact: +212 539 93 20 97              │
├─────────────────────────────────────────────┤
│ [📍 Directions] [🌐 Site Web] [🖨️ Print]   │
└─────────────────────────────────────────────┘
```

---

## 📝 Éditer dans Sanity

1. Ouvrez Sanity Studio (votre URL Sanity)
2. Cliquez sur **"Place"** dans le menu
3. Sélectionnez un des 3 musées
4. Modifiez ce que vous voulez
5. Cliquez **"Publish"**
6. Rechargez votre page web → Les changements apparaissent! ✨

---

## 🎯 Créer Votre Premier Vrai Musée

### Dans Sanity Studio:

1. **Place** → **Create new Place** (bouton vert)

2. **Remplissez:**
   - Title: "Mon Musée"
   - Slug: Cliquez "Generate"
   - Description: 1-2 phrases
   - Category: "Attractions"
   - **Subcategory: "Museums"** ⭐ (Important!)

3. **Les champs musée apparaissent automatiquement!**

4. **Minimum à remplir:**
   - [ ] Featured Image
   - [ ] Opening Hours (au moins 3-4 jours)
   - [ ] Location
   - [ ] Coordinates (lat/lng)
   - [ ] Admission Prices → Adult price
   - [ ] Collections → Au moins 1 collection
   - [ ] Highlights → Au moins 3 points

5. **Publish** ✓

6. **Votre musée est en ligne!**
   URL: `/museums/mon-musee`

---

## 🎨 3 Musées Inclus

### 🏛️ Kasbah Museum
- **Type:** Historique/Archéologique
- **Prix:** 30 MAD (€3)
- **Durée:** 1-2h
- **Note:** ⭐⭐⭐⭐½ (4.5/5)
- **Collections:** 4 permanentes
- **Expositions:** 2 (1 temporaire + 1 permanente)

### 📜 American Legation
- **Type:** Historique/Diplomatique
- **Prix:** Gratuit (donations)
- **Durée:** 45min-1h
- **Note:** ⭐⭐⭐⭐⭐ (4.7/5)
- **Collections:** 4 permanentes
- **Spécial:** Première propriété US hors USA

### 🎨 Contemporary Art Museum
- **Type:** Art Contemporain
- **Prix:** 50 MAD (€5)
- **Durée:** 1-1.5h
- **Note:** ⭐⭐⭐⭐ (4.3/5)
- **Collections:** 4 permanentes
- **Expositions:** 3 (2 temporaires + 1 permanente)

---

## ✅ Tout est Prêt!

```bash
# 1. Importer
npm run create:museums

# 2. Lancer
npm run dev

# 3. Admirer
http://localhost:4321/museums/
```

**C'est tout!** 🎉

---

## 🆘 Aide Rapide

**Les musées ne s'affichent pas?**
→ Vérifiez qu'ils sont publiés dans Sanity

**Les champs musée n'apparaissent pas?**
→ Subcategory doit être "Museums", "Art Galleries" ou "Cultural Centers"

**Erreur lors de l'import?**
→ Vérifiez votre `SANITY_WRITE_TOKEN` dans `.env.local`

---

## 📚 Plus de Détails

- **Guide Complet:** [MUSEUM_SETUP_GUIDE.md](MUSEUM_SETUP_GUIDE.md)
- **Documentation:** [README_MUSEUMS.md](README_MUSEUMS.md)

---

**Bonne création!** 🏛️✨
