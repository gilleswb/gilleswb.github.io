# gilleswb.github.io — Jekyll Version

A Jekyll-based alternative for the personal portfolio. Jekyll is GitHub's native static site generator — it's built into GitHub Pages, so you get zero-config CI/CD out of the box.

## Why Jekyll?

| Feature | Plain HTML | Jekyll |
|---------|-----------|--------|
| Blog posts | Manual HTML files | Write in Markdown, auto-generated |
| Build step | None | Built into GitHub Pages (no config needed) |
| CI/CD | Manual workflow file | Automatic (GitHub Pages native) |
| Themes | DIY CSS | GitHub Pages supported themes + gems |
| Liquid templates | N/A | Reusable layouts and includes |
| Collections | N/A | Group related content (projects, talks) |

**Key advantage over Hugo:** Jekyll runs natively on GitHub Pages — no GitHub Actions workflow needed. Just push and it builds automatically.

## 🚀 Quick Start

### Install Jekyll

```bash
# macOS (requires Ruby)
gem install bundler jekyll

# Verify
jekyll -v
```

### Create the Site

```bash
jekyll new gilleswb.github.io
cd gilleswb.github.io
```

### Configure (`_config.yml`)

```yaml
title: Gilles W Bassole
description: >-
  SDE · Systems Developer · Solutions Architect.
  Cloud engineer with experience building scalable services at Amazon.
baseurl: ""
url: "https://gilleswb.github.io"
github_username: gilleswb
linkedin_username: gilleswb

# Theme
theme: minima
minima:
  skin: dark

# Build settings
markdown: kramdown
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# Collections for custom content types
collections:
  experience:
    output: false
  projects:
    output: true

# Navigation
header_pages:
  - experience.md
  - blog.md
  - interests.md
  - links.md
  - reading-list.md

# Defaults
defaults:
  - scope:
      path: "_posts"
      type: "posts"
    values:
      layout: "post"
  - scope:
      path: ""
      type: "experience"
    values:
      layout: "default"
```

### Project Structure

```
gilleswb.github.io/
├── _config.yml              # Site configuration
├── _posts/                  # Blog posts (Markdown)
│   └── 2024-01-15-my-first-post.md
├── _experience/             # Experience entries (collection)
│   ├── amazon.md
│   └── 3clogic.md
├── _includes/               # Reusable HTML partials
│   ├── experience-entry.html
│   └── social-links.html
├── _layouts/                # Page templates
│   ├── default.html
│   ├── home.html
│   └── post.html
├── assets/
│   ├── css/
│   │   └── style.scss       # Custom styles
│   ├── images/
│   │   └── favicon.jpg
│   └── resume/
│       └── Bassole_Resume.pdf
├── experience.md            # Experience page
├── interests.md             # Interests page
├── links.md                 # Links page
├── reading-list.md          # Reading list page
├── index.md                 # Home page
├── Gemfile                  # Ruby dependencies
└── CNAME                    # Custom domain
```

### Add a Blog Post

Create `_posts/2024-01-15-building-alexa-skills.md`:

```markdown
---
layout: post
title: "Building Alexa Smart Home Skills"
date: 2024-01-15
categories: [aws, alexa]
tags: [lambda, python, smart-home]
---

Your blog content in **Markdown**. Jekyll handles the rest.

## Code Examples

```python
def lambda_handler(event, context):
    directive = event['directive']
    # Handle Alexa Smart Home directives
    return response
```

## Key Takeaways

- Use AWS Lambda for serverless skill backends
- Implement proper OAuth with Login with Amazon
- Test with the Alexa Developer Console
```

### Add Experience Entry

Create `_experience/amazon.md`:

```markdown
---
company: Amazon
org: Devices & Services Org
title: Alexa Developer Advocate (L5)
location: London, UK
start_date: 2022-09-01
end_date: present
current: true
skills: [Java, Python, AWS Lambda, OAuth/LWA, RESTful APIs, Alexa Skills Kit]
---

- Leading technical consultation for complex systems development queries
- Engineered solutions for Smarthome skills with LWA and Lambda backends
- Provided expertise on Alexa Smart Properties API workflows
- Mentoring junior team members on best practices
```

### Preview Locally

```bash
bundle exec jekyll serve --livereload
# → http://localhost:4000
```

## 🌐 Deploy to GitHub Pages

### Option A: Native GitHub Pages (Zero Config)

1. Push to a repo named `gilleswb.github.io`
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` / `/ (root)`
4. Done. GitHub builds Jekyll automatically on every push.

No workflow file needed. No build configuration. Just push Markdown files.

### Option B: GitHub Actions (More Control)

If you want custom plugins or a newer Jekyll version:

```yaml
name: Deploy Jekyll site

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
      - run: bundle exec jekyll build
      - uses: actions/upload-pages-artifact@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
```

### Gemfile

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end
```

## ✍️ Adding Content

```bash
# New blog post
touch _posts/$(date +%Y-%m-%d)-post-title.md
# Edit in your editor, commit, push — done

# New experience entry
touch _experience/new-company.md
# Fill in the front matter, push
```

## 🔗 Custom Domain

1. Create a `CNAME` file in the root with your domain
2. Add DNS records (same as plain HTML setup)
3. GitHub Pages handles HTTPS automatically

## Pros & Cons vs Plain HTML

**Pros:**
- Native GitHub Pages support (zero-config deploy)
- Markdown blogging with front matter
- Liquid templates for reusable components
- Collections for structured content (experience, projects)
- Automatic RSS, sitemap, SEO tags
- Live reload during development

**Cons:**
- Requires Ruby installed locally
- Slower builds than Hugo (~5-10s vs <1s)
- Limited theme selection on native GitHub Pages
- Liquid templating has a learning curve
- Dependency management (Gemfile, bundler)

## Comparison: Hugo vs Jekyll

| | Hugo | Jekyll |
|---|------|--------|
| Speed | < 1s builds | 5-10s builds |
| Language | Go (single binary) | Ruby (gem ecosystem) |
| GitHub Pages | Needs Actions workflow | Native support (zero config) |
| Templates | Go templates | Liquid |
| Community | Growing fast | Mature, large |
| Install | `brew install hugo` | `gem install jekyll` (needs Ruby) |
