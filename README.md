# Drigo Car Browser

Week 1 internship task — searchable & filterable car listing built with React + Vite.

## Features
- Search by car name (self-implemented debounce, 300ms)
- Filter by transmission, type, and availability (AND logic — filters narrow results)
- Sort by price (low to high / high to low)
- Live results counter
- Empty state with reset
- URL sync — filters, search, and sort persist across page reload

## Setup

```bash
npm install
npm run dev
```

## Stack
- React (Vite)
- Tailwind CSS
- React Router (for URL query params)
- react-icons