# Time Tracking Dashboard

Solution for the [Frontend Mentor](https://www.frontendmentor.io) time-tracking dashboard challenge.

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Key Features](#key-features)
4. [What I Learned](#what-i-learned)
5. [Next Steps](#next-steps)
6. [Running Locally](#running-locally)
7. [Author](#author)

## Overview

- **Goal**: Recreate the multi-card productivity dashboard that switches between Daily, Weekly, and Monthly stats.
- **Status**: Completed — desktop and mobile breakpoints implemented, timeframe toggle wired to local JSON data.
- **Demo**: _Add your live URL here when deployed._

### Screenshots

| Desktop | Mobile |
| --- | --- |
| ![Desktop preview of the dashboard](./design/desktop-design.jpg) | ![Mobile preview of the dashboard](./design/mobile-design.jpg) |

## Tech Stack

- Semantic HTML5 for structure (`<main>`, `<section>`, `<article>`).
- CSS custom properties, Flexbox, and CSS Grid for layout and theming.
- Vanilla JavaScript for fetching `data.json`, caching it, and updating the DOM.
- Mobile-first workflow with breakpoints at 768px and 1024px.

## Key Features

- **Profile Card + Time Filters**: buttons styled with CSS classes to reflect the active timeframe.
- **Responsive Grid**: auto-fit cards that collapse to a single column on mobile; profile card spans two rows on large screens.
- **Card Styling**: overlapping accent strips, clipped icons, and hover states to match the reference design.
- **Data Binding**: timeframe buttons update the numbers instantly using cached JSON data (no repeated fetch calls).

## What I Learned

- `display: contents` keeps semantic grouping while letting CSS Grid place each card without extra wrappers.
- Managing UI state with a CSS class (`.time-option--active`) is cleaner than mutating inline styles.
- Guarding JSON lookups (`timeframes[period] || { current: 0, previous: 0 }`) prevents runtime errors when data is missing.
- Fetching once and caching the response keeps the UI responsive and avoids race conditions.

## Next Steps

1. Replace the "Previous - Xhrs" copy with contextual labels ("Yesterday", "Last Week", "Last Month").
2. Add keyboard focus outlines that mirror the hover state for better accessibility.
3. Experiment with a light/dark toggle that respects `prefers-color-scheme`.

## Running Locally

```bash
git clone <repo-url>
cd time-tracking-dashboard-main
npm install    # optional placeholder if tooling is added later
npm run dev    # or use any static server, e.g. `npx serve`
```

Then open `http://localhost:3000` (or the port your dev server uses). VS Code's Live Server extension also works for this static site.

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- GitHub - [@yourusername](https://github.com/yourusername)

Feel free to reach out with suggestions or improvements!
