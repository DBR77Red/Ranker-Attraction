# Ranker Attraction

> **This is a learning project only.** It was built to practice full-stack development and is not intended for production use.

A head-to-head attraction ranking app where users vote between two tourist attractions and the results drive a global ELO leaderboard. Designed to be fully mobile friendly and responsive across all screen sizes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| Routing | Wouter |
| Data Fetching | TanStack Query |
| Backend | Express.js (Node.js) |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Validation | Zod |
| Authentication | Passport.js (local strategy) |

---

## Running Outside Replit

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted, e.g. Supabase, Neon, Railway)

### 1. Clone the repository

```bash
git clone https://github.com/DBR77Red/Ranker-Attraction.git
cd Ranker-Attraction
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL=postgresql://user:password@host:5432/your_database
SESSION_SECRET=your_secret_key
```

### 4. Push the database schema

```bash
npm run db:push
```

### 5. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5000`.

### 6. Build for production

```bash
npm run build
npm run start
```

---

## Mobile

This project is designed to be fully mobile friendly. Layouts, font sizes, card heights, and navigation all adapt responsively across mobile, tablet, and desktop screen sizes.

---

## Project Structure

```
├── client/          # React frontend
│   └── src/
│       ├── pages/   # Vote, Leaderboard
│       ├── components/
│       └── hooks/
├── server/          # Express backend
├── shared/          # Shared types and DB schema
└── migrations/      # Drizzle migrations
```
