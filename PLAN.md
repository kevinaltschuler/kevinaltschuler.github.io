# Tab Bar Navigation Implementation Plan

## Overview
Add a reusable tab bar navigation to the site using JavaScript-based HTML template loading. The site will have three pages: Home, Projects, and CV.

## Implementation Approach

### 1. File Structure
```
/
├── header.html          # Reusable header template with tab bar
├── header-loader.js     # JavaScript to load and inject header
├── index.html           # Home page
├── projects.html        # Projects page
├── cv.html             # CV page (current PDF display)
├── styles.css          # Updated with tab bar styles
├── pdf.js              # Existing PDF loader
└── img/                # Existing images
```

### 2. Header Template (header.html)
- Create a standalone HTML snippet containing the navigation tab bar
- Tab bar structure: `<nav>` with links to Home, Projects, CV
- Use data attributes or classes to mark the active tab
- Clean, minimal design that works on mobile and desktop

### 3. Header Loader Script (header-loader.js)
- Fetch header.html using `fetch()` API
- Inject the header at the top of each page's `<body>`
- Set the active tab based on current page URL
- Handle loading errors gracefully

### 4. Page Structure

**index.html (Home)**
- Will be the landing page
- Currently shows PDF - decide if this should move to CV page
- Include script tag for header-loader.js
- Add main content area for home page content

**projects.html**
- New page for showcasing projects
- Include header-loader.js script
- Content area for project listings/descriptions

**cv.html**
- Move the PDF display functionality here
- Include header-loader.js script
- Display resume PDF using existing pdf.js code

### 5. Styling Updates (styles.css)
Add styles for:
- Navigation bar container (fixed or static position)
- Tab links (inactive state)
- Active tab highlighting
- Hover states
- Mobile responsive behavior
- Proper spacing between nav and content

### 6. Active Tab Detection
The header-loader.js script will:
1. Determine current page from `window.location.pathname`
2. Add an 'active' class to the corresponding tab
3. Apply active styling (highlight, underline, etc.)

## Design Decisions

**Navigation Style Options:**
- Horizontal tab bar at top
- Clean, minimal design to match current aesthetic
- Subtle active state (underline or background color)
- Mobile-friendly (stack or scroll on small screens)

**Content Migration:**
- Move current PDF display from index.html to cv.html
- Make index.html a proper home/landing page
- Keep existing styles and functionality intact

## Implementation Order
1. Create header.html template with tab bar HTML
2. Create header-loader.js script to load and inject template
3. Update index.html to load header and prepare for home content
4. Create cv.html and move PDF functionality from index.html
5. Create projects.html with placeholder content
6. Add tab bar styles to styles.css
7. Test navigation across all pages
8. Ensure active tab highlighting works correctly
