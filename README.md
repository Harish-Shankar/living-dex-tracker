# 🎮 Living Dex Tracker

A beautiful, persistent Pokémon Living Dex tracker that works across all mainline Pokémon games. Track your collection progress with shiny sprites, multiple save files per game, and cloud sync.

![Living Dex Tracker](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/25.png)

## ✨ Features

- **All Mainline Games** - From Red/Blue to Scarlet/Violet, track every game's National Dex
- **Multiple Saves Per Game** - Create unlimited save files for each game (e.g., "Nuzlocke Run", "Shiny Hunt")
- **Smart Status Tracking** - Mark Pokémon as Caught, Need to Evolve, Need to Breed, Need to Hatch, or Not Caught
- **Shiny Sprites** - All Pokémon displayed with their gorgeous 3D HOME shiny variants
- **PC Box View** - Familiar 30-slot box interface with easy navigation
- **Cloud Sync** - Your progress syncs across all devices via Firebase
- **Simple Auth** - Email/password authentication (no email verification required)
- **Beautiful UI** - Dark theme with game-specific accent colors

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Firebase account (free tier works great)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd pokemon-tracker
npm install
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" (or use an existing one)
3. Once created, click the gear icon → Project Settings
4. Scroll down to "Your apps" and click the Web icon (`</>`)
5. Register your app with a nickname (e.g., "Living Dex Tracker")
6. Copy the `firebaseConfig` object

### 3. Configure Firebase

Open `src/firebase.js` and replace the config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Enable Firebase Services

In Firebase Console:

1. **Authentication**:
   - Go to Build → Authentication
   - Click "Get Started"
   - Enable "Email/Password" provider

2. **Firestore Database**:
   - Go to Build → Firestore Database
   - Click "Create database"
   - Choose "Start in production mode"
   - Select a region close to you
   - After creation, go to Rules tab and set:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` - you're ready to track!

## 🌐 Deployment

### Option A: Firebase Hosting (Recommended)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login and initialize:
```bash
firebase login
firebase init hosting
```
- Select your project
- Set `dist` as the public directory
- Configure as single-page app: Yes
- Don't overwrite index.html

3. Build and deploy:
```bash
npm run build
firebase deploy
```

Your app is live at `https://your-project-id.web.app`!

### Option B: Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy (it auto-detects Vite)

Your app is live at `https://your-project.vercel.app`!

### Option C: Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. "New site from Git" → Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`

## 📱 Usage Guide

### Creating a Save

1. Sign up or log in
2. Select a game (e.g., HeartGold/SoulSilver)
3. Click "Create New Save"
4. Name your save (e.g., "Main Playthrough")

### Tracking Pokémon

- **Left Click**: Toggle between Caught ↔ Not Caught
- **Right Click**: Open status menu
  - ✓ **Caught** - You have this Pokémon
  - ↑ **Evolve** - Need to evolve another Pokémon
  - ♥ **Breed** - Need to breed to get this one
  - ◎ **Hatch** - Have an egg waiting to hatch
  - ○ **Not Caught** - Still need to obtain

### Navigation

- Use arrow buttons to move between boxes
- Use the dropdown to jump to any box
- Box completion dots show which boxes are complete (green)

## 🎨 Game Support

| Game | National Dex Size |
|------|------------------|
| Red/Blue/Yellow | 151 |
| Gold/Silver/Crystal | 251 |
| Ruby/Sapphire/Emerald | 386 |
| FireRed/LeafGreen | 386 |
| Diamond/Pearl/Platinum | 493 |
| HeartGold/SoulSilver | 493 |
| Black/White | 649 |
| Black 2/White 2 | 649 |
| X/Y | 721 |
| Omega Ruby/Alpha Sapphire | 721 |
| Sun/Moon | 802 |
| Ultra Sun/Ultra Moon | 807 |
| Let's Go Pikachu/Eevee | 153 |
| Sword/Shield | 898 |
| Brilliant Diamond/Shining Pearl | 493 |
| Legends: Arceus | 905 |
| Scarlet/Violet | 1025 |

## 🔧 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Firebase (Auth + Firestore)
- **Sprites**: PokeAPI (HOME 3D renders)

## 📄 License

MIT License - feel free to use and modify!

## 🙏 Credits

- Pokémon sprites from [PokeAPI](https://pokeapi.co/)
- Pokémon is © Nintendo/Game Freak/The Pokémon Company

---

Made with ❤️ for Pokémon trainers everywhere
