# API Documentation

This document describes the API integrations and external services used in the 3D portfolio application.

## 🤖 Chatbot Service API

### Overview

The chatbot service provides AI-powered responses to user queries about Gerald's portfolio, skills, and projects.

### Service Configuration

**File**: `src/services/chatbotService.js`

```javascript
export const chatbotService = {
  async sendMessage(message) {
    // Implementation details
  },
};
```

### API Endpoints

#### Send Message

**Endpoint**: `POST /api/chat`

**Request:**

```json
{
  "message": "What projects has Gerald built?",
  "context": {
    "sessionId": "unique-session-id",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Response:**

```json
{
  "reply": "Gerald has built several impressive projects including...",
  "source": "portfolio_data",
  "provider": "gemini",
  "confidence": 0.95,
  "timestamp": "2024-01-15T10:30:01Z"
}
```

**Error Response:**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "timestamp": "2024-01-15T10:30:01Z"
  }
}
```

### Response Types

The chatbot can provide responses about:

#### Projects

- Project descriptions and features
- Technologies used
- GitHub links and live demos
- Development challenges and solutions

#### Skills & Experience

- Technical skill assessments
- Programming languages proficiency
- Framework experience
- Tool expertise

#### Contact & General Info

- Contact information
- Educational background
- Professional experience
- Career goals

### Implementation Example

```javascript
// Basic usage
try {
  const response = await chatbotService.sendMessage(userInput);

  const botMessage = {
    id: Date.now(),
    text: response.reply,
    sender: "bot",
    timestamp: new Date(),
    source: response.source,
    provider: response.provider,
  };

  setMessages((prev) => [...prev, botMessage]);
} catch (error) {
  console.error("Chat error:", error);
  // Handle error state
}
```

---

## 📊 Analytics Integration

### Vercel Analytics

**Package**: `@vercel/analytics`

#### Setup

```javascript
// main.jsx
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
```

#### Tracked Events

- Page views
- User interactions
- Performance metrics
- Conversion events

### Custom Event Tracking

```javascript
// Track custom events
import { track } from "@vercel/analytics";

// Example usage
const handleProjectClick = (projectName) => {
  track("project_viewed", {
    project: projectName,
    section: "projects",
  });
};

const handleResumeDownload = () => {
  track("resume_downloaded", {
    source: "hero_section",
  });
};
```

---

## 🎨 External Asset APIs

### 3D Model Sources

#### GLB Model Files

- **Location**: `/public/models/`
- **Format**: Binary glTF (.glb)
- **Optimization**: Draco compression
- **Loading**: Lazy loading with React Suspense

#### Model Configuration

```javascript
// constants/index.js
export const techCategories = [
  {
    name: "Frontend",
    skills: [
      {
        name: "React",
        modelPath: "/models/react_logo-transformed.glb",
        logoPath: "/images/logos/react.png",
        scale: 1,
        rotation: [0, 0, 0],
        position: [0, 0, 0],
      },
    ],
  },
];
```

### Image Assets

#### Technology Logos

- **CDN**: DevIcons CDN
- **Format**: SVG (preferred) / PNG
- **Loading**: Lazy loading with loading states

```javascript
// Example logo sources
{
  name: "JavaScript",
  logoPath: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
}
```

#### Project Screenshots

- **Location**: `/public/images/projects/`
- **Formats**: WebP, PNG, JPEG
- **Optimization**: Compressed and responsive

---

## 🔒 Environment Configuration

### Environment Variables

#### Development (.env.development)

```bash
VITE_APP_ENV=development
VITE_CHATBOT_API_URL=http://localhost:3001/api/chat
VITE_ANALYTICS_ENABLED=false
VITE_DEBUG_MODE=true
```

#### Production (.env.production)

```bash
VITE_APP_ENV=production
VITE_CHATBOT_API_URL=https://api.geraldsberongoy.dev/chat
VITE_ANALYTICS_ENABLED=true
VITE_DEBUG_MODE=false
VITE_ANALYTICS_ID=your_analytics_id
```

### Usage in Components

```javascript
const isProduction = import.meta.env.VITE_APP_ENV === "production";
const apiUrl = import.meta.env.VITE_CHATBOT_API_URL;
const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
```

---

## 🌐 External Service Integrations

### Social Media APIs

#### GitHub API

```javascript
// Fetch repository information
const fetchGitHubRepos = async (username) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos = await response.json();
  return repos.filter((repo) => !repo.fork && repo.stargazers_count > 0);
};
```

#### LinkedIn Integration

- Social sharing buttons
- Profile linking
- Professional network integration

### Resume/CV Service

#### Google Docs Integration

```javascript
const resumeUrl =
  "https://docs.google.com/document/d/12Sj91nc5-t2na0UeoUpnIP3cTseSPudJ/edit?usp=sharing&ouid=108222698303140592739&rtpof=true&sd=true";

// Track resume views
const handleResumeView = () => {
  track("resume_viewed", {
    source: window.location.pathname,
  });
  window.open(resumeUrl, "_blank");
};
```

---

## 📱 Responsive Image API

### Dynamic Image Optimization

```javascript
// Image optimization utility
const getOptimizedImageUrl = (imagePath, width = 800, quality = 80) => {
  if (import.meta.env.VITE_APP_ENV === "production") {
    return `${imagePath}?w=${width}&q=${quality}&format=webp`;
  }
  return imagePath;
};

// Usage example
<img
  src={getOptimizedImageUrl("/images/projects/project1.png", 600)}
  alt="Project screenshot"
  loading="lazy"
/>;
```

---

## 🚀 Performance APIs

### Web Vitals Tracking

```javascript
// src/utils/webVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

export const trackWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

// Usage
trackWebVitals((metric) => {
  console.log(metric);
  // Send to analytics service
  track("web_vital", {
    name: metric.name,
    value: metric.value,
    id: metric.id,
  });
});
```

### 3D Performance Monitoring

```javascript
// Monitor 3D rendering performance
const monitor3DPerformance = () => {
  let frames = 0;
  let lastTime = performance.now();

  const measureFPS = () => {
    frames++;
    const currentTime = performance.now();

    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));

      // Track performance metrics
      track("3d_performance", {
        fps: fps,
        timestamp: currentTime,
      });

      frames = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(measureFPS);
  };

  measureFPS();
};
```

---

## 🔧 API Error Handling

### Error Types

```javascript
export const API_ERRORS = {
  NETWORK_ERROR: "NETWORK_ERROR",
  RATE_LIMIT: "RATE_LIMIT_EXCEEDED",
  SERVER_ERROR: "SERVER_ERROR",
  INVALID_REQUEST: "INVALID_REQUEST",
  TIMEOUT: "REQUEST_TIMEOUT",
};
```

### Error Handler Utility

```javascript
// src/utils/apiErrorHandler.js
export const handleApiError = (error) => {
  console.error("API Error:", error);

  switch (error.code) {
    case API_ERRORS.RATE_LIMIT:
      return "Too many requests. Please wait a moment and try again.";

    case API_ERRORS.NETWORK_ERROR:
      return "Network connection issue. Please check your internet connection.";

    case API_ERRORS.SERVER_ERROR:
      return "Server temporarily unavailable. Please try again later.";

    case API_ERRORS.TIMEOUT:
      return "Request timed out. Please try again.";

    default:
      return "An unexpected error occurred. Please try again.";
  }
};
```

### Retry Logic

```javascript
// Retry utility for failed API calls
const apiWithRetry = async (apiCall, maxRetries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, delay * Math.pow(2, attempt - 1))
      );
    }
  }
};
```

---

## 📚 API Testing

### Mock API Responses

```javascript
// src/mocks/chatbotMocks.js
export const mockChatbotResponses = {
  projects:
    "Gerald has built several impressive projects including a facial recognition attendance system, a disaster alert application, and various web applications using React and Node.js.",

  skills:
    "Gerald is proficient in JavaScript, Python, React, Node.js, Three.js, and various other modern web technologies. He has experience with both frontend and backend development.",

  contact:
    "You can reach Gerald through his GitHub profile, LinkedIn, or through the contact form on this portfolio.",
};
```

### Testing Utilities

```javascript
// src/utils/apiTest.js
export const testApiEndpoint = async (endpoint, payload) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return {
      status: response.status,
      data: await response.json(),
      success: response.ok,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
```

---

This API documentation covers all external integrations and service communications within the 3D portfolio application. It provides clear guidelines for implementation, error handling, and testing.
