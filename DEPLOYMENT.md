# Deployment Guide - Crypto Tracker

## 🚀 Deployment Overview

This guide covers deploying the full-stack crypto tracker to free hosting services.

## 📦 Database Deployment (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 Sandbox - FREE)
4. Wait for cluster creation (5-10 minutes)

### 2. Setup Database Access
1. Go to "Database Access" → "Add New Database User"
2. Choose "Password" authentication
3. Create username/password (save these!)
4. Set privileges to "Read and write to any database"

### 3. Setup Network Access
1. Go to "Network Access" → "Add IP Address"
2. Add `0.0.0.0/0` to allow access from anywhere
3. Or add specific IPs for better security

### 4. Get Connection String
1. Go to "Clusters" → "Connect" → "Connect your application"
2. Copy the connection string
3. Replace `<password>` with your database user password
4. Replace `<dbname>` with `crypto-tracker`

Example: `mongodb+srv://username:password@cluster0.xyz.mongodb.net/crypto-tracker`

## 🖥️ Backend Deployment (Render)

### 1. Prepare Repository
1. Push your code to GitHub
2. Ensure your `server` directory is in the root

### 2. Deploy to Render
1. Go to [Render](https://render.com)
2. Create account and connect GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Set build and start commands:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
6. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (or leave empty for auto-assign)

### 3. Configure Environment Variables
Add these in Render dashboard:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xyz.mongodb.net/crypto-tracker
NODE_ENV=production
```

### 4. Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Get your backend URL: `https://your-app-name.onrender.com`

## 🌐 Frontend Deployment (Vercel)

### 1. Update API URL
1. In `client/src/services/api.js`, update the production URL:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.onrender.com/api'  // Update this
  : '/api';
```

### 2. Deploy to Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to client directory: `cd client`
3. Run: `vercel`
4. Follow prompts:
   - Link to existing project? **N**
   - Project name: `crypto-tracker-frontend`
   - Directory: `./` (current directory)
   - Override settings? **N**

### 3. Alternative: GitHub Integration
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `client`
4. Deploy automatically

## 🔗 Alternative Deployment Options

### Backend Alternatives
- **Railway**: Similar to Render, good performance
- **Heroku**: Free tier discontinued, but reliable
- **Cyclic**: Simple Node.js deployment
- **DigitalOcean App Platform**: Paid but powerful

### Frontend Alternatives
- **Netlify**: Great for static sites
- **GitHub Pages**: Free static hosting
- **Firebase Hosting**: Google's hosting platform

## 🛠️ Post-Deployment Setup

### 1. Update CORS Settings
In your backend `server.js`, update CORS origin:
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
```

### 2. Test Deployment
1. Visit your frontend URL
2. Check if data loads correctly
3. Test refresh functionality
4. Verify cron job is running (check logs)

### 3. Monitor Performance
1. Check Render logs for backend
2. Monitor MongoDB Atlas performance
3. Use Vercel analytics for frontend

## 🐛 Common Issues & Solutions

### Backend Issues
**Issue**: MongoDB connection failed
**Solution**: Check connection string format and network access

**Issue**: CORS errors
**Solution**: Update CORS origin to match your frontend domain

**Issue**: 503 Service Unavailable
**Solution**: Check if backend is sleeping (free tier limitation)

### Frontend Issues
**Issue**: API calls failing
**Solution**: Check API base URL in `api.js`

**Issue**: Build fails
**Solution**: Check for missing dependencies in package.json

## 📊 Performance Optimization

### Backend
- Use MongoDB indexes for better query performance
- Implement caching for frequently accessed data
- Use compression middleware

### Frontend
- Implement lazy loading for components
- Use React.memo for expensive components
- Optimize images and assets

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push
1. **Render**: Automatically deploys on push to main branch
2. **Vercel**: Automatically deploys on push to main branch
3. Set up branch protection rules for production

### Environment Management
- Use different branches for staging/production
- Set up environment-specific variables
- Test thoroughly before production deployment

## 📈 Monitoring & Maintenance

### Logs
- Monitor Render logs for backend errors
- Check MongoDB Atlas metrics
- Use Vercel analytics for frontend performance

### Updates
- Keep dependencies updated
- Monitor API rate limits
- Regular database backups

## 🔒 Security Considerations

### Production Security
- Use strong MongoDB passwords
- Enable MongoDB IP whitelist
- Implement rate limiting
- Use HTTPS everywhere
- Regular security updates

### API Security
- Implement API key authentication if needed
- Monitor for unusual traffic patterns
- Set up proper error handling

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check service status pages
5. Consult platform documentation

---

**Happy Deploying! 🚀** 