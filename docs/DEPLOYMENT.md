# Deployment Guide

This guide covers different deployment strategies for the 3D portfolio, from development to production.

## 🚀 Quick Deployment

### Vercel (Recommended)

Vercel provides the best integration for React applications with automatic deployments and optimizations.

#### Setup Steps

1. **Connect Repository**

   ```bash
   # Push your code to GitHub if not already done
   git remote add origin https://github.com/yourusername/3d-portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Environment Variables** (if needed)

   ```bash
   VITE_ANALYTICS_ID=your_vercel_analytics_id
   VITE_CHATBOT_API_URL=your_chatbot_endpoint
   ```

4. **Custom Domain** (Optional)
   - Add custom domain in Vercel dashboard
   - Configure DNS settings with your domain provider

#### Automatic Deployments

- Every push to `main` branch triggers automatic deployment
- Pull requests create preview deployments
- Rollback capability through Vercel dashboard

### Netlify

Alternative platform with excellent static site hosting.

#### Setup Steps

1. **Build Settings**

   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: `18.x` (in environment variables)

2. **Redirects Configuration**
   Create `public/_redirects` file:

   ```
   /*    /index.html   200
   ```

3. **Environment Variables**
   Configure in Netlify dashboard under Site Settings > Environment variables

## 🔧 Manual Deployment

### Traditional Web Hosting

For shared hosting or VPS deployment.

#### Build Process

```bash
# Install dependencies
npm install

# Create production build
npm run build

# The dist/ folder contains your deployable files
ls dist/
```

#### Upload Files

1. Upload contents of `dist/` folder to your web server
2. Configure server to serve `index.html` for all routes
3. Set up HTTPS certificate

#### Server Configuration

**Apache (.htaccess)**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType image/* "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/css "access plus 1 month"
</IfModule>
```

**Nginx**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /var/www/portfolio/dist;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1M;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## 🏗️ Docker Deployment

For containerized deployments.

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: "3.8"
services:
  portfolio:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t 3d-portfolio .

# Run container
docker run -d -p 80:80 --name portfolio 3d-portfolio

# Or use docker-compose
docker-compose up -d
```

## ☁️ Cloud Platform Deployment

### AWS S3 + CloudFront

Cost-effective solution for static site hosting.

#### S3 Setup

```bash
# Build the project
npm run build

# Install AWS CLI and configure
aws configure

# Create S3 bucket
aws s3 mb s3://your-portfolio-bucket

# Upload files
aws s3 sync dist/ s3://your-portfolio-bucket --delete

# Enable static website hosting
aws s3 website s3://your-portfolio-bucket \
    --index-document index.html \
    --error-document index.html
```

#### CloudFront Configuration

```json
{
  "Origins": [
    {
      "DomainName": "your-portfolio-bucket.s3.amazonaws.com",
      "Id": "S3-your-portfolio-bucket",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }
  ],
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-portfolio-bucket",
    "ViewerProtocolPolicy": "redirect-to-https",
    "Compress": true,
    "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
  },
  "CustomErrorResponses": [
    {
      "ErrorCode": 404,
      "ResponseCode": 200,
      "ResponsePagePath": "/index.html"
    }
  ]
}
```

### Google Cloud Platform

#### Google Cloud Storage

```bash
# Create bucket
gsutil mb gs://your-portfolio-bucket

# Upload files
gsutil -m cp -r dist/* gs://your-portfolio-bucket/

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://your-portfolio-bucket

# Configure for web hosting
gsutil web set -m index.html -e index.html gs://your-portfolio-bucket
```

## 🔍 Performance Optimization

### Build Optimizations

#### Vite Configuration

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          "react-three": ["@react-three/fiber", "@react-three/drei"],
          gsap: ["gsap"],
          ui: ["lucide-react", "class-variance-authority"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

#### Asset Optimization

```bash
# Install optimization tools
npm install --save-dev vite-plugin-imagemin

# Add to vite.config.js
import { defineConfig } from 'vite'
import { ViteImageOptimize } from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    ViteImageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] }
    })
  ]
})
```

### CDN Configuration

#### Asset Delivery

- Use CDN for 3D models and images
- Configure proper cache headers
- Implement lazy loading for large assets

#### Example CDN Setup

```javascript
// constants/index.js
const CDN_BASE = "https://cdn.yourdomain.com";

export const techCategories = [
  {
    name: "Frontend",
    skills: [
      {
        name: "React",
        modelPath: `${CDN_BASE}/models/react_logo-transformed.glb`,
        logoPath: `${CDN_BASE}/images/logos/react.png`,
        // ... other config
      },
    ],
  },
];
```

## 🔐 Security Considerations

### Content Security Policy

```html
<!-- Add to index.html -->
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self' data:;"
/>
```

### Environment Variables

```bash
# .env.production
VITE_API_URL=https://api.yourdomain.com
VITE_ANALYTICS_ID=prod_analytics_id

# Never commit sensitive keys to version control
# Use deployment platform's environment variable settings
```

## 📊 Monitoring and Analytics

### Vercel Analytics

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

### Google Analytics

```javascript
// Add to index.html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Performance Monitoring

```javascript
// src/utils/performance.js
export const trackWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Check Node.js version
node --version # Should be 18.x or higher
```

#### 3D Model Loading Issues

- Verify model files are in `/public/models/`
- Check file paths in constants
- Ensure models are optimized GLB format
- Test with smaller models first

#### Deployment Issues

- Check build output in `dist/` folder
- Verify environment variables
- Test locally with `npm run preview`
- Check browser console for errors

### Performance Issues

```bash
# Analyze bundle size
npm install --save-dev vite-bundle-analyzer
npx vite-bundle-analyzer

# Check for large dependencies
npm ls --depth=0 --long
```

## 📝 Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
npm audit fix

# Update major versions carefully
npm outdated
```

### Backup Strategy

- Regular backups of source code
- Database backups (if applicable)
- Asset backups (3D models, images)
- Environment configuration backups

---

This deployment guide should help you successfully deploy your 3D portfolio to various platforms and environments. Choose the option that best fits your needs and technical requirements.
