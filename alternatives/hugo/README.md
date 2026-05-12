# gilleswb.github.io — Hugo Version

A Hugo-based alternative for the personal portfolio. Hugo is a static site generator that makes blogging much easier — you write posts in Markdown and Hugo converts them to HTML automatically.

## Why Hugo?

| Feature | Plain HTML | Hugo |
|---------|-----------|------|
| Blog posts | Manual HTML files | Write in Markdown, auto-generated |
| New pages | Copy template, edit HTML | Create .md file, done |
| Build step | None | `hugo build` (< 1 second) |
| Themes | DIY CSS | 300+ community themes |
| RSS feed | Manual | Automatic |
| Sitemap | Manual | Automatic |
| Taxonomy (tags) | Manual | Built-in |

## 🚀 Quick Start

### Install Hugo

```bash
# macOS
brew install hugo

# Verify
hugo version
```

### Create the Site

```bash
hugo new site gilleswb.github.io
cd gilleswb.github.io

# Add PaperMod theme (great for portfolios)
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

### Configure (`hugo.toml`)

```toml
baseURL = "https://gilleswb.github.io/"
languageCode = "en-gb"
title = "Gilles W Bassole"
theme = "PaperMod"

[params]
  author = "Gilles W Bassole"
  description = "Software Developer & Cloud Engineer"
  ShowReadingTime = true
  ShowShareButtons = false
  ShowPostNavLinks = true

[params.homeInfoParams]
  Title = "Gilles W Bassole"
  Content = "SDE · Systems Developer · Solutions Architect. Cloud engineer with experience building scalable services at Amazon."

[[params.socialIcons]]
  name = "linkedin"
  url = "https://www.linkedin.com/in/gilleswb/"

[[params.socialIcons]]
  name = "github"
  url = "https://github.com/gilleswb"

[[params.socialIcons]]
  name = "email"
  url = "mailto:bassolegilles@gmail.com"

[menu]
  [[menu.main]]
    name = "Experience"
    url = "/experience/"
    weight = 10
  [[menu.main]]
    name = "Blog"
    url = "/posts/"
    weight = 20
  [[menu.main]]
    name = "Interests"
    url = "/interests/"
    weight = 30
  [[menu.main]]
    name = "Links"
    url = "/links/"
    weight = 40
  [[menu.main]]
    name = "Resume"
    url = "/resume/Bassole_Resume.pdf"
    weight = 50
```

### Add Content

```bash
# Blog post
hugo new posts/my-first-post.md

# Pages
hugo new experience/_index.md
hugo new interests/_index.md
hugo new links/_index.md
```

Example post (`content/posts/my-first-post.md`):
```markdown
---
title: "My First Post"
date: 2024-01-15
summary: "A brief intro to what I'll be writing about."
tags: ["aws", "cloud", "career"]
---

Your blog content here in **Markdown**. Much easier than writing HTML!
```

### Preview & Build

```bash
# Preview locally
hugo server -D
# → http://localhost:1313

# Build for production
hugo --minify
# → Output in ./public/
```

## 🌐 Deploy with GitHub Actions

Create `.github/workflows/hugo.yml`:

```yaml
name: Deploy Hugo site

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.128.0
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0

      - name: Install Hugo
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb
          sudo dpkg -i ${{ runner.temp }}/hugo.deb

      - name: Build
        run: hugo --minify

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## ✍️ Adding Blog Posts

```bash
hugo new posts/2024-03-15-building-alexa-skills.md
# Edit the Markdown file
git add . && git commit -m "New post" && git push
# Done — CI/CD deploys automatically
```

## Pros & Cons vs Plain HTML

**Pros:** Markdown blogging, automatic RSS/sitemap/tags, theme ecosystem, built-in search, < 1s builds
**Cons:** Requires Hugo installed locally, theme dependency, less HTML control
