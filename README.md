# Health Coach Dashboard

A patient management dashboard built for health coaches. Full-stack Next.js application with real-time data management, optimistic updates, and a clean accessible UI.

## Features

- **Patient management**: Create, edit, and delete patients with full CRUD operations
- **Coaching notes**: Add, update, and remove notes per patient with mood indicators
- **Optimistic updates**: UI updates instantly before the server confirms, with automatic rollback on error
- **Skeleton loaders**: Smooth loading states for both list and detail views
- **Suspense boundaries**: Granular loading with React Suspense
- **Collapsible sidebar**: Persistent navigation that adapts to screen size

## Tech Stack

- **Next.js 15**: App Router, Server Components, Suspense
- **TypeScript** 
- **React Query**: Server state management with optimistic updates
- **Tailwind CSS**
- **Lucide React** 

## Architecture

```
src/
├── app/
│   ├── patients/
│   └── patients/[id]/
├── components/
│   ├── PatientsList
│   ├── PatientModal
│   ├── PatientDetail
│   ├── NoteModal
│   ├── ConfirmDialog
│   ├── PatientsListSkeleton
│   └── Sidebar
└── lib/
    ├── api.ts
    ├── hooks.ts
    └── types.ts
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/patients](http://localhost:3000/patients)

## Live Demo

[health-dashboard-one-beta.vercel.app/patients](https://health-dashboard-one-beta.vercel.app/patients)
