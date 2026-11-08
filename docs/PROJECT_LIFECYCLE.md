# MindVault – Complete Project Lifecycle

This document expands on the project lifecycle for MindVault.

## 1. Project Charter

**Project Name:** MindVault  
**Owner:** sujithpannala  
**Type:** Personal Web Application  
**Start Date:** November 2026  
**Primary Goal:** Build a private, fast, and evolving personal knowledge & productivity system.

### Objectives
1. Deliver a usable MVP within 4 weeks of focused development.
2. Make daily note capture and retrieval effortless.
3. Design the architecture so the app can grow for 5+ years.
4. Keep the experience calm, minimal, and focused.

### Success Criteria
- App is usable offline (local-first).
- Core CRUD + search + tags work reliably.
- Design is responsive and accessible at a basic level.
- Codebase is clean and documented enough to continue building later.

---

## 2. Stakeholder & Persona

**Primary Persona: "Focused Builder"**
- Wants to capture ideas quickly while working or learning.
- Dislikes cluttered tools.
- Prefers privacy and ownership of data.
- Willing to start simple and grow the tool over time.

---

## 3. Requirements

### Functional Requirements (MVP)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR1 | User can create a new note with title and body | Must |
| FR2 | User can edit an existing note | Must |
| FR3 | User can delete a note | Must |
| FR4 | Notes support Markdown | Must |
| FR5 | User can add multiple tags to a note | Must |
| FR6 | User can organize notes into collections | Must |
| FR7 | User can search notes by title, content, and tags | Must |
| FR8 | User can switch between dark and light theme | Must |
| FR9 | Data persists after browser refresh | Must |

### Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR1 | App should feel fast (< 100ms for common interactions where possible) |
| NFR2 | Works on modern mobile and desktop browsers |
| NFR3 | Accessible enough for keyboard navigation and reasonable contrast |
| NFR4 | Code is typed with TypeScript |
| NFR5 | Easy to extend later (AI, sync, tasks) |

---

## 4. System Architecture

### High-Level Architecture

- **Presentation Layer:** Next.js App Router + React components + Tailwind
- **State Layer:** Zustand stores for UI state and note operations
- **Data Layer:** Dexie.js on top of IndexedDB
- **Future Layers:** API routes, authentication, cloud database, AI services

### Data Model (MVP)

```typescript
interface Note {
  id: string;
  title: string;
  content: string;        // Markdown
  tags: string[];
  collectionId?: string;
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
}

interface Collection {
  id: string;
  name: string;
  color?: string;
  createdAt: number;
}
```

---

## 5. Design System Direction

### Color Palette (Suggested)
- Background: Zinc / Slate neutrals
- Accent: Indigo-500 / Violet-500
- Text: High contrast neutrals
- Success / Warning / Danger: Standard semantic colors

### Typography
- Sans-serif for UI (Inter or system font stack)
- Monospace optional for code blocks inside notes

### Spacing & Layout
- 4px / 8px spacing scale
- Consistent card and list item heights
- Clear visual hierarchy between navigation, list, and editor

---

## 6. Development Plan

### Phase 1 – Foundation
- Initialize Next.js + TypeScript + Tailwind
- Set up folder structure
- Create basic shell layout
- Implement Note model + Dexie database
- Build Create / Read / Update / Delete for notes
- Integrate Markdown editor

### Phase 2 – Organization & Search
- Tags management
- Collections management
- Search implementation
- Filtering by collection and tag

### Phase 3 – Experience Polish
- Dark / Light mode with system preference
- Responsive layouts
- Empty states, loading states, error handling
- Keyboard shortcuts (e.g. Ctrl/Cmd + K for search, N for new note)
- Export functionality

### Phase 4 – Quality & Launch
- Testing (unit + manual)
- Performance check
- Accessibility pass
- Deploy to Vercel
- Write user-facing documentation

---

## 7. Quality Assurance

### Test Strategy

1. **Unit Tests** – Data layer and pure functions (search, sorting, filtering)
2. **Component Tests** – Critical UI pieces
3. **Manual Exploratory Testing** – Real usage scenarios
4. **Cross-browser / Device checks** – Chrome, Firefox, Safari, mobile

### Sample Test Cases

| ID | Scenario | Expected Result |
|----|----------|-----------------|
| TC01 | Create a note and refresh page | Note still exists |
| TC02 | Search by partial title | Matching notes shown |
| TC03 | Add and remove tags | Tags update correctly |
| TC04 | Switch theme | Theme persists and applies |
| TC05 | Delete note | Note is removed and no longer searchable |
| TC06 | Mobile view | Layout remains usable |

---

## 8. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | High | Strict MVP feature list |
| Local storage limits | Medium | Plan export + future cloud sync |
| Over-designing UI | Medium | Start with simple components, iterate |
| Losing motivation | Medium | Ship small vertical slices weekly |

---

## 9. Definition of Done (MVP)

- [ ] All Must-have functional requirements completed
- [ ] Data persists correctly
- [ ] Search works
- [ ] Dark mode works
- [ ] Responsive on mobile
- [ ] Deployed to Vercel
- [ ] Basic README and docs present
- [ ] Manual QA checklist passed

---

## 10. Next Immediate Steps

1. Initialize the Next.js project in this repository
2. Create the basic app shell and navigation
3. Implement the Note data layer
4. Build the first working Create Note → List Notes flow
