# Implementation Plan: GitHub Profile Page

## Overview

Rebuild gilleswb.github.io from the current table-based HTML layout into a modern, responsive, single-page professional profile site using semantic HTML5, CSS3 custom properties with Grid/Flexbox layout, and minimal vanilla JavaScript for navigation behavior. The implementation follows a mobile-first approach with a 768px breakpoint.

## Tasks

- [x] 1. Set up project structure and CSS foundation
  - [x] 1.1 Create directory structure and base files
    - Create `css/` and `js/` directories
    - Create `css/styles.css` with CSS custom properties (design tokens) for colors, typography, spacing, layout, and transitions
    - Create `js/main.js` as an empty file (to be populated later)
    - Create `blog/` and `blog/posts/` directories
    - Preserve existing assets: `images/gilles-bassole.jpg`, `images/favicon.png`, `data/Bassole_Resume.pdf`, `CNAME`
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x] 1.2 Implement CSS reset and base typography styles
    - Add a minimal CSS reset (box-sizing, margin/padding reset)
    - Set `font-family` to Lato with system font fallback stack
    - Set base font size to 16px, line-height 1.6
    - Define heading sizes (h1: 36px, h2: 28px, h3: 22px)
    - Add `font-display: swap` to `@font-face` declarations for Lato
    - Define link styles with color transitions (150ms–300ms)
    - _Requirements: 10.2, 10.3, 10.5, 11.6_

  - [x] 1.3 Implement responsive layout utilities and container styles
    - Define `.site-main` max-width container (900px) with auto margins
    - Add section spacing using the `--space-section` custom property (80px)
    - Implement mobile-first single-column base layout
    - Add media query at 768px for multi-column enhancements
    - Ensure no horizontal overflow from 320px to 2560px
    - _Requirements: 9.1, 9.2, 9.3, 10.4_

- [x] 2. Implement page skeleton and navigation
  - [x] 2.1 Create index.html with semantic document structure
    - Write the HTML5 document shell with proper `<head>` (charset, viewport, title, favicon, CSS link)
    - Add semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
    - Add ARIA landmarks (banner, navigation, main, contentinfo)
    - Include `<script>` tag for `js/main.js` with `defer` attribute
    - _Requirements: 11.1, 11.4, 11.7_

  - [x] 2.2 Implement the navigation bar component
    - Build `nav.site-nav` with sticky positioning (`position: sticky; top: 0`)
    - Add links to all sections: About, Experience, Blog, Interests, Links, Reading List
    - Implement hamburger toggle button with `aria-expanded`, `aria-controls`, and `aria-label` attributes
    - Style nav links with minimum 44x44px touch targets on mobile
    - Hide nav list on mobile by default; show on desktop (≥ 768px)
    - Add CSS transition for hover/focus states (150ms–300ms)
    - _Requirements: 2.1, 2.4, 9.4, 10.5, 11.3_

  - [x] 2.3 Implement navigation JavaScript behavior
    - Write hamburger toggle logic: toggle `aria-expanded` and a CSS class to show/hide the nav list
    - Implement smooth scroll using `scroll-behavior: smooth` on `<html>` with JS fallback for browsers that don't support it
    - Implement active link highlighting using Intersection Observer to detect which section is in view
    - Ensure scroll positions the section heading below the nav bar
    - Close mobile menu after a link is clicked
    - _Requirements: 2.2, 2.3, 2.4_

- [x] 3. Implement Hero Section
  - [x] 3.1 Build the hero section HTML and styles
    - Create `section#hero` with `aria-labelledby` pointing to the heading
    - Add `<h1>` with "Gilles W Bassole"
    - Add professional title paragraph: "SDE · Systems Developer · Solutions Architect"
    - Add 2–3 sentence professional summary (≤ 500 characters)
    - Add profile photo `<img>` with `src="images/gilles-bassole.jpg"`, `alt="Gilles W Bassole profile photo"`, `width="200"`, `height="200"`, `loading="eager"`
    - Implement CSS Grid layout: side-by-side on ≥ 768px (`grid-template-columns: 1fr auto`), stacked on mobile
    - Ensure hero is fully visible without scrolling on ≥ 768px viewports
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 9.3, 9.5_

  - [x] 3.2 Add resume button and social links
    - Add resume link styled as a button with `href="data/Bassole_Resume.pdf"`, `target="_blank"`, `rel="noopener noreferrer"`
    - Ensure resume button has minimum 44x44px touch target, ≥ 3:1 contrast ratio, and contains the word "Resume"
    - Add `title` attribute for additional context
    - Add social links list (LinkedIn, GitHub, Twitter, Email) with `target="_blank"` and `rel="noopener noreferrer"` for external links
    - Email link uses `mailto:` protocol
    - Style social links with visible focus indicators and hover transitions
    - _Requirements: 1.5, 3.1, 3.2, 3.3, 3.4, 3.5, 11.3_

- [ ] 4. Checkpoint - Verify core structure
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement Experience Section
  - [x] 5.1 Build the experience section with role entries
    - Create `section#experience` with `aria-labelledby` and `<h2>` heading
    - Add current role (Alexa Developer Advocate, Amazon) as an `<article>` with "Current" badge/label
    - Add at least 2 previous roles, each as an `<article>` with company, title, date range ("Month Year – Month Year"), and location
    - Add 2–5 bullet points of achievements per role as `<ul>` lists
    - Add comma-separated skills list (≥ 2 skills per role)
    - Order roles in reverse chronological order
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 5.2 Style the experience timeline layout
    - Add left border accent for timeline visual
    - Visually distinguish current role (distinct background or badge styling)
    - Ensure responsive single-column layout on mobile, multi-column meta on desktop
    - Apply consistent spacing between role entries
    - _Requirements: 4.6, 9.2, 9.3, 10.3_

- [x] 6. Implement Blog Section
  - [x] 6.1 Build the blog section with post entries
    - Create `section#blog` with `aria-labelledby` and `<h2>` heading
    - Add blog post entries (max 10) as `<article>` elements with title link, `<time>` element (datetime attribute + "Month DD, YYYY" display), and summary (≤ 150 chars)
    - Order posts in reverse chronological order (newest first)
    - Include placeholder message "Blog posts coming soon." for when no posts exist (commented out or conditionally shown)
    - Link each post title to its dedicated page in `blog/posts/`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 6.2 Create a blog post template page
    - Create `blog/posts/` directory with a sample blog post HTML file (e.g., `2024-01-15-sample-post.html`)
    - Include shared `<head>` setup (favicon, stylesheet link with relative path `../../css/styles.css`)
    - Add back-link navigation to main page (`../../index.html#blog`)
    - Structure with `<header>`, `<main>`, `<article>`, and `<footer>`
    - Style post content with readable typography and proper spacing
    - _Requirements: 5.2, 11.1, 11.4_

- [x] 7. Implement Interests, Links, and Reading List Sections
  - [x] 7.1 Build the interests section
    - Create `section#interests` with `aria-labelledby` and `<h2>` heading
    - Add at least 2 category groups, each with a `<h3>` category title
    - Add 3–12 interest items total, each with a name and description (10–150 characters)
    - Include placeholder message for empty state
    - Style with CSS Grid `auto-fill` columns for responsive wrapping
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 7.2 Build the useful links section
    - Create `section#links` with `aria-labelledby` and `<h2>` heading
    - Add at least 2 category groups with `<h3>` headings
    - Add at least 3 external links total, each with title, URL (`target="_blank"`, `rel="noopener noreferrer"`), and description (≤ 150 chars)
    - Include placeholder message for empty state
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 7.3 Build the reading list section
    - Create `section#reading-list` with `aria-labelledby` and `<h2>` heading
    - Add at least 3 entries with name (≤ 100 chars), clickable URL (`target="_blank"`, `rel="noopener noreferrer"`), and description (1–2 sentences, ≤ 200 chars)
    - Organize entries alphabetically by name or grouped by topic
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 8. Implement Footer and Final Styling
  - [x] 8.1 Build the footer component
    - Create `<footer class="site-footer" role="contentinfo">` with copyright text
    - Style with consistent spacing and muted text color
    - _Requirements: 11.1, 11.7_

  - [x] 8.2 Apply final visual polish and accessibility refinements
    - Verify all text-to-background color pairings meet WCAG AA (4.5:1 normal text, 3:1 large text/UI)
    - Add visible focus indicators (`:focus-visible`) to all interactive elements
    - Ensure all images have descriptive alt text (≥ 5 characters)
    - Set neutral background color on image containers for broken image fallback
    - Verify keyboard navigation: all links/buttons reachable via Tab, activatable via Enter/Space
    - _Requirements: 10.1, 10.5, 11.2, 11.3, 11.5_

- [ ] 9. Checkpoint - Full page review
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Cleanup and validation
  - [x] 10.1 Remove old files and validate HTML
    - Remove the old `stylesheet.css` file (replaced by `css/styles.css`)
    - Validate `index.html` structure: confirm no `<table>` elements used for layout
    - Confirm all semantic elements are used correctly (header, nav, main, section, article, footer)
    - Verify total page weight < 3 MB (HTML + CSS + images + fonts)
    - _Requirements: 10.4, 11.1, 11.6_

  - [ ]* 10.2 Write automated accessibility and link validation tests
    - Create a simple test script (or document test commands) to run axe-core or Lighthouse CI for accessibility audit
    - Validate all external links have `target="_blank"` with `rel="noopener noreferrer"`
    - Validate all anchor navigation links point to existing section IDs
    - Verify ARIA landmarks match semantic structure
    - _Requirements: 11.2, 11.3, 11.7_

- [ ] 11. Final checkpoint - Complete validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- The design explicitly states property-based testing does not apply to this static HTML/CSS project
- All content is visible without JavaScript enabled (progressive enhancement)
- Existing assets (images, resume PDF, CNAME, favicon) must be preserved throughout implementation
- The old `stylesheet.css` and table-based `index.html` will be replaced by the new structure

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1"] },
    { "id": 3, "tasks": ["2.2", "3.1"] },
    { "id": 4, "tasks": ["2.3", "3.2", "5.1"] },
    { "id": 5, "tasks": ["5.2", "6.1", "7.1"] },
    { "id": 6, "tasks": ["6.2", "7.2", "7.3"] },
    { "id": 7, "tasks": ["8.1", "8.2"] },
    { "id": 8, "tasks": ["10.1"] },
    { "id": 9, "tasks": ["10.2"] }
  ]
}
```
