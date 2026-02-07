# Free Deployment Guide for Your React Vite App

This guide covers multiple free hosting options for your FOSS presentation app. All options support automatic deployments when you push to GitHub.

---

## Option 1: Vercel (Recommended) ⭐

**Best for**: Easiest setup, excellent performance, automatic HTTPS

### Prerequisites

- GitHub account
- Your project pushed to GitHub

### Steps

1. **Push to GitHub** (if not already done)

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up with GitHub
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel auto-detects Vite settings
   - Click **"Deploy"**
3. **Done!** Your app will be live at `https://your-project.vercel.app`

---

## Option 2: Netlify

**Best for**: Drag-and-drop simplicity, great CI/CD

### Method A: Quick Deploy (No Git)

1. **Build your project locally**

   ```bash
   npm run build
   ```

2. **Deploy via Netlify Drop**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop your `dist` folder
   - Your site is live instantly!

### Method B: Git Integration

1. **Push to GitHub**
2. **Connect to Netlify**
   - Sign up and click **"Add new site"** → **"Import an existing project"**
   - Choose GitHub, select repo, and click **"Deploy site"**

---

## Option 3: GitHub Pages

**Best for**: Free subdomain, integrated with GitHub

### Steps

1. **Install gh-pages**

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add homepage and scripts:

   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   Add `base: '/your-repo-name/'`
4. **Deploy**

   ```bash
   npm run deploy
   ```

---

## Comparison Table

| Platform | Setup Time | Auto Deploy | Custom Domain | Build Minutes |
|----------|-----------|-------------|---------------|---------------|
| **Vercel** | ⚡ Fastest | ✅ Yes | ✅ Free | Unlimited |
| **Netlify** | ⚡ Fast | ✅ Yes | ✅ Free | 300/month |
| **GitHub Pages** | 🔧 Manual | ⚠️ Via workflow | ✅ Free | N/A |
| **Cloudflare** | ⚡ Fast | ✅ Yes | ✅ Free | 500/month |

---

## Quick Start: Vercel CLI

```bash
npm i -g vercel
vercel
```

## Before Deploying Checklist

- [ ] Test production build: `npm run build && npm run preview`
- [ ] Remove console logs
- [ ] Check asset loading
- [ ] Update SEO tags in `index.html`

**Recommendation**: Use **Vercel** for the fastest and most reliable deployment for student presentations.
