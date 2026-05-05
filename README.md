## TT Job Board

[![Netlify Status](https://api.netlify.com/api/v1/badges/1ab62549-b30d-4286-a9cb-ca883ecb28c4/deploy-status)](https://app.netlify.com/sites/ttjobboard/deploys)

[Live URL](https://ttjobboard.netlify.app/)

---

## About

TT Job Board is a modern, responsive job board application for Trinidad and Tobago. It allows users to browse, search, and filter job listings from various companies.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Animations**: Motion
- **Theme**: next-themes (Dark/Light mode)
- **API**: Next.js API Routes
- **Testing**: Vitest, Playwright
- **Linting**: Biome
- **Git Hooks**: Husky
- **Storybook**: For component development and documentation

## Features

- **Job Listings**: Browse job postings with company logos and details
- **Search & Filter**: Filter jobs by title, company, and location
- **Pagination**: Load more jobs as you scroll (infinite scroll)
- **Responsive Design**: Works on all screen sizes
- **Dark/Light Theme**: Toggle between light and dark modes
- **SEO Optimized**: Proper meta tags and Open Graph support

## Project Structure

```
TTJobBoard-Frontend/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx        # Root layout with theme provider
│   └── page.tsx          # Home page
├── src/
│   ├── components/       # React components
│   │   ├── AppState.tsx  # Main app state management
│   │   ├── Header.tsx    # Header with theme toggle
│   │   ├── JobCard.tsx   # Individual job card
│   │   ├── JobList.tsx   # Job listing component
│   │   ├── SearchBar.tsx # Search and filter bar
│   │   └── ui/           # UI primitives (Button, Card, etc.)
│   ├── lib/              # Utility functions
│   ├── stories/          # Storybook stories
│   ├── utils/            # Utils (hooks, types)
│   └── constants.ts      # App constants (SEO, etc.)
├── public/               # Static assets
└── .env.local            # Environment variables
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables (copy .env.example to .env.local)
cp .env.example .env.local
# Edit .env.local and add your API credentials
```

### Development

```bash
# Start development server
npm run dev
# Opens at http://localhost:4000
```

### Build

```bash
# Build for production
npm run build
```

### Start Production Server

```bash
npm run start
```

### Storybook

```bash
# Start Storybook
npm run storybook
```

### Lint

```bash
npm run lint
```

### Test

```bash
# Run tests
npm test
```

## API Integration

The app fetches job data from the backend API at `/api/jobs`. You can filter by:

- `title` - Job title
- `company` - Company name
- `location` - Job location
- `page` - Pagination page number
