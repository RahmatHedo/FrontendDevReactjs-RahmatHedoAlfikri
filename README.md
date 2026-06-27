# FrontendDevReactjs-RahmatHedo

Technical Test implementation of the Restaurant Directory application using **React.js + Tailwind CSS** and the **Dicoding Restaurant API** (`https://restaurant-api.dicoding.dev`).

## Tech Stack & Versions

- **React.js**: `v19.2.7`
- **Node.js**: `v24.11.0` (or `v18+` / `v20+` / `v22+` compatible)
- **Bundler**: **Vite** `v8.1.0` (with `@tailwindcss/vite` plugin for Tailwind CSS v4)
- **Routing**: **React Router DOM** `v7.18.0`
- **Icon Library**: **Lucide React** `v1.21.0`
- **Styling**: **Tailwind CSS v4**

---

## Features Implemented

1. **Main Page**:
   - Displays a dynamic grid of restaurants fetched from the Dicoding API.
   - Initial load displays 8 restaurant cards (matching the mockup design).
   - **Open Now filter**: Client-side toggle that dynamically screens open/closed restaurants.
   - **Price filter**: Client-side dropdown selecting ranges from `$` (Inexpensive) to `$$$$` (Premium).
   - **Categories filter**: Server-side category search querying `/search?q=<category>` dynamically with simulated network loading indicators.
   - **Clear All**: Reverts all filters back to default.
   - **Load More**: Centered pagination button to load subsequent sets of restaurants.
   
2. **Detail Page**:
   - Displays full restaurant name, categories, price range, and open/closed badges.
   - Displays high-resolution banner image.
   - Visual star rating indicator.
   - Custom SVG/HTML Map layout matching mockup aesthetics with zoom/pan controls, scale indicator, and location coordinates.
   - Reviews section rendering individual reviews, ratings, content, and author avatars fetched directly from the API details endpoint.

---

## How to Start the Project

Make sure you have Node.js and npm installed on your system.

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

### 2. Start Local Development Server

Run the following command to start Vite's local dev server:

```bash
npm run dev
```

The application will be accessible at: `http://localhost:5173/`

### 3. Build for Production

To compile and optimize the project for deployment:

```bash
npm run build
```

The compiled output will be generated inside the `dist/` directory, ready to be uploaded to hosting platforms like Netlify.

---

## Authentication & Login

- **Credentials**: No login is required for this application. It is a public restaurant directory accessible directly from the landing page.

---

## Deployment (Netlify)

This project is built as a Single Page Application (SPA). When deploying to Netlify:
1. Set the **Build Command** to: `npm run build`
2. Set the **Publish Directory** to: `dist`
3. Add a `_redirects` file in the `public/` directory with the content `/* /index.html 200` to support React Router path redirects on reload. *(Note: This has already been pre-configured in the repository).*
