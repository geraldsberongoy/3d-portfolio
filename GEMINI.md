# Project Overview
This is a modern, interactive 3D portfolio website showcasing projects, skills, and experience with stunning visual effects and smooth animations. 

**Core Technologies:**
- **Frontend Framework:** React 19, Vite
- **3D & Graphics:** Three.js, React Three Fiber (`@react-three/fiber`), React Three Drei, React Three Postprocessing
- **Styling:** Tailwind CSS 4 (Utility-first), Lucide React (Icons), `clsx` and `tailwind-merge`
- **Animations:** GSAP (GreenSock Animation Platform) and Motion
- **Features:** 3D models integration (.glb), AI Chatbot Assistant, responsive layout, performance tier monitoring, mobile-first design.

## Architecture
- **`src/components/`**: Reusable UI components (Navbar, Button, TitleHeader). Subdirectories for specific domains like `ChatBot/`, `HeroModels/`, and `TechStackModels/`.
- **`src/sections/`**: Main page sections (Hero, About, TechStack, ProjectSection).
- **`src/constants/`**: Static data, configuration, and model paths.
- **`src/context/`**: React Context for global state management (e.g., `PerformanceContext`).
- **`src/hooks/`**: Custom hooks for reusable logic (e.g., `usePerformanceTier`).
- **`src/lib/`**: Utility functions.
- **`src/services/`**: External API integrations (e.g., `chatbotService.js`).
- **`public/models/`**: Stores 3D assets in optimized GLB format.

## Building and Running

The project relies on Node.js (v18+) and npm.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Create a production build (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview

# Run ESLint to check for code quality issues
npm run lint
```

## Development Conventions

1. **Component Design**: Follow a component-based architecture with functional components and hooks. Use an early return pattern responsibly (always place hooks *before* early returns).
2. **3D Implementation**: Use `@react-three/fiber` for rendering 3D models. Models must be in GLB format and lazy-loaded to improve performance. Use `primitive` objects for custom models.
3. **Animations**: Prefer GSAP for complex timeline-based animations and scroll-triggered events via the `useGSAP` hook.
4. **Responsive Design**: Follow a mobile-first approach. Use `react-responsive` for breakpoint-based conditional rendering (e.g., skipping heavy 3D rendering on mobile if needed). 
5. **State Management**: Keep global state minimal (using Context API). Most component state should be managed locally.
6. **ESM Rules**: The project uses `"type": "module"`. Avoid CommonJS variables like `__dirname` or `__filename`. If paths must be resolved, use `import.meta.url` with `fileURLToPath`.
7. **Performance**: Provide graceful fallbacks or "Performance Tiers" for lower-end devices to disable or reduce 3D asset fidelity. Use Vercel Analytics for tracking.
