# 🦒 Kids Alphabet Learning

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=flat&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

A bright, colorful, and interactive alphabet learning application designed for children. Built with a warm, playful kids design style featuring bouncy animations, rainbow letter grids, and fun sound effects. Supports both **English** and **Bahasa Indonesia**.

## ✨ Features

- 🌍 **Bilingual Support**: Toggle between English and Bahasa Indonesia seamlessly.
- 📚 **Rich Vocabulary**: Multiple example words for every letter from A to Z.
- 🎨 **Visual Learning**: Each word is paired with a relevant emoji for better retention.
- 🧠 **Interactive Quiz**: A word-spelling game with scrambled letters, sound clues, and confetti celebrations.
- 🎨 **Kids-Friendly Design**: Warm orange/yellow/cream palette with bouncy animations and rounded shapes.
- 📱 **Responsive Design**: Works perfectly on tablets, phones, and desktops.
- ⚡ **Fast & Modern**: Built with SvelteKit and Tailwind CSS v4 for a smooth experience.

## 📸 Screenshots

| Home Page | Letter Details | Word Quiz |
| :---: | :---: | :---: |
| ![Home](screenshots/home.png) | ![Letter](screenshots/letter.png) | ![Quiz](screenshots/quiz.png) |

## 🎨 Design System

The app uses a custom kids-friendly design system built with Tailwind CSS v4's `@theme` directive:

| Token | Purpose | Color |
|-------|---------|-------|
| **Primary** | Main actions & branding | 🟠 Warm Orange `#F97316` |
| **Accent** | Highlights & secondary | 🟡 Sunny Yellow `#F59E0B` |
| **Sky** | Cool accents | 🔵 Fun Blue `#0EA5E9` |
| **Leaf** | Success states | 🟢 Playful Green `#22C55E` |
| **Berry** | Alerts & variety | 🔴 Fun Rose `#F43F5E` |
| **Cream** | Backgrounds | 🟤 Warm Cream `#FFF9E8` |

**Key design choices:**
- Warm cream gradient background with subtle polka-dot pattern
- Bouncy spring animations using `cubic-bezier(0.34, 1.56, 0.64, 1)` easing
- Rainbow letter grid — each letter cycles through 5 color groups
- Staggered entrance animations on page load
- Confetti celebration on correct quiz answers

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Font**: [Nunito Variable](https://fontsource.org/fonts/nunito)
- **Icons**: [Svelte Feather Icons](https://github.com/0x80/svelte-feather-icons)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/alphabet-for-kids.git
   cd alphabet-for-kids
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Start the development server:
```bash
pnpm dev
```

### Build

Build the project for production:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

### Deployment

This project is currently configured for [Cloudflare Pages](https://pages.cloudflare.com/) using `@sveltejs/adapter-cloudflare`.

If you want to deploy to a different platform (like Vercel, Netlify, or a VPS), you will need to switch the SvelteKit adapter. Refer to the **[Official SvelteKit Adapters Documentation](https://svelte.dev/docs/kit/adapters)** for a list of available adapters and detailed setup instructions.

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, more example words, or improvements to the design, feel free to:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
