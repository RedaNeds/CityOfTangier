# 🔐 Guide de Sécurité - Variables d'Environnement

## ✅ **Votre Clé API est Sécurisée !**

Votre fichier `.env.local` contenant votre clé API Sanity **NE SERA PAS** poussé sur GitHub.

## 🛡️ **Protection Mise en Place**

### **1. Fichier .gitignore Configuré**
```gitignore
# environment variables
.env
.env.local
.env.local.backup
.env.production
```

### **2. Vérification Git**
- ✅ `.env.local` n'apparaît pas dans `git status`
- ✅ Le fichier est ignoré par Git
- ✅ Aucun risque d'exposition accidentelle

## 📋 **Variables d'Environnement du Projet**

### **Variables Requises**
```bash
# Configuration Sanity
SANITY_PROJECT_ID=0lav3g2f
SANITY_DATASET=production
SANITY_API_TOKEN=your_secret_token_here
```

### **Fichiers Ignorés**
- ✅ `.env.local` - Variables locales (votre clé API)
- ✅ `.env.local.backup` - Sauvegarde locale
- ✅ `.env` - Variables générales
- ✅ `.env.production` - Variables de production

## 🚀 **Pour Collaborer en Sécurité**

### **1. Cloner le Projet**
```bash
git clone https://github.com/votre-username/cityoftangier.git
cd cityoftangier
```

### **2. Installer les Dépendances**
```bash
npm install
```

### **3. Créer le Fichier d'Environnement**
```bash
# Créer .env.local avec vos propres clés
cp .env.example .env.local
# Puis éditer .env.local avec vos vraies valeurs
```

### **4. Obtenir une Clé API Sanity**
1. Aller sur https://sanity.io/manage
2. Sélectionner votre projet
3. Aller dans "API" → "Tokens"
4. Créer un nouveau token avec permissions "Editor"
5. Copier le token dans `.env.local`

## ⚠️ **Bonnes Pratiques de Sécurité**

### **✅ À FAIRE**
- ✅ **Toujours ignorer** les fichiers `.env*`
- ✅ **Utiliser des tokens séparés** pour chaque environnement
- ✅ **Régénérer les tokens** si compromis
- ✅ **Limiter les permissions** des tokens (Editor vs Viewer)
- ✅ **Documenter** les variables nécessaires

### **❌ À ÉVITER**
- ❌ **Ne jamais commiter** de fichiers `.env`
- ❌ **Ne pas partager** les clés API par email/chat
- ❌ **Ne pas utiliser** le même token en dev/prod
- ❌ **Ne pas laisser** de clés dans le code source

## 🔄 **Gestion des Tokens**

### **Token de Développement**
- **Permissions** : Editor (lecture/écriture)
- **Usage** : Développement local
- **Durée** : Permanent (peut être révoqué)

### **Token de Production**
- **Permissions** : Viewer (lecture seule)
- **Usage** : Site en production
- **Durée** : Permanent avec rotation régulière

## 📝 **Documentation pour l'Équipe**

### **Fichier .env.example (Recommandé)**
```bash
# Configuration Sanity
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

### **README.md - Section Setup**
```markdown
## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env.local`
4. Add your Sanity credentials to `.env.local`
5. Run the development server: `npm run dev`
```

## 🚨 **En Cas de Compromission**

### **Si une Clé API est Exposée**
1. **Immédiatement** : Révoquer le token sur Sanity
2. **Créer** un nouveau token avec les mêmes permissions
3. **Mettre à jour** `.env.local` avec le nouveau token
4. **Vérifier** les logs d'API pour usage suspect

### **Commandes de Révocation**
```bash
# Sur Sanity.io/manage
# API → Tokens → [Token] → Revoke
```

## 🎯 **Résumé**

**Votre projet est sécurisé !** 

- ✅ `.env.local` est ignoré par Git
- ✅ Votre clé API ne sera pas exposée
- ✅ Vous pouvez pousser sur GitHub en toute sécurité
- ✅ Les collaborateurs devront créer leurs propres clés

**Vous pouvez maintenant pousser votre projet sur GitHub sans risque ! 🚀**

