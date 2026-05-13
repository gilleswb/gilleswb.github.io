# gilleswb.github.io — Personal Portfolio

A modern, responsive personal portfolio and professional landing page built with plain HTML, CSS, and JavaScript. No build tools, no frameworks, no dependencies.

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/gilleswb/gilleswb.github.io.git
cd gilleswb.github.io

# Preview locally (Python 3)
python3 -m http.server 8080
# Open http://localhost:8080
```

## 📁 Project Structure

```
├── index.html              # Main profile page
├── css/
│   └── styles.css          # All styles (design tokens, layout, components)
├── js/
│   └── main.js             # Navigation behavior (hamburger, scroll, active links)
├── images/
│   ├── 1000072407.jpg      # Favicon
│   └── gilles-bassole.jpg  # Profile photo (unused, kept for reference)
├── data/
│   └── GillesBassole_Resume_2025_AMZN.pdf  # Downloadable resume
├── blog/
│   ├── index.html          # Blog listing page
│   ├── post-template.html  # Template for new blog posts
│   └── posts/              # Individual blog post files go here
├── CNAME                   # Custom domain config (optional)
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
└── README.md               # This file
```

## 🌐 Deploy to GitHub Pages

### Step 1: Create the Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it exactly: `gilleswb.github.io`
3. Set to **Public**
4. Don't initialize with README (we already have one)

### Step 2: Push Your Code

```bash
cd /path/to/this/project
git init
git add .
git commit -m "Initial commit: personal portfolio"
git branch -M main
git remote add origin https://github.com/gilleswb/gilleswb.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to **Settings → Pages** in your repository
2. Under "Source", select **Deploy from a branch**
3. Choose **main** branch, **/ (root)** folder
4. Click **Save**
5. Your site will be live at `https://gilleswb.github.io` within 1-2 minutes

## 🔗 Custom Domain Setup

### Option A: Apex Domain (e.g., gillesbassole.com)

1. Buy a domain from a registrar (Namecheap, Google Domains, Cloudflare, etc.)
2. In your DNS settings, add these **A records** pointing to GitHub's IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. Add a **CNAME record**: `www` → `gilleswb.github.io`
4. In your repo, update the `CNAME` file:
   ```
   gillesbassole.com
   ```
5. In GitHub **Settings → Pages → Custom domain**, enter `gillesbassole.com`
6. Check **Enforce HTTPS** (wait a few minutes for the certificate)

### Option B: Subdomain (e.g., www.gillesbassole.com)

1. Add a **CNAME record**: `www` → `gilleswb.github.io`
2. Update the `CNAME` file to `www.gillesbassole.com`
3. Configure in GitHub Pages settings

## 🔄 CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml` for automated checks on every push:

```yaml
name: Deploy & Validate

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate HTML
        uses: anishathalye/proof-html@v2
        with:
          directory: .

      - name: Check links
        run: |
          npx linkinator . --recurse --skip "mailto:" --skip "linkedin.com" --skip "twitter.com"

  deploy:
    needs: validate
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

## ✍️ Adding Blog Posts

1. Duplicate `blog/post-template.html` → `blog/posts/YYYY-MM-DD-your-slug.html`
2. Edit the new file: update title, date, and write your content
3. Add an entry to the blog section in `index.html`:
   ```html
   <article class="blog__entry">
     <h3><a href="blog/posts/YYYY-MM-DD-your-slug.html">Your Post Title</a></h3>
     <time class="blog__date" datetime="YYYY-MM-DD">Month DD, YYYY</time>
     <p class="blog__summary">Brief summary under 150 characters.</p>
   </article>
   ```
4. Remove the placeholder message when you add your first post
5. Commit and push — the site updates automatically

## 🎨 Customization

### Colors
Edit CSS custom properties in `css/styles.css` under `:root`:
```css
--color-primary: #1772d0;      /* Links, buttons, accents */
--color-primary-hover: #f09228; /* Hover state */
--color-text: #1a1a2e;          /* Body text */
--color-bg: #ffffff;            /* Background */
```

### Content
- **Experience**: Edit the `<section id="experience">` in `index.html`
- **Interests**: Edit the `<section id="interests">` cards
- **Links**: Add/remove items in `<section id="links">`
- **Reading List**: Update entries in `<section id="reading-list">`
- **Resume**: Replace `data/Bassole_Resume.pdf` with your latest version

### Favicon
Replace `images/1000072407.jpg` with any image and update the `<link rel="icon">` tag in all HTML files.

## 📊 Performance

- Total page weight: ~156 KB
- No JavaScript required for core content
- Responsive from 320px to 2560px
- WCAG AA accessible (contrast, keyboard nav, ARIA landmarks)
- Loads in <2s on 3G connections

## 📄 License

Open source. Feel free to fork and adapt for your own portfolio.
