# Quick Setup Guide

## First Time Setup

1. **Activate the conda environment:**
   ```bash
   conda activate fdm_dsp
   ```

2. **Navigate to the project:**
   ```bash
   cd /Users/jtshong/Folders/FDM_DSP/fdm-portal
   ```

3. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Navigate to http://localhost:3000

## Quick Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## File Locations

- **Reports Data**: `data/reports.json` - Edit this to add/update reports
- **Styling**: `app/globals.css` - Global styles and theme colors
- **Logo**: `components/Hero.tsx` - Replace logo placeholder here
- **Navigation**: `components/Navigation.tsx` - Update navigation links

## GitHub Pages Deployment

### First Time Setup
1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/FDM_DSP.git
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: GitHub Actions

### Update and Deploy
```bash
git add .
git commit -m "Your commit message"
git push
```
The site will automatically deploy!

## Troubleshooting

### Port 3000 already in use
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

### Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

## Support
Contact the FDM team for assistance.

