# MindVault – Technical Architecture

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Local Database:** Dexie.js (IndexedDB)
- **State Management:** Zustand
- **Markdown Editor:** To be chosen (Tiptap or @uiw/react-md-editor)
- **Icons:** Lucide React
- **Deployment:** Vercel

## Folder Structure (Planned)

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx            # Home / Notes list
│   ├── notes/[id]/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── layout/
│   ├── notes/
│   ├── search/
│   └── ui/                 # shadcn components
├── lib/
│   ├── db.ts               # Dexie setup
│   ├── store.ts            # Zustand stores
│   └── utils.ts
├── types/
│   └── index.ts
└── styles/
```

## Data Flow (MVP)

1. User interacts with UI components
2. Actions call Zustand store methods
3. Store methods read/write via Dexie
4. UI re-renders from store state

## Future Evolution Path

- Add Next.js API routes when cloud features are needed
- Introduce authentication
- Sync engine between local IndexedDB and a cloud database
- Optional AI service layer for summarization and semantic search
