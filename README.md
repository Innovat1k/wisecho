# 💼 <Wisecho>

![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Wisecho is a fully responsive quote generator app built with React.js and Tailwind CSS, featuring theme preview, tag-based filtering, favorites management, real-time statistics, and a complete test suite.

---

## 🧭 Table of Contents

- [📝 Description](#-description)
- [✨ Features](#-features)
- [🔧 Technologies Used](#-technologies-used)
- [📦 Installation & Usage](#-installation--usage)
- [🧪 Tests](#-tests)
- [🗂️ Project Structure](#-project-structure)
- [📄 License](#-license)

---

## 📝 Description

Wisecho allows users to:

- Generate random or filtered quotes by tag
- Preview and switch between multiple themes
- Add and manage favorite quotes
- View real-time statistics on generated and favorited quotes

The app follows a **mobile-first approach**, is fully responsive, and uses a **modular, scalable architecture** with **Jotai** for state management.  
It also includes a **robust test suite** using **Vitest** and **React Testing Library** for maintainability and reliability.

---

## ✨ Features & Navigation

- **Quotes Management**
  - Generate random quotes
  - Filter quotes by category
  - Add quotes to favorites
- **Theme Selector**
  - Preview available themes
  - Select and apply a theme
- **Statistics**
  - View number of generated quotes
  - View favorite quotes
  - Delete a quote from favorites

---

## 🗺️ Roadmap

For planned features and future improvements, see [ROADMAP.md](./ROADMAP.md).

## 🔧 Technologies Used

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jotai](https://jotai.org/) – state management
- [Framer Motion](https://www.framer.com/motion/) – animations
- [Vite](https://vitejs.dev/) – dev & build tool
- [React Icons](https://react-icons.github.io/react-icons/) – icons
- [Vitest](https://vitest.dev/) – testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) – testing utilities

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

# 5. Run tests
npm run test
```

---

## 🧪 Tests

The project includes a full testing setup:

- Unit tests for custom hooks (`useResponsive`, `useQuoteFetcher`)
- Integration tests for global features (theme switching, favorites, statistics reset)
- Mocking of browser APIs and external dependencies for reliable, predictable tests

```bash
npm run test
```

---

## 🗂️ Project Structure

```bash
src/
├── tests/                   # Global tests (App.test.jsx, etc.)
├── features/                # App-specific features
│   ├── favorites/           # Favorites management
│   │   ├── components/      # Components related to favorites
│   │   └── hooks/           # Hooks specific to favorites
│   ├── quote/               # Quotes management
│       ├── components/
│       └── hooks/
│
├── shared/                  # Reusable code across the project
│   ├──__tests__/               # Shared/util test helpers
│   ├── atoms/               # Global state management (Jotai)
│   ├── components/          # Generic UI components
│   ├── hooks/               # Generic hooks (useResponsive, useQuoteFetcher, etc.)
│   └── themes/              # Global themes and styles
│
│
├── App.jsx                  # Main entry point of the app
└── main.jsx                 # Bootstrap React

server/
└── index.js                 # Backend server entry point
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
