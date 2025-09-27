# 3D Portfolio - Gerald S. Berongoy

A modern, interactive 3D portfolio website showcasing projects, skills, and experience with stunning visual effects and smooth animations.

![Portfolio Preview](public/images/preview.png)

## ✨ Features

- **Interactive 3D Models**: Powered by Three.js and React Three Fiber
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **AI-Powered Chatbot**: Interactive assistant to answer questions about projects and skills
- **Smooth Animations**: GSAP-powered animations for enhanced user experience
- **Modern UI Components**: Built with React, Tailwind CSS, and custom components
- **Performance Optimized**: Fast loading with Vite and optimized 3D models
- **Analytics Integration**: Vercel Analytics for performance monitoring

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Three.js** - 3D graphics and WebGL rendering
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **GSAP** - Professional-grade animation library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### UI & Components
- **Lucide React** - Beautiful icon library
- **Motion** - Animation library for React
- **React Responsive** - Responsive design utilities
- **Custom Components** - Reusable UI components

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript Support** - Type definitions included
- **Hot Module Replacement** - Fast development workflow

## 📂 Project Structure

```
3d-portfolio/
├── public/
│   ├── images/           # Static images and assets
│   │   ├── logos/        # Technology logos
│   │   ├── projects/     # Project screenshots
│   │   └── textures/     # 3D model textures
│   └── models/           # 3D model files (.glb)
├── src/
│   ├── components/       # Reusable React components
│   │   ├── ChatBot/      # AI chatbot implementation
│   │   ├── HeroModels/   # 3D models for hero section
│   │   ├── magicui/      # Custom UI components
│   │   └── TechStackModels/ # 3D tech stack visualizations
│   ├── sections/         # Main page sections
│   │   ├── About.jsx     # About section
│   │   ├── Hero.jsx      # Hero/landing section
│   │   ├── ProjectSection.jsx # Projects showcase
│   │   └── TechStack.jsx # Skills and technologies
│   ├── constants/        # Application constants and data
│   ├── lib/              # Utility functions
│   └── services/         # External service integrations
├── components.json       # Component library configuration
├── tailwind.config.js    # Tailwind CSS configuration
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
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📱 Sections Overview

### 🏠 Hero Section
- Interactive 3D room model (desktop only)
- Animated text carousel showcasing different aspects
- Social media links (GitHub, LinkedIn)
- Call-to-action buttons (Projects, Resume)
- Responsive design with mobile-first approach

### 👨‍💻 About Section
- Personal introduction and background
- Education and experience highlights
- Professional journey overview

### 🔧 Tech Stack Section
- Interactive 3D models of technologies
- Categorized skills (Frontend, Backend, Database, Version Control)
- Hover effects and animations
- Technology logos and descriptions

### 💻 Projects Section
- Showcases of completed projects
- Project descriptions and technologies used
- Links to live demos and source code
- Project screenshots and previews

### 🤖 AI Chatbot
- Interactive assistant for visitors
- Answers questions about projects, skills, and experience
- Quick suggestion prompts
- Minimizable and closable interface
- Typing indicators and smooth animations

## 🎨 Key Features Explained

### 3D Models & Animations
- **Three.js Integration**: Custom 3D scenes with optimized models
- **Interactive Elements**: Hover effects and smooth transitions
- **Performance Optimized**: Lazy loading and efficient rendering
- **Responsive 3D**: Different experiences for mobile vs desktop

### Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Conditional Rendering**: Different layouts for mobile/desktop
- **Touch-Friendly**: Mobile-optimized interactions

### Modern Development Practices
- **Component-Based Architecture**: Reusable and maintainable components
- **Custom Hooks**: Efficient state management
- **Performance Monitoring**: Analytics integration
- **SEO Optimized**: Meta tags and semantic HTML

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `dist` folder to your web server
3. Configure server for SPA routing

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific configurations:

```env
VITE_ANALYTICS_ID=your_analytics_id
VITE_CHATBOT_API_URL=your_chatbot_api_url
```

### Customization
- **Colors**: Modify `tailwind.config.js` for theme colors
- **3D Models**: Replace models in `/public/models/`
- **Content**: Update constants in `/src/constants/index.js`
- **Components**: Customize components in `/src/components/`

## 📊 Performance

- **Lighthouse Score**: 95+ performance rating
- **3D Model Optimization**: Compressed .glb files
- **Image Optimization**: WebP format support
- **Code Splitting**: Dynamic imports for better loading
- **Caching Strategy**: Optimized asset caching

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
- Portfolio: [geraldsberongoy.dev](https://geraldsberongoy.dev)
- GitHub: [@geraldsberongoy](https://github.com/geraldsberongoy)
- LinkedIn: [Gerald Berongoy](https://linkedin.com/in/geraldberongoy)

## 🙏 Acknowledgments

- **Three.js Community** - For the amazing 3D library
- **React Three Fiber** - For the React integration
- **Vercel** - For hosting and analytics
- **IconScout** - For 3D model assets
- **DevIcons** - For technology logos

---

⭐ Star this repository if you found it helpful!
