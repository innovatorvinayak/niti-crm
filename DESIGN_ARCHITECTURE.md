# NitiCRMs Client-Side Design & Architecture

## 1. Page Hierarchy (Next.js App Router)

```
/src/app
├── layout.tsx                  # Root Layout (Fonts, Metadata, Global Styles)
├── page.tsx                    # Landing Page (Public)
├── login/                      # Auth
│   └── page.tsx
├── signup/                     # Auth
│   └── page.tsx
├── (main)/                     # Protected App Routes (Sidebar + Header Shell)
│   ├── layout.tsx              # App Shell Layout
│   ├── dashboard/              # Home
│   │   └── page.tsx
│   ├── contacts/               # CRM Core
│   │   ├── page.tsx            # List View
│   │   └── [id]/               # Profile View
│   │       └── page.tsx
│   ├── pipeline/               # Deals
│   │   └── page.tsx            # Kanban Board
│   ├── tasks/                  # Task Manager
│   │   └── page.tsx            # Jira-style Board/List
│   ├── activities/             # History/Logs
│   │   └── page.tsx
│   ├── ai/                     # AI Assistant
│   │   └── page.tsx
│   ├── reports/                # Analytics
│   │   └── page.tsx
│   ├── team/                   # Org Management
│   │   └── page.tsx
│   └── settings/               # App Configuration
│       └── page.tsx
```

## 2. Component Tree Strategy

**Atomic Design Principle:**
- **Atoms**: Icons, Buttons, Badges, Avatars, Inputs.
- **Molecules**: SearchBar, NavItem, UserMenu, StatCard, TaskCard.
- **Organisms**: Sidebar, Header, KanbanColumn, ContactTable, ActivityFeed.
- **Templates**: DashboardGrid, PageShell, SettingsPartition.
- **Pages**: Actual route implementations.

## 3. Routing & URL Structure

- **Public**:
  - `https://niti.crm/` -> Landing
  - `https://niti.crm/login` -> Auth
  - `https://niti.crm/features` -> Marketing

- **Private (App)**:
  - `/dashboard` -> Overview
  - `/contacts?view=list&sort=desc` -> Contacts Manager
  - `/contacts/c_12345` -> Specific Contact
  - `/pipeline?view=kanban` -> Deals
  - `/ai` -> Copilot Interface

## 4. UI Structure & Design Language

**Theme: "Futuristic Noir"**
- **Backgrounds**: `#000000` (Pitch Black) with `.texture-matte` overlay.
- **Surfaces**: `#0a0a0a` (Cards) with 1px border `rgba(255,255,255,0.1)`.
- **Accents**: Cream (`#f5f5dc`) for primary actions, Beige (`#e5d5c0`) for secondary.
- **Typography**: Sans-serif (Inter/Geist), clean, tracking-tight.
- **Glassmorphism**: Used sparingly on sticky headers and floating modals.

**Grid System**:
- Sidebar: Fixed width (`260px`).
- Content: Flexible (`flex-1`), max-width constrained for readability on large screens (`max-w-7xl`).

## 5. Layout Design (App Shell)

```tsx
// structural concept
<div className="flex h-screen bg-black text-white">
  <Sidebar className="w-[260px] border-r border-white/5" />
  <div className="flex-1 flex flex-col">
    <Header className="h-16 border-b border-white/5 sticky top-0 backdrop-blur-md" />
    <Main className="flex-1 overflow-auto p-6 scrollbar-hide">
       {children}
    </Main>
  </div>
</div>
```

## 6. Reusable Components List (To Build/Maintained)

1.  **`GlassCard`**: Standard container for widgets.
2.  **`PrimaryButton`**: Texture-paper styled action button.
3.  **`StatusBadge`**: Pill-shaped indicator (High/Medium/Low).
4.  **`AvatarGroup`**: Stacked user initials/images.
5.  **`KanbanCard`**: Drag-ready deal/task item.
6.  **`DataTable`**: Sortable, filterable columns for Contacts/Activities.
7.  **`AIChatBubble`**: Distinct styles for User vs AI.

## 7. Future Expansion Capability

- **Multi-tenancy**: The schema is ready for `org_id` separation.
- **Webhooks**: `Activities` page structure supports external event logging.
- **Public API**: Layout supports API key generation in `Settings`.
- **Mobile**: The Flexbox layout (`flex-col` on mobile) is inherently responsive.
