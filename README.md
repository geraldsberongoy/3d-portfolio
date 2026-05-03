# 3D Portfolio - Gerald S. Berongoy

A modern, interactive 3D portfolio website showcasing projects, skills, and experience with stunning visual effects and smooth animations.

![Portfolio Preview](public/images/image.png)

## ✨ Features

- **Interactive 3D Models**: Powered by Three.js and React Three Fiber. Features optimized `.glb` assets and custom primitive objects.
- **Performance Tier Monitoring**: Automatically detects device capabilities and provides graceful fallbacks for lower-end devices to ensure a smooth experience.
- **AI-Powered Chatbot**: Interactive assistant that can answer questions about projects, skills, and experience, backed by custom PDF and Chatbot services.
- **Smooth Animations**: Complex timeline-based animations and scroll-triggered events powered by GSAP and Motion.
- **Responsive & Mobile-First**: Optimized for all devices using `react-responsive` for breakpoint-based conditional rendering.
- **Modern UI Components**: Built with React 19, Tailwind CSS 4, and a clean utility-first approach.

## 🚀 Tech Stack

### Frontend & Graphics

- **React 19** - Modern React with the latest features.
- **Three.js & React Three Fiber** - 3D graphics and declarative WebGL rendering.
- **React Three Drei & Postprocessing** - Helpers and effects for React Three Fiber.
- **GSAP & Motion** - Professional-grade animation libraries.
- **Tailwind CSS 4** - Utility-first CSS framework using `clsx` and `tailwind-merge`.
- **Vite** - Extremely fast build tool and development server.

### State & Architecture

- **Context API** - Global state management for performance monitoring (`PerformanceContext`).
- **Custom Hooks** - Reusable logic components like `usePerformanceTier`.
- **ES Modules** - Modern standard utilizing `"type": "module"`.

## 📂 Project Structure

```text
3d-portfolio/
├── docs/                 # Documentation (API, Components, Technical, Deployment)
├── public/               # Static assets
│   ├── images/           # Images, logos, and project screenshots
│   └── models/           # Optimized 3D model files (.glb)
├── src/
│   ├── components/       # Reusable React components (UI, ChatBot, 3D Models)
│   ├── constants/        # Application constants, data, and configuration
│   ├── context/          # React Context (e.g., PerformanceContext)
│   ├── data/             # Static structured data (e.g., projects.js)
│   ├── hooks/            # Custom hooks (e.g., usePerformanceTier.js)
│   ├── lib/              # Utility functions
│   ├── scripts/          # Automation scripts (e.g., WebP image conversion)
│   ├── sections/         # Main page sections (Hero, About, TechStack, etc.)
│   └── services/         # External APIs and backend logic (Chatbot, PDF processing)
├── firebase.json         # Firebase hosting configuration
├── package.json          # Project dependencies and scripts
└── vite.config.js        # Vite build configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/geraldsberongoy/3d-portfolio.git
   cd 3d-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Code Quality Checks**
   ```bash
   npm run lint
   ```

## 📱 Architecture & Development

### 3D Implementation Guidelines

- **Models**: Must be in GLB format and lazy-loaded to improve performance. Stored in `/public/models/`.
- **Fallbacks**: Use the built-in Performance Tiering system to scale down or disable heavy 3D rendering on mobile or low-end devices.

### State Management

- Keep global state minimal using the React Context API. Most component state is managed locally.
- Use `usePerformanceTier` to query device capabilities.

### Asset Optimization

- The project includes utility scripts in `src/scripts/` for bulk-converting `.png`, `.jpg`, and `.svg` files to `.webp` format for improved load times.
- Models are manually optimized for web delivery.

## 🚀 Deployment

The project is configured for seamless deployment to **Firebase Hosting**.

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Build the project: `npm run build`
4. Deploy: `firebase deploy --only hosting`

It can also be deployed to platforms like **Vercel** or **Netlify** with standard Vite build settings.

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configurations:

```env
VITE_ANALYTICS_ID=your_analytics_id
VITE_CHATBOT_API_URL=your_chatbot_api_url
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gerald S. Berongoy**

- Portfolio: [geraldberongoy.web.app](https://geraldberongoy.web.app)
- GitHub: [@geraldsberongoy](https://github.com/geraldsberongoy)
- LinkedIn: [Gerald Berongoy](https://linkedin.com/in/geraldberongoy)
