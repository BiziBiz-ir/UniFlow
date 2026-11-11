# UniFlow

An academic workspace for university students: track tasks, classes, study time and schedules in one dashboard.

> **Status:** early prototype. The dashboard UI is built and renders from mock data; interactivity, routing and persistence are next.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8** (dev server & build)
- **Tailwind CSS 4**
- **lucide-react** icons
- **Oxlint** for linting

## Project structure

```
UniFlow/
├── apps/
│   └── web/                 # React front-end
│       ├── public/          # static assets (favicon)
│       └── src/
│           ├── components/
│           │   ├── dashboard/   # StatCard, TodaySchedule, UpcomingTasks
│           │   └── layout/      # Sidebar, Header
│           ├── data/            # mock data + stat helpers
│           ├── services/        # task service (in-memory CRUD)
│           ├── types/           # shared TypeScript types
│           ├── App.tsx
│           └── main.tsx
├── automation/
│   └── workflows/           # reserved for n8n automation workflows
└── docs/                    # project documentation
```

## Getting started

```bash
cd apps/web
npm install
npm run dev
```

The app runs at the URL printed by Vite (usually http://localhost:5173).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Roadmap

- [x] Project setup and dashboard shell
- [x] Dashboard rendered from typed mock data
- [ ] Interactive task management (add / edit / complete / delete)
- [ ] Pages and routing (Dashboard, Tasks, Calendar, Subjects, Schedule)
- [ ] Persistence (localStorage, then optional backend)
- [ ] Calendar view
- [ ] Tests, accessibility and deployment
- [ ] Optional: n8n automation workflows
