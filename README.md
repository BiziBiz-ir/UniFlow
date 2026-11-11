# UniFlow

An academic workspace for university students: track tasks, classes, study time and schedules in one dashboard.

> **Status:** working prototype. Multi-page app with interactive task management, `localStorage` persistence, keyboard-accessible dialogs and a responsive mobile drawer. Tests and deployment are next.

## Tech stack

- **React 19** + **TypeScript**
- **React Router 7** for client-side routing
- **Vite 8** (dev server & build)
- **Tailwind CSS 4**
- **lucide-react** icons
- **date-fns** for date formatting
- **Oxlint** for linting

## Project structure

```
UniFlow/
├── apps/
│   └── web/                 # React front-end
│       ├── public/          # static assets (favicon)
│       └── src/
│           ├── components/
│           │   ├── dashboard/   # StatCard, TodaySchedule
│           │   ├── layout/      # AppLayout, Header, Sidebar, PageHeader
│           │   └── tasks/       # TasksPanel, TaskItem, TaskForm
│           ├── config/          # navigation config
│           ├── data/            # mock data + stat helpers
│           ├── hooks/           # useTasks state hook
│           ├── pages/           # Dashboard, Tasks, Calendar, Subjects, Schedule
│           ├── services/        # task service (localStorage CRUD)
│           ├── types/           # shared TypeScript types
│           ├── utils/           # date helpers
│           ├── App.tsx          # route definitions
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

## Data

Tasks are stored in the browser under the `uniflow.tasks.v1` localStorage key. On first run the app seeds itself from the mock data in `src/data/mockData.ts`. Clearing that key resets the task list.

## Accessibility

- Skip link to the main content and a visible focus ring on interactive elements
- Task dialog and mobile navigation drawer trap focus, close on `Escape`, and restore focus to the trigger
- Background scrolling is locked while an overlay is open, and reduced-motion preferences are respected
- Icon-only buttons have accessible labels; filters expose `aria-pressed`; task counts announce changes via `aria-live`
- Secondary text colours were adjusted for WCAG AA contrast on the dark theme

## Roadmap

- [x] Project setup and dashboard shell
- [x] Dashboard rendered from typed mock data
- [x] Interactive task management (add / edit / complete / delete)
- [x] Pages and routing (Dashboard, Tasks, Calendar, Subjects, Schedule)
- [x] Persistence (localStorage)
- [x] Calendar view (month grid of task deadlines)
- [x] Accessibility pass (focus management, skip link, contrast, reduced motion)
- [x] Mobile layout and accessible navigation drawer
- [ ] Tests (Vitest + Testing Library)
- [ ] Deployment (SPA rewrite for client-side routes)
- [ ] Optional backend and authentication
- [ ] Optional: n8n automation workflows
