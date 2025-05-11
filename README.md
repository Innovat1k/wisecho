# 💼 <Wisecho>

> <ONE\*LINER_DESCRIPTION>  
> A simple quote generator app to demonstrate my web development skills, featuring a live theme preview and a mobile-first design.

🔗 [Live Demo](https://<PROJECT_SLUG>.netlify.app) &nbsp; | &nbsp; ![GitHub Stars](https://img.shields.io/github/stars/<YOUR_USERNAME>/<REPO_NAME>?style=social)

---

## 🧭 Table of Contents

- [📝 Description](#-description)
- [✨ Features](#-features)
- [🔧 Technologies Used](#-technologies-used)
- [📦 Installation & Usage](#-installation--usage)
- [🔐 Environment Variables](#-environment-variables)
- [🗂️ Project Structure](#-project-structure)
- [🧱 Roadmap](#-roadmap)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributions](#-contributions)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## 📝 Description

<SHORT_PROJECT_DESCRIPTION>  
Wisecho is a mobile-first quote generator app designed to demonstrate web development skills. The app allows users to generate random quotes, manage favorites, and preview and switch themes for better visual comfort. Currently under development with a mobile-first approach, it will later be adapted for larger screens.

📱 Important: The current version is optimized exclusively for mobile devices.
Responsive support for tablets and desktops is planned in upcoming releases.

The project follows a mobile-first design approach and is built with scalability and future enhancements in mind.

---

## 🚫 Mobile-Only Experience

The app is currently optimized for mobile devices only. When accessed on larger screens, a simple message informs users that the app is "mobile-first" and not yet available for desktops/tablets.

````jsx
{screen.isMobile ? (
  <>
    <MainCard />
    <AppDetails />
  </>
) : (
  <ResponsiveGuard message="Currently mobile-first, not available for larger screens" />
)}

## ✨ Features

- [x] Generate random quote
- [x] Preview and change theme
- [ ] Add and manage quotes to favorites
- [ ] Generate quote by selected category

---

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
git clone https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
cd <REPO_NAME>

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev

# 4. Build for production
npm run build
````

---

## 🔐 Environment Variables

If your app uses environment variables, create a `.env` file:

```
VITE_API_KEY=<your_api_key>
VITE_BASE_URL=https://api.example.com
```

---

## 🗂️ Project Structure

```bash
src/
├── atoms/             # Atoms for state management
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── themes/            # Theme variables and settings
├── utils/             # Utility functions
├── App.jsx            # Root component
└── main.jsx           # App entry point
```

---

## 🧱 Roadmap

- [ ] Add favorites system for quotes
- [ ] Get statistics of generated quotes + favorites
- [ ] Change local quote fetching to distant api
- [ ] Persist generation statistics and theme to localStorage
- [ ] Add filtering by tags
- [ ] Adopt a responsive design for larger screen devices
- [ ] Refactor folder structure to hybrid feature type module

---

## 🤝 Contributions

🙅‍♂️ This project does not accept direct contributions (e.g. pull requests) at this time, as it is part of my personal portfolio and learning journey.

However, suggestions, ideas, and bug reports are welcome!

- Open an issue for feedback or feature requests
- Leave a comment or start a discussion (if enabled)
- Reach out through social media or email

Thank you for your interest and support!

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**<YOUR_NAME>** – [@<YOUR_USERNAME>](https://github.com/<YOUR_USERNAME>)  
Feel free to reach out for collaboration or freelance opportunities.
