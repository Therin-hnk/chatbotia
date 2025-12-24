
---

# **Installation et Démarrage du Backend**

## **Objectif**
Ce guide explique comment installer et configurer le backend du projet sur Linux (avec une adaptation pour Windows).

---

## **Prérequis**
1. Système d'exploitation : Ubuntu 20.04 ou version ultérieure (Linux).
2. Outils nécessaires :
   - Docker
   - Node.js (avec npm)
   - Visual Studio Code (avec l’extension Docker).
3. Accès Internet.

---

## **Étapes de mise en œuvre**

### **1. Installer Docker**
Pour installer Docker, suivez ces étapes :

#### **1.1. Mettre à jour les paquets**
```bash
sudo apt update
```

#### **1.2. Installer les paquets prérequis**
```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

#### **1.3. Ajouter la clé GPG du dépôt Docker**
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

#### **1.4. Ajouter le dépôt Docker**
```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```

#### **1.5. Vérifier la source Docker**
```bash
apt-cache policy docker-ce
```

#### **1.6. Installer Docker**
```bash
sudo apt install docker-ce
```

#### **1.7. Vérifier l’installation de Docker**
```bash
sudo systemctl status docker
```

Docker doit être actif et configuré pour démarrer au démarrage du système.

---

### **2. Configurer le projet dans Visual Studio Code**
1. Ouvrir le projet dans **Visual Studio Code**.
2. Installer l'extension **Docker** :
   - Accéder au menu "Extensions" (`Ctrl+Shift+X`).
   - Rechercher "Docker" et cliquer sur **Installer**.

---

### **3. Configurer le backend Wizeco**

#### **3.1. Installer les dépendances du projet**
Dans le répertoire du projet, exécuter :
```bash
npm install
```

#### **3.2. Configurer la base de données PostgreSQL**
Exécuter la commande Docker suivante pour lancer un conteneur PostgreSQL avec PostGIS :
```bash
docker run --name chatbotia-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=db_chatbotia -p 5432:5432 -d postgis/postgis:14-3.3
```

#### **3.3. Migrer la base de données avec Prisma**
```bash
npx prisma migrate dev
```

#### **3.4. Installer Prisma et ses clients**
```bash
npm install @prisma/client
npm install prisma @prisma/client
```

#### **3.5. Générer les fichiers Prisma**
```bash
npx prisma generate
```

---

## **Adaptation pour Windows**

### **1. Installer Docker Desktop**
- Télécharger et installer [Docker Desktop](https://www.docker.com/products/docker-desktop).
- Activer WSL2 (Windows Subsystem for Linux 2) si nécessaire.

### **2. Commandes spécifiques**
- Les commandes Docker et npm restent identiques.
- Assurez-vous que PostgreSQL est configuré pour être accessible via les ports spécifiés.

---

## **Problèmes fréquents et solutions**

### Problème : Docker ne démarre pas
**Solution :** Vérifiez que le service Docker est actif avec :
```bash
sudo systemctl start docker
```

### Problème : Erreurs de connexion à PostgreSQL
**Solution :** Assurez-vous que le conteneur PostgreSQL est en cours d'exécution :
```bash
docker ps
```

### Execusion des test :
**Solution :** Assurez-vous que le conteneur PostgreSQL est en cours d'exécution :
```bash
docker ps
```

### **Exécution et validation**
Pour continuer Vous devez telecharger et installer l'extension japa dans vscode

#### **1. Démarrer les services nécessaires**
1. Démarrer l’image Docker de la base de données :
   - Dans Visual Studio Code, accéder à l'onglet **Docker**.
   - Trouver l'image PostgreSQL créée précédemment.
   - Cliquer sur **Play** pour démarrer le conteneur.

2. Lancer le serveur backend :
   ```bash
   npm run dev
   ```

#### **2. Exécuter les tests**
1. Assurez-vous que le serveur est opérationnel.
2. Lancez les tests pour valider le bon fonctionnement des fonctionnalités :
   ```bash
   npm run test
   ```

   - **Objectif :** Vérifier que tous les tests passent avec succès pour confirmer la stabilité de la branche ou des changements intégrés.

---

## **Problèmes fréquents et solutions**

### Problème : certains test ne passent pas
**Solution :** Sauvegarder la liste des tests qui ne passent pas et les executer manuellement un a un