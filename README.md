# Aryzen Portfolio

<div align="center">
  <h3>The Next Generation of Personal Branding</h3>
  <p>A high-performance, single-page React application engineered for speed, fluidity, and visual impact.</p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

---

## 🚀 Overview

**Aryzen - Advanced Personal Portfolio** is a cutting-edge web experience designed to bridge the gap between rigorous engineering and premium design. Built with **React 19**, **TypeScript**, and **Tailwind CSS**, this portfolio moves beyond static templates to offer a fully interactive, app-like environment.

The interface features a sophisticated **"Matte-Glass" design system**, utilizing heavy `backdrop-filter` effects, deep gradients, and parallax layering to create depth. Navigation is powered by a custom **Scroll-Snap Architecture**, ensuring that each section—Home, Journey, Projects, and Contact—locks into view with precision.

Whether viewing on a 4K display or a compact mobile device, the layout adapts intelligently. The desktop experience offers a unique **"Right-Row" layout** (Image Left, Content Right) with generous negative space, while the mobile view transforms into an optimized **Stacked Interface** (Content Top, Image Bottom) to prioritize readability and touch interaction.

---

## ✨ Key Features

### 🎨 Advanced UI/UX
- **Glassmorphism 2.0**: A refined take on glass UI with frosted overlays, subtle borders, and dynamic shadows (`shadow-[0_0_120px_rgba(0,0,0,1)]`).
- **Fluid Layout Engine**: A responsive system that not only resizes but *re-architectures* itself based on the device.
    - **Desktop**: Text constraints (`md:w-[60%]`) create safe zones for imagery.
    - **Mobile**: Calculated hard stops (`pb-[50vh]`) prevent UI overlap.
- **Micro-Interactions**: Hover states, scale effects, and custom cursors bring the interface to life.

### ⚡ Technical Highlights
- **Interactive Gallery**: A `GalleryModal` leveraging `useMemo` for category filtering and optimized media handling for both images and video.
- **Project Sandbox**: A `SandboxModal` that simulates a virtualization environment before loading live demos, adding immersion to the project showcase.
- **Performance First**: Native HTML5 video implementation for background ambiance without heavy library overhead.
- **Strict Typing**: Comprehensive TypeScript interfaces (`Project`, `GalleryImage`) ensure robust data handling and fewer runtime errors.

---

## 🛠️ Technology Stack

| Core | Styling & UI | Logic & State |
| :--- | :--- | :--- |
| **React 19** | Tailwind CSS | React Hooks (`useState`, `useEffect`) |
| **TypeScript** | PostCSS | `useMemo` & `useRef` |
| **Vite** | Modern CSS3 | Custom Scroll Logic |

---

## 📂 Architecture

The project structure is designed for scalability and ease of maintenance.

```plaintext
src/
├── components/          # Reusable UI Blocks
│   ├── Navbar.tsx       # Global Navigation & Logo
│   ├── Slideshow.tsx    # Hero/About Image Rotator
│   ├── GalleryModal.tsx # Fullscreen Media Viewer
│   └── SandboxModal.tsx # Project Preview Environment
├── Media/               # Static Assets (Images/Videos)
├── constants.tsx        # Centralized Content Logic (CMS)
├── types.ts             # TypeScript Definitions
├── App.tsx              # Core Layout & Routing Logic
└── main.tsx             # Entry Point
```

### Content Management System (CMS)
All content—projects, gallery images, and social links—is managed via `constants.tsx`. This allows you to update the portfolio without touching the component logic.

**Example: Adding a New Project**
```typescript
{
  id: 'new-project',
  title: 'AI Dashboard',
  description: 'Real-time analytics platform.',
  longDescription: '...',
  techStack: ['Next.js', 'Python'],
  imageUrl: '...',
  demoUrl: '...'
}
```

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/aryzen-portfolio.git
    cd aryzen-portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

---

<div align="center">
  <p>Engineered with ❤️ by <b>Aryzen</b></p>
  <p><i>"Building the Next Operating System is my Core Directive."</i></p>
</div>
