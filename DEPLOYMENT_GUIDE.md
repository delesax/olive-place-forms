# 🚀 Deployment Guide - Olive Place Forms

Complete step-by-step guide to get your form system live on the web.

## Option 1: Deploy to Vercel (Easiest ⭐)

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it: `olive-place-forms`
4. Select **Public** (or Private if you prefer)
5. Click **Create repository**

### Step 2: Push Code to GitHub

In your local project folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Olive Place Forms system"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/olive-place-forms.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → Choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub account
4. Click **Import Project**
5. Select your `olive-place-forms` repository
6. Configure project settings:
   - **Project Name**: `olive-place-forms`
   - **Framework**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
7. Click **Deploy**

**Your site will be live in 2-3 minutes!** 🎉

You'll get a URL like: `https://olive-place-forms.vercel.app`

### Step 4: Connect Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Your site will be accessible at your domain!

---

## Option 2: Deploy to GitHub Pages (Static)

⚠️ GitHub Pages requires a static export (no server-side features).

```bash
# Update package.json build script
# Change "build": "next build" 
# To: "build": "next build && next export"

# Build the project
npm run build

# This creates an 'out' folder

# Push to GitHub
git add .
git commit -m "Build for GitHub Pages"
git push
```

Then in GitHub:
1. Go to repo Settings → Pages
2. Select **Deploy from a branch**
3. Select **main** branch and **/root** folder
4. Save

Your site will be at: `https://yourusername.github.io/olive-place-forms`

---

## Option 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **New site from Git**
3. Connect GitHub and select your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Click **Deploy site**

---

## 🔄 Updating Your Live Site

After making changes locally:

```bash
# Make your changes
# Edit files, add forms, etc.

# Commit and push
git add .
git commit -m "Description of changes"
git push origin main
```

**Vercel will automatically deploy your changes!** (Usually within 1-2 minutes)

---

## 📊 Monitor Your Deployment

### Vercel Dashboard
- View deployment status
- Check build logs
- Monitor performance
- View analytics

### Speed Test
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)
- [WebPageTest](https://www.webpagetest.org)

---

## 🔒 Security Best Practices

1. ✅ Keep `node_modules` out of version control (.gitignore)
2. ✅ Never commit `.env` files with secrets
3. ✅ Use `.env.local` for local development
4. ✅ All form data stays client-side
5. ✅ Enable HTTPS (default on Vercel)

---

## 🐛 Troubleshooting Deployments

### "Build failed" error
1. Check the build logs in Vercel/Netlify
2. Verify `package.json` scripts
3. Ensure all dependencies in package.json
4. Try: `npm install` locally, then push

### Site shows "404 Not Found"
1. Check deployment status in dashboard
2. Clear browser cache
3. Wait a few minutes for deployment to complete
4. Check the correct URL

### Forms not loading
1. Check browser console for JavaScript errors
2. Verify form config in `config/forms.js`
3. Clear cache and hard refresh (Ctrl+Shift+R)

### Slow performance
1. Check Vercel Analytics
2. Review image optimization
3. Monitor bundle size
4. Use Lighthouse DevTools

---

## 📱 Share Your Site

Once deployed, share the URL with:

```
🏥 Olive Place Forms - Digital Form Management
https://olive-place-forms.vercel.app

✨ Features:
- 26+ Facility Forms
- Download as JSON/CSV
- Upload Previous Data
- Instant Validation
```

---

## 🎯 Next Steps

1. **Test all forms** - Go through each form to ensure fields are correct
2. **Customize branding** - Update colors, logo, facility name in components
3. **Add new forms** - Edit `config/forms.js` to add more forms
4. **Get feedback** - Share with staff and collect improvement ideas
5. **Scale up** - Consider database integration for data storage

---

## 💡 Pro Tips

- Use Vercel Analytics to track form usage
- Set up GitHub branch protection for main branch
- Create separate staging environment (optional)
- Use GitHub Issues for feature requests
- Set up automated tests (optional)

---

**Need help?** Check the main [README.md](./README.md) for more information!
