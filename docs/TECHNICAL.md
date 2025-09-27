# Technical Documentation

## Architecture Overview

This 3D portfolio is built using a modern React architecture with Three.js integration for 3D graphics. The application follows a component-based structure with clear separation of concerns.

### Core Technologies

#### React 19
- Latest React features including concurrent rendering
- Functional components with hooks
- Custom hook patterns for reusable logic
- Context API for state management

#### Three.js + React Three Fiber
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Helper components and utilities
- **React Three Postprocessing**: Post-processing effects
- Custom 3D scenes and models integration

#### GSAP (GreenSock Animation Platform)
- High-performance animations
- Timeline-based animation sequences
- Cross-browser compatibility
- Hardware acceleration

## Component Architecture

### Directory Structure Explained

```
src/
├── components/           # Reusable UI components
│   ├── Button.jsx       # Custom button component
│   ├── Footer.jsx       # Site footer
│   ├── Navbar.jsx       # Navigation header
│   ├── TitleHeader.jsx  # Section title component
│   ├── ChatBot/         # AI chatbot system
│   ├── HeroModels/      # 3D models for hero section
│   ├── magicui/         # Custom UI effects
│   └── TechStackModels/ # 3D tech visualization
├── sections/            # Main page sections
├── constants/           # Static data and configuration
├── lib/                # Utility functions
└── services/           # External API integrations
```

### Component Patterns

#### 1. Section Components
Each main section (Hero, About, TechStack, Projects) follows this pattern:

```jsx
const SectionComponent = () => {
  const sectionRef = useRef(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  useGSAP(() => {
    // Animation logic
  });

  return (
    <section id="section-id" ref={sectionRef}>
      {/* Content */}
    </section>
  );
};
```

#### 2. 3D Model Components
3D components use React Three Fiber patterns:

```jsx
const Model3D = ({ modelPath, scale, rotation, position }) => {
  const { scene } = useGLTF(modelPath);
  
  return (
    <primitive 
      object={scene} 
      scale={scale}
      rotation={rotation}
      position={position}
    />
  );
};
```

## 3D Implementation Details

### Model Loading and Optimization

#### GLB Model Format
- All 3D models are in GLB (binary glTF) format
- Optimized for web delivery with Draco compression
- Models are lazy-loaded to improve initial page load

#### Model Configuration
Models are configured in `constants/index.js`:

```javascript
{
  name: "Technology Name",
  modelPath: "/models/model-name.glb",
  logoPath: "logo-url",
  scale: 1.0,
  rotation: [0, 0, 0],
  position: [0, 0, 0]
}
```

### 3D Scene Setup

#### Lighting Configuration
```jsx
// Ambient lighting for overall scene illumination
<ambientLight intensity={0.5} />

// Directional lighting for shadows and depth
<directionalLight 
  position={[10, 10, 5]} 
  intensity={1} 
/>

// Point lights for specific highlighting
<pointLight 
  position={[0, 5, 0]} 
  intensity={0.8} 
/>
```

#### Camera Configuration
- Perspective camera with optimized FOV
- Responsive camera positioning
- Smooth camera transitions with animations

### Performance Optimizations

#### Level of Detail (LOD)
- Different model complexities for different screen sizes
- Automatic quality adjustment based on device capabilities

#### Frustum Culling
- Objects outside camera view are not rendered
- Automatic optimization by Three.js

#### Texture Optimization
- Compressed texture formats (WebP, AVIF)
- Mipmapping for distant objects
- Texture atlasing for multiple materials

## Animation System

### GSAP Integration

#### Timeline-Based Animations
```jsx
useGSAP(() => {
  const tl = gsap.timeline();
  
  tl.fromTo(
    ".hero-animation",
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.in" }
  );
});
```

#### Scroll-Triggered Animations
- Intersection Observer for performance
- Lazy animation loading
- Smooth scroll interactions

### 3D Model Animations
- Rotation animations for tech stack models
- Hover effects with smooth transitions
- Loading state animations

## Responsive Design Implementation

### Breakpoint Strategy
- Mobile-first approach
- Desktop: 1280px+ (xl)
- Tablet: 768px-1279px (md)
- Mobile: <768px (sm)

### 3D Responsive Patterns
```jsx
const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

return (
  <>
    {isDesktop && <ThreeJSScene />}
    {!isDesktop && <StaticAlternative />}
  </>
);
```

### Touch Interactions
- Touch-optimized 3D controls
- Gesture recognition for model manipulation
- Performance considerations for mobile GPU

## State Management

### Component State Patterns
```jsx
const [isLoading, setIsLoading] = useState(false);
const [modelLoaded, setModelLoaded] = useState(false);
const [animationComplete, setAnimationComplete] = useState(false);
```

### Context Usage
- Minimal global state
- Focused on user preferences and theme
- Performance-conscious implementation

## Chatbot Implementation

### Service Architecture
```javascript
// chatbotService.js
export const chatbotService = {
  async sendMessage(message) {
    // API integration logic
    // Response processing
    // Error handling
  }
};
```

### Message State Management
- Local state for chat history
- Optimistic UI updates
- Typing indicators and loading states

### UI Components
- `ChatBot.jsx`: Main chat interface
- `ChatMessage.jsx`: Individual message component  
- `TypingIndicator.jsx`: Loading animation

## Build Configuration

### Vite Configuration
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap']
        }
      }
    }
  }
});
```

### Code Splitting Strategy
- Route-based splitting for sections
- Library-based chunks (Three.js, GSAP)
- Dynamic imports for 3D models

### Asset Optimization
- Image compression pipeline
- 3D model optimization
- Font subsetting and preloading

## Performance Monitoring

### Metrics Tracked
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- 3D rendering performance (FPS)

### Optimization Techniques
- Lazy loading for non-critical assets
- Image optimization with WebP/AVIF
- Critical CSS inlining
- Service worker caching (if implemented)

## Development Workflow

### Local Development
```bash
npm run dev    # Start development server
npm run build  # Production build
npm run preview # Preview production build
npm run lint   # Code linting
```

### Code Quality
- ESLint configuration for React and Three.js
- Prettier for code formatting
- Git hooks for pre-commit validation

### Testing Considerations
- Component testing with React Testing Library
- Visual regression testing for 3D scenes
- Performance testing with Lighthouse CI

## Browser Compatibility

### WebGL Requirements
- WebGL 1.0 support (most modern browsers)
- Fallback for devices without WebGL
- Progressive enhancement approach

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills and Fallbacks
- WebGL fallback messages
- Reduced motion preferences
- Touch interaction alternatives

## Deployment Architecture

### Static Site Generation
- Pre-built static assets
- CDN-optimized delivery
- Edge caching strategies

### Environment Configuration
- Development vs Production builds
- Environment variable management
- API endpoint configuration

This technical documentation provides a comprehensive overview of the 3D portfolio's implementation details, architecture decisions, and performance considerations.