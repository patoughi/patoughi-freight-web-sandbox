# Patoughi Frontend Exercise

A small slice of the driver app: a list of available loads, a detail page, and a bottom sheet for placing a bid.

This repository is the shared context for a 60 minute pair session. You are **not** asked to write any code before the session.

## What to do before we meet

1. Get it running (about 2 minutes, instructions below).
2. Read the code. Roughly 450 lines.
3. Click through the app so the flows are familiar.
4. Come with questions.

That's it. Please do not implement anything in advance. The session is about working together on this code, not about reviewing something you prepared alone.

## Setup

Requires Node 20.9+ (Next.js 16 minimum). Node 22 LTS or newer is recommended.

```bash
npm install
npm run dev
```

Open http://localhost:3000. It redirects to `/shipments`.

```bash
npm run typecheck   # tsc --noEmit
npm run lint
npm run build
```

All three should pass on a clean checkout. If they don't, tell us before the session rather than debugging it yourself.

## What is mocked

There is no real backend. `src/app/api/**` contains route handlers that read from `src/data/*.json` and stand in for the upstream API. They deliberately behave like the real thing:

- A fixed page size, with `page` in the query string.
- Filters `origin_city` and `cargo_type`, each accepting **one** value only.
- Artificial latency, so loading states are visible.
- `POST /api/shipments/[id]/bids` fails about one time in four with a 409, so error paths are visible. That is on purpose, not a bug.

Treat these handlers as the contract of a backend you do not control. If a task would be easier with a different API shape, say so out loud, but assume you cannot change it without a conversation.

## Domain

| Concept | Meaning |
|---|---|
| Shipment | A load a shipper wants moved between two cities. |
| Bid | A driver's offered price for a shipment, in Rial. |

All amounts are **integers in Rial**. Drivers read prices in Toman, which is Rial divided by 10.

## Layout

```
src/
  app/
    shipments/                list + detail routes
    api/shipments/**          mock backend
    layout.tsx globals.css
  components/                 ShipmentCard, BidBottomSheet, StatusBadge
  features/shipments/         queries.ts (TanStack Query), types.ts
  lib/                        api-client.ts, format.ts
  providers/                  QueryProvider
  data/                       mock JSON
```

## Conventions in this repo

- Next.js 16 App Router, React 19. TypeScript strict, including `noUncheckedIndexedAccess`.
- Prettier config is in `.prettierrc`. Run it.
- Server Components by default. `'use client'` only where a component actually needs state or effects, and never on a route file itself.
- Data fetching goes through `apiFetch` and TanStack Query, never raw `fetch` in a component.

## Deliberately out of scope

These are missing on purpose and are not part of the exercise:

- Authentication. The driver is hardcoded as id 1.
- Internationalisation. The app is English-only here.
- A design system or component library. Plain CSS classes are fine.
- Tests. There is no test setup in this repo.

Everything else is fair game.

## What the session looks like

We will spend about 40 minutes making a change to this code together, and about 20 minutes on a code review exercise using a different snippet.

**Using an AI assistant is explicitly allowed and expected.** Use whatever you normally use. The one thing we will ask is that you can explain and defend every line you submit, including anything a tool generated for you. That is the actual skill we are assessing.

Bring your own machine and editor.
