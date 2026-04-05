# 🎨 PixelCraftHub - Frontend

> La plateforme de mise en relation entre Freelances Web et Clients exigeants.

PixelCraftHub est une marketplace moderne permettant aux créateurs (Designers, Développeurs) de proposer leurs services via un système de devis et de gestion de projets en temps réel.

---

## 🚀 Stack Technique

Ce projet est propulsé par les dernières technologies du web :

* **Framework :** [React 18+](https://reactjs.org/) avec **Vite** pour une expérience de développement ultra-rapide.
* **Styling :** [Tailwind CSS v4](https://tailwindcss.com/) (Moteur de rendu CSS haute performance).
* **Navigation :** React Router v6.
* **API Client :** Axios avec intercepteurs pour la gestion automatique des JWT.
* **Design :** Glassmorphism & Dark Mode natif.

---

## 🛠️ Fonctionnalités (MVP)

- [x] **Système d'Authentification :** Connexion/Inscription avec rôles (Client vs Prestataire).
- [x] **Dashboard Dynamique :** Statistiques personnalisées selon le profil utilisateur.
- [ ] **Gestion de Services :** Catalogue de services Web & Design.
- [ ] **Projets & Milestones :** Suivi de l'avancement technique (Barre de progression).
- [ ] **Espace de Discussion :** (En cours) Messagerie entre clients et freelances.

---

## ⚙️ Installation et Lancement

1. **Cloner le projet :**
   ```bash
   git clone [https://github.com/IslemFou/pixelcrafthub-frontend.git](https://github.com/IslemFou/pixelcrafthub-frontend.git)
   cd pixelcrafthub-frontend

## Installer les dépendances :

Bash
npm install
Lancer le serveur de développement :

Bash
npm run dev
Accéder à l'application :
Ouvrez http://localhost:5173 dans votre navigateur.

## 📂 Structure du Projet
Plaintext
src/
 ├── api/           # Configuration Axios & Appels API
 ├── components/    # Composants réutilisables (Navbar, Button, etc.)
 ├── context/       # Gestion de l'état global (AuthContext)
 ├── pages/         # Vues principales de l'application
 ├── App.jsx        # Root component & Routing
 └── index.css      # Directives Tailwind v4
🤝 Backend
Le serveur de cette application se trouve sur le dépôt suivant :
👉 PixelCraftHub Backend

## 📝 Licence
Distribué sous la licence MIT. Voir LICENSE pour plus d'informations.