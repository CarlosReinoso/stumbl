# Signal Router

A polished mini-product that matches a described need to relevant support organisations — instantly.

Built with **React 19 + TypeScript + Vite + Tailwind CSS**.

---

## Quick Start

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # production build → dist/
pnpm preview    # preview the production build locally
```

> **Requires** Node ≥ 18 and pnpm ≥ 10. Install pnpm with `corepack enable`.

---

## Project Structure

```
src/
├── types/
│   └── index.ts            # Shared TypeScript types (Category, Organization)
│
├── lib/
│   └── api.ts              # Data layer — SIGNAL_ROUTER map + fetchOrganizations()
│
├── hooks/
│   └── useSignalRouter.ts  # Custom hook — loading state + routeSignal()
│
├── components/
│   ├── ui/                 # Primitive, reusable UI atoms
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   │
│   ├── SignalForm.tsx       # Controlled form (message + category picker)
│   ├── ResultCard.tsx       # Single organisation card
│   └── ResultsList.tsx      # Responsive grid + skeleton loader
│
├── App.tsx                 # Root — composes hook + layout
├── main.tsx                # React DOM entry point
└── index.css               # Tailwind directives (@base / @components / @utilities)
```

---

## Architecture

### Layered separation of concerns

```
┌──────────────────────────────────────────┐
│               App.tsx                    │  ← composition root
│  useSignalRouter() ──► routeSignal()     │
│       │                    │             │
│  <SignalForm>          <ResultsList>      │
│  <Input> <Select>     <ResultCard>       │
│  <Button>                                │
└──────────────┬───────────────────────────┘
               │ calls
┌──────────────▼───────────────────────────┐
│           hooks/useSignalRouter.ts        │  ← logic layer
│  manages:  loading, results              │
│  delegates: fetchOrganizations()         │
└──────────────┬───────────────────────────┘
               │ calls
┌──────────────▼───────────────────────────┐
│              lib/api.ts                   │  ← data layer
│  SIGNAL_ROUTER: Record<Category, Org[]>  │
│  fetchOrganizations(category): Promise   │
└──────────────────────────────────────────┘
               │ imports
┌──────────────▼───────────────────────────┐
│            types/index.ts                 │  ← shared contract
│  Category (union)  Organization (interface)│
└──────────────────────────────────────────┘
```

### Why this way?

| Layer | Responsibility | Why isolated? |
|---|---|---|
| `types/` | Single source of truth for domain shapes | Change a type once; TypeScript propagates errors everywhere else automatically |
| `lib/api.ts` | Data fetching / business data | Swap in a real REST/GraphQL call without touching any component |
| `hooks/` | UI state management | Components stay declarative; async complexity lives in one place |
| `components/ui/` | Visual primitives | Design changes (colour, radius, font) cascade from a single file |
| `components/` | Feature components | Compose primitives + hook — no raw `fetch`, no raw `useState` for domain data |

---

## Key Design Decisions

### `import type` everywhere
The project uses `verbatimModuleSyntax` (Vite's default tsconfig). All type-only imports must be written as `import type { ... }` — the compiler enforces this and it produces smaller output because type imports are erased at build time.

### Skeleton loader instead of a spinner
`ResultsList` renders three `animate-pulse` placeholder cards while `loading` is `true`. This prevents layout shift and sets user expectations about the card grid structure before data arrives.

### Button disabled state
The submit button is disabled when:
- the message field is empty, **or**
- no category is selected, **or**
- a request is already in flight

This prevents double-submits and makes the form self-documenting about its own validation state.

### Keys on `org.name` not array index
Organisation names are unique within a category, so `key={org.name}` gives React a stable identity for reconciliation. Index-based keys cause unnecessary re-renders and can scramble animation state.

---

## Extending the project

### Add a real API
Replace the body of `fetchOrganizations` in `src/lib/api.ts`:

```ts
export const fetchOrganizations = async (
  category: Category
): Promise<Organization[]> => {
  const res = await fetch(`/api/organisations?category=${category}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
```

No other files need to change.

### Add a new category
1. Add the string to the `Category` union in `src/types/index.ts`.
2. Add a matching entry to `SIGNAL_ROUTER` in `src/lib/api.ts`.

TypeScript will error if you forget step 2 (the `Record<Category, ...>` type is exhaustive).

### Add error handling
Extend `useSignalRouter.ts` with an `error` state:

```ts
const [error, setError] = useState<string | null>(null);

const routeSignal = async (category: Category) => {
  setLoading(true);
  setError(null);
  try {
    const data = await fetchOrganizations(category);
    setResults(data);
  } catch {
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
```

Then consume `error` in `App.tsx` alongside `results` and `loading`.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI rendering |
| TypeScript | 6 | Static typing |
| Vite | 8 | Dev server + bundler |
| Tailwind CSS | 3 | Utility-first styling |
| pnpm | 10 | Fast, disk-efficient package manager |
