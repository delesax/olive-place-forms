# ⚡ Quick Start Guide (5 minutes)

Get Olive Place Forms running in just a few steps!

## For Local Development

### 1️⃣ Install Node.js
- Download from [nodejs.org](https://nodejs.org) (version 18+)
- Install and verify: `node --version`

### 2️⃣ Get the Code
```bash
# Clone from GitHub
git clone https://github.com/yourusername/olive-place-forms.git
cd olive-place-forms
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Run Locally
```bash
npm run dev
```

### 5️⃣ Open in Browser
```
http://localhost:3000
```

Done! 🎉

---

## For Deployment (to the Web)

### 1️⃣ Create GitHub Account
- Sign up at [github.com](https://github.com)

### 2️⃣ Push Code to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 3️⃣ Deploy to Vercel
- Go to [vercel.com](https://vercel.com)
- Sign in with GitHub
- Click "Import Project"
- Select your repository
- Click "Deploy"

**That's it!** Your site is live. 🌍

---

## First Steps After Setup

### ✅ Test the Forms
1. Open http://localhost:3000
2. Click on a form
3. Fill in some test data
4. Try downloading as JSON/CSV
5. Try uploading the JSON back

### ✅ Customize
See [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) to:
- Add your facility name
- Change colors
- Add new forms
- Adjust styling

### ✅ Deploy Live
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed steps

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from nodejs.org |
| `Port 3000 already in use` | Run `npm run dev -- -p 3001` |
| `Module not found` | Run `npm install` again |
| `Forms not showing` | Clear browser cache (Ctrl+Shift+Del) |

---

## File Structure (Quick Reference)

```
📁 olive-place-forms/
├── 📁 app/              ← Pages & routes
├── 📁 components/       ← Reusable UI components
├── 📁 config/           ← Form definitions (edit these!)
├── 📁 utils/            ← Helper functions
├── 📄 package.json      ← Dependencies
└── 📄 README.md         ← Full documentation
```

---

## Useful Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

---

## Next Steps

- 📖 Read [README.md](./README.md) for full features
- 🎨 Check [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) to customize
- 🚀 Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) to go live
- 📝 Edit [config/forms.js](./config/forms.js) to add/modify forms

---

## Need Help?

1. **Check the docs** - README.md has detailed info
2. **Check error messages** - They usually tell you what's wrong
3. **Check the console** - Press F12 to see errors
4. **Google the error** - Most issues have Stack Overflow answers

---

**You're all set! Start filling out forms! 🏥**
