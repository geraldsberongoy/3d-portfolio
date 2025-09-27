# Component Documentation

This document provides detailed information about all components in the 3D portfolio application.

## 📁 Component Structure

```
src/components/
├── Button.jsx              # Custom button component
├── Footer.jsx              # Site footer
├── Navbar.jsx              # Navigation header  
├── TitleHeader.jsx         # Section title component
├── ChatBot/                # AI chatbot system
│   ├── ChatBot.jsx         # Main chat interface
│   ├── ChatMessage.jsx     # Individual message component
│   └── TypingIndicator.jsx # Loading animation
├── HeroModels/             # 3D models for hero section
│   ├── HeroExperience.jsx  # Main 3D scene
│   ├── HeroLights.jsx      # Lighting setup
│   ├── Particles.jsx       # Particle effects
│   ├── Room.jsx            # 3D room model
│   └── useInView.jsx       # Intersection observer hook
├── magicui/                # Custom UI effects
│   └── border-beam.jsx     # Animated border effect
└── TechStackModels/        # 3D tech visualization
    └── TechIconCardExperience.jsx # Tech skill 3D cards
```

---

## 🔧 Core Components

### Button.jsx

Custom button component with hover effects and animations.

**Props:**
- `text` (string): Button label text
- `className` (string): Additional CSS classes
- `svg` (ReactNode): Icon to display
- `href` (string): Link destination
- `target` (string): Link target attribute
- `rel` (string): Link relationship attribute
- `onClick` (function): Click handler

**Features:**
- Smooth hover animations
- Icon support
- Link and button variants
- Accessibility support

**Usage:**
```jsx
<Button
  text="View Projects"
  className="w-60 h-16"
  svg={<ArrowDown />}
  href="#projects"
/>
```

---

### Navbar.jsx

Responsive navigation header with smooth scrolling links.

**Features:**
- Responsive hamburger menu for mobile
- Smooth scroll to sections
- Active section highlighting
- GSAP animations

**State:**
- `isMenuOpen` (boolean): Mobile menu visibility

**Navigation Links:**
- About (#about)
- Skills (#skills)  
- Projects (#projects)

---

### Footer.jsx

Site footer with social links and copyright information.

**Features:**
- Social media links
- Copyright notice
- Responsive design
- Hover animations

---

### TitleHeader.jsx

Reusable section title component with animations.

**Props:**
- `title` (string): Main section title
- `subtitle` (string): Section subtitle/description
- `className` (string): Additional styling

**Features:**
- GSAP scroll-triggered animations
- Consistent typography
- Responsive text scaling

---

## 🤖 ChatBot Components

### ChatBot.jsx

Main chatbot interface with full conversation management.

**State Management:**
- `isOpen` (boolean): Chat window visibility
- `isMinimized` (boolean): Minimized state
- `messages` (array): Chat message history
- `inputMessage` (string): Current input text
- `isTyping` (boolean): Bot typing indicator
- `isLoading` (boolean): Request processing state

**Key Features:**
- Message history management
- Typing indicators
- Quick suggestion prompts
- Minimizable interface
- Error handling
- Responsive design

**Message Structure:**
```javascript
{
  id: number,
  text: string,
  sender: 'user' | 'bot',
  timestamp: Date,
  source?: string,
  provider?: string,
  isError?: boolean
}
```

**Quick Suggestions:**
- "What projects has Gerald built?"
- "What are his technical skills?"
- "Tell me about his experience"
- "How can I contact him?"

---

### ChatMessage.jsx

Individual message component with sender-specific styling.

**Props:**
- `message` (object): Message data object

**Features:**
- User vs bot message styling
- Timestamp display
- Source attribution
- Error state handling
- Text formatting

---

### TypingIndicator.jsx

Animated typing indicator for bot responses.

**Features:**
- Animated dots effect
- Smooth animations
- Consistent with chat design

---

## 🎮 3D Components (HeroModels)

### HeroExperience.jsx

Main 3D scene coordinator for the hero section.

**Features:**
- Canvas setup and configuration
- Camera positioning
- Scene composition
- Performance optimization
- Mobile/desktop conditional rendering

**3D Scene Structure:**
```jsx
<Canvas>
  <Suspense fallback={<Loading />}>
    <HeroLights />
    <Room />
    <Particles />
  </Suspense>
</Canvas>
```

---

### HeroLights.jsx

Lighting setup for the 3D hero scene.

**Light Configuration:**
- **Ambient Light**: Overall scene illumination
- **Directional Light**: Primary lighting with shadows
- **Point Lights**: Accent lighting
- **Spot Lights**: Focused illumination

**Props:**
- Customizable intensity and positioning
- Shadow casting configuration
- Color temperature settings

---

### Room.jsx

3D room model component with interactive elements.

**Features:**
- GLB model loading
- Animation integration
- Interactive hover effects
- Optimized performance
- Responsive scaling

**Model Configuration:**
- Scale adjustments for different screens
- Position and rotation settings
- Material property controls

---

### Particles.jsx

Particle system for ambient effects.

**Features:**
- Dynamic particle generation
- Physics-based movement
- Performance-optimized rendering
- Customizable particle properties

**Configuration Options:**
- Particle count
- Movement patterns
- Color schemes
- Size variations

---

### useInView.jsx

Custom hook for intersection observer functionality.

**Features:**
- Element visibility detection
- Threshold configuration
- Performance optimization
- Animation triggering

**Usage:**
```jsx
const [ref, isInView] = useInView();

useEffect(() => {
  if (isInView) {
    // Trigger animations
  }
}, [isInView]);
```

---

## 🎨 UI Effects (magicui)

### border-beam.jsx

Animated border effect component.

**Props:**
- `className` (string): Container styling
- `size` (number): Border thickness
- `duration` (number): Animation duration
- `borderWidth` (number): Border width
- `colorFrom` (string): Starting color
- `colorTo` (string): Ending color

**Features:**
- CSS gradient animations
- Customizable timing
- Hardware acceleration
- Smooth transitions

---

## 🛠️ Tech Stack Components

### TechIconCardExperience.jsx

3D visualization for technology skills.

**Props:**
- `skills` (array): Array of skill objects
- `category` (string): Skill category name

**Skill Object Structure:**
```javascript
{
  name: string,
  modelPath: string,
  logoPath: string,
  scale: number,
  rotation: [x, y, z],
  position?: [x, y, z]
}
```

**Features:**
- Interactive 3D models
- Hover animations
- Category-based organization
- Responsive grid layout
- Performance optimization

**3D Model Handling:**
- GLB model loading
- Error boundaries
- Loading states
- Fallback images

---

## 📱 Responsive Behavior

### Breakpoint Strategy

All components follow a mobile-first responsive approach:

- **Mobile**: < 768px
- **Tablet**: 768px - 1279px  
- **Desktop**: 1280px+

### 3D Responsive Patterns

```jsx
const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

return (
  <>
    {isDesktop && <ThreeJSComponent />}
    {!isDesktop && <StaticAlternative />}
  </>
);
```

### Touch Optimizations

- Larger touch targets for mobile
- Gesture-friendly interactions
- Optimized 3D performance
- Reduced motion options

---

## 🎯 Animation Patterns

### GSAP Integration

Most components use GSAP for animations:

```jsx
useGSAP(() => {
  gsap.fromTo(
    ".animate-element",
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  );
});
```

### Animation Triggers

- **Page Load**: Hero animations
- **Scroll**: Section reveals
- **Hover**: Interactive feedback
- **Click**: Action confirmations

---

## ⚡ Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: 3D models and heavy components
2. **Code Splitting**: Dynamic imports for large components
3. **Memoization**: React.memo for expensive renders
4. **Debouncing**: Input handlers and scroll events
5. **Asset Optimization**: Compressed models and images

### Memory Management

- Proper cleanup in useEffect hooks
- 3D model disposal
- Event listener cleanup
- Animation cleanup

---

## 🧪 Testing Approach

### Component Testing

```jsx
// Example test structure
describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### 3D Component Testing

- Mock Three.js components
- Test fallback states
- Performance testing
- Cross-browser compatibility

---

This component documentation provides a comprehensive guide to understanding and working with the portfolio's component architecture. Each component is designed for reusability, performance, and maintainability.