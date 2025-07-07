# TimeScope News - Production Deployment Guide

## 🚀 Server Hosting Options

### Option 1: Render (Recommended for beginners)
**Best for:** Simple deployment with minimal setup
**Cost:** Free tier available, $7/month for paid plans

**Steps:**
1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `NODE_ENV=production`
     - `PORT=10000` (Render assigns this automatically)

### Option 2: Railway
**Best for:** Developer-friendly with great DX
**Cost:** $5/month hobby tier

**Steps:**
1. Create account at [railway.app](https://railway.app)
2. Deploy from GitHub repository
3. Configure environment variables:
   - `NODE_ENV=production`
4. Railway auto-detects Node.js and deploys

### Option 3: DigitalOcean App Platform
**Best for:** Managed hosting with competitive pricing
**Cost:** $5/month basic plan

**Steps:**
1. Create account at [digitalocean.com](https://digitalocean.com)
2. Go to App Platform
3. Deploy from GitHub
4. Configure:
   - **Build Command:** `npm run build`
   - **Run Command:** `npm start`

### Option 4: VPS (Advanced)
**Best for:** Full control and cost optimization
**Cost:** $4-10/month depending on provider

**Popular VPS Providers:**
- DigitalOcean Droplets
- Vultr
- Linode
- AWS EC2 (free tier available)

## 🏗️ Build Process

Your app is already configured with production-ready scripts:

```bash
# Install dependencies
npm install

# Build frontend and backend
npm run build

# Start production server
npm start
```

## 📡 Fastly CDN Integration

### Step 1: Set up Fastly Account
1. Create account at [fastly.com](https://fastly.com)
2. Get your Service ID and API Key from the dashboard

### Step 2: Configure Your Domain
1. Point your domain to Fastly's servers
2. Configure origin server (your hosting server IP/URL)
3. Set up SSL certificate (automatic with Fastly)

### Step 3: Caching Configuration
Your app is already optimized with these cache headers:

| Content Type | Browser Cache | CDN Cache | Strategy |
|-------------|---------------|-----------|----------|
| **API Articles** | 5 minutes | 10 minutes | Fast updates |
| **Individual Articles** | 1 hour | 2 hours | Stable content |
| **Featured Articles** | 10 minutes | 30 minutes | Moderate updates |
| **Category Pages** | 5 minutes | 15 minutes | Regular updates |

### Step 4: Cache Purging
Use Fastly's API to purge cache when content updates:

```bash
# Purge all cache
curl -X POST \
  -H "Fastly-Token: YOUR_API_TOKEN" \
  "https://api.fastly.com/service/YOUR_SERVICE_ID/purge_all"

# Purge specific article
curl -X POST \
  -H "Fastly-Token: YOUR_API_TOKEN" \
  "https://api.fastly.com/service/YOUR_SERVICE_ID/purge/article-SLUG"
```

## 🛡️ Security & Performance Features

Your app includes production-ready features:

### Security Headers
- **Helmet.js**: Comprehensive security headers
- **CORS**: Configured for CDN compatibility
- **CSP**: Content Security Policy for XSS protection

### Performance Optimization
- **Gzip Compression**: Reduces bandwidth by 70-80%
- **Caching Headers**: Optimized for CDN and browsers
- **Health Check**: `/health` endpoint for load balancers

### Monitoring
- **Request Logging**: API response times and status codes
- **Error Handling**: Structured error responses
- **Health Checks**: Server status monitoring

## 🔧 Environment Configuration

### Required Environment Variables
```env
NODE_ENV=production
PORT=5000
```

### Optional for Database (if needed later)
```env
DATABASE_URL=your_database_connection_string
```

## 📈 Deployment Workflow

### Recommended CI/CD Pipeline
1. **Code Push** → GitHub/GitLab
2. **Auto Build** → Your hosting platform
3. **Deploy** → Production server
4. **Cache Purge** → Fastly CDN (if content changed)

### Manual Deployment Steps
```bash
# 1. Clone repository
git clone your-repo-url
cd timescope-news

# 2. Install dependencies
npm install

# 3. Build application
npm run build

# 4. Start production server
npm start
```

## 🚨 Troubleshooting

### Common Issues

**Build fails:**
- Check Node.js version (requires 18+)
- Verify all dependencies are installed
- Check TypeScript compilation errors

**Server won't start:**
- Ensure port 5000 is available
- Check environment variables
- Verify build completed successfully

**CDN issues:**
- Verify origin server is accessible
- Check cache headers in browser dev tools
- Confirm SSL certificate is valid

### Health Check
Your app includes a health endpoint: `https://yourdomain.com/health`

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-07T21:47:00.000Z"
}
```

## 📊 Performance Monitoring

### Key Metrics to Monitor
- **Response Time**: API endpoints should respond under 200ms
- **Cache Hit Rate**: Target 90%+ for static content
- **Error Rate**: Keep under 1%
- **Uptime**: Target 99.9%

### Tools for Monitoring
- **Fastly Dashboard**: Real-time CDN analytics
- **Server Logs**: Application performance metrics
- **External Monitoring**: Pingdom, UptimeRobot

## 💡 Pro Tips

1. **Use Fastly's stale-while-revalidate** for better user experience
2. **Monitor cache hit ratios** to optimize performance
3. **Set up automated deployments** for seamless updates
4. **Use environment-specific configurations** for different stages
5. **Implement proper logging** for debugging production issues

## 🔗 Useful Commands

```bash
# Check server status
curl https://yourdomain.com/health

# Test API endpoints
curl https://yourdomain.com/api/articles

# Check cache headers
curl -I https://yourdomain.com/api/articles

# Purge Fastly cache
curl -X POST -H "Fastly-Token: TOKEN" "https://api.fastly.com/service/SERVICE_ID/purge_all"
```

Your TimeScope news application is now production-ready with professional caching, security, and performance optimizations!