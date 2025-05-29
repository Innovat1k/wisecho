# 💼 <Wisecho>

A simple and fully responsive quote generator app to demonstrate my web development skills, featuring theme preview, tag-based filtering, favorites management, and real-time statistics.

---

## 🧭 Table of Contents

- [📝 Description](#-description)
- [✨ Features](#-features)
- [🔧 Technologies Used](#-technologies-used)
- [📦 Installation & Usage](#-installation--usage)
- [🗂️ Project Structure](#-project-structure)
- [🧱 Roadmap](#-roadmap)
- [🤝 Contributions](#-contributions)
- [📄 License](#-license)

---

## 📝 Description

Wisecho is a modern, responsive quote generator app built using React.js and styled with Tailwind CSS. It allows users to:

Generate random or filtered quotes by tag.
Preview and switch between multiple themes for better visual comfort.
Add and manage favorite quotes.
View real-time statistics on generated and favorited quotes.
The project follows a mobile-first approach but has been adapted to be fully responsive across all screen sizes — from mobile to desktop.
It uses a modular architecture and is built with scalability, performance, and user experience in mind.

## ✨ Features

Wisecho currently supports the following user-facing features:

✅ Random quote generation  
✅ Filter quotes by tag  
✅ Preview and switch between multiple themes  
✅ Manage favorite quotes (add/remove)  
✅ Display real-time statistics  
✅ Fully responsive UI (mobile, tablet, desktop)

## 🔧 Technologies Used

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jotai](https://jotai.org/) – state management
- [Framer Motion](https://www.framer.com/motion/) – animations
- [Vite](https://vitejs.dev/) – dev & build tool
- [React Icons](https://react-icons.github.io/react-icons/) – icons

---

## 📦 Installation & Usage

```bash
# 1. Clone the repository
git clone https://github.com/Innovat1k/wisecho.git
cd wisecho

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev

# 4. Build for production
npm run build
```

---

## 🗂️ Project Structure

```bash
src/
├── features/                  # Domain-specific features (e.g., ThemeCard)
│   ├── components/            # UI components specific to a feature
│   ├── hooks/                 # Feature-specific logic and behavior
│   └── ...                    # Additional logic
│
├── shared/                   # Generic UI and reusable logic
│   ├── components/            # Common components (e.g., layout, loaders)
│   ├── hooks/                 # Shared custom hooks used across features
│
├── themes/                   # Theme styles and configuration (CSS variables, logic)
├── atoms/                    # Global state management using Jotai
├── utils/                    # Utility functions and helpers
│
├── App.jsx                   # Root component: sets up the layout and logic
├── main.jsx                  # App entry point (ReactDOM rendering)
└── server.js                 # Lightweight backend proxy (handles CORS for API calls)

```

---

## 🧱 Roadmap

- [x] Add a favorites system for quotes
- [x] Track statistics for generated and favorited quotes
- [x] Switch from local quote fetching to a remote API
- [x] Persist theme, stats, quotes and favorites in `localStorage`
- [x] Add tag-based quote filtering
- [x] Make the app responsive on larger screens
- [x] Refactor project structure to a hybrid feature-based module system
- [ ] Update and improve global styling
- [ ] Implement full test suite for components, hooks and features

---

## 🤝 Contributions

🙅‍♂️ This project does not accept direct contributions at this time, as it is part of my personal portfolio and learning journey.

However, suggestions, ideas, and bug reports are welcome!

- Open an issue for feedback or feature requests
- Leave a comment or start a discussion
- Reach out through social media or email

Thank you for your interest and support!

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---
