# Drigo Car Browser Pro

Week 2 internship task — async data, detail routes, richer filters, pagination, and persisted favorites.

## Features
- Async data layer with simulated loading/error states (fake API, ~20% failure rate)
- Search (debounced), transmission, multi-select type, price range (debounced), seats, and availability filters — all combine with AND logic
- Sort by price (low/high) and name (A-Z/Z-A)
- Pagination (6 per page)
- Detail page per car (`/cars/:id`), deep-linkable, with a clean "not found" for bad ids
- Back from detail restores the exact filtered/sorted/paged view
- Favorites, persisted in localStorage, synced between list and detail
- URL is the single source of truth for search, filters, sort, and page

## Setup

```bash
npm install
npm run dev
```

## Running tests

```bash
npm test
```

## Stack
- React (Vite)
- React Router
- Tailwind CSS
- react-icons
- Vitest + Testing Library