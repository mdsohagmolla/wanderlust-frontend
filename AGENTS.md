<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- Next.js 16.4.3 App Router, React 19.3, TypeScript (strict), Tailwind CSS v4, shadcn/ui (`base-nova` style) on Base UI.
- Single Next.js app: routes in `src/app`, UI primitives in `src/components/ui`, `@/*` maps to `src/*`.
- `public/images/` holds the site assets; there is no data layer, API, monorepo, or CI yet.

## Commands

- `npm run dev` — Turbopack dev server on port 3000.
- `npm run build` — production build; also runs TypeScript checks.
- `npm run lint` — ESLint (flat config, `eslint-config-next`).
- `npx next typegen && npx tsc --noEmit` — typecheck without a full build. Required after adding/changing routes because `LayoutProps`, `PageProps`, etc. are generated into `.next/types`, not imported.
- No test runner or test suite is configured; do not invent test commands.

## Framework constraints

Verified in `next.config.ts`:

- `cacheComponents: true` — data is dynamic by default. Uncached async reads and runtime APIs (`cookies()`, `headers()`, `searchParams`, `connection()`) must be inside `<Suspense>` or cached with `"use cache"`, or the build fails. The `runtime` route segment export is unsupported (no `edge`).
- `partialPrefetching: true` — `<Link>` prefetches the shared App Shell. Add `prefetch={true}` only for cached URL-specific content.
- `reactCompiler: true` — manual `useMemo`/`useCallback`/`React.memo` is usually unnecessary; use `"use no memo"` to opt a component out.
- Read the matching guide under `node_modules/next/dist/docs/` before using a Next API; bundled docs are version-matched and training data is not.
- Leave the managed block above intact: `next dev` regenerates it.
- `next dev` records its PID/port in `.next/dev/lock`; reuse an already-running server instead of starting a second one.

## UI and styling

- Import `cn` from the `"cn"` package (shadcn's compiled `clsx` + `tailwind-merge` replacement), matching existing components. Do not add `clsx` or `tailwind-merge`.
- `src/lib/utils.ts` only re-exports `cn` to satisfy shadcn's `@/lib/utils` alias.
- shadcn is configured for Base UI, not Radix. Add components with `npx shadcn add <name>` and keep `@base-ui/react/*` primitives.
- Tailwind v4 has no `tailwind.config.*` or PostCSS config. It runs through the `@tailwindcss/turbopack` CSS loader configured in `next.config.ts`; preserve that Turbopack rule. Theme tokens and light/dark values live in `src/app/globals.css` (`@theme inline` plus oklch CSS variables).
- The global font is Josefin Sans via `next/font/google` in `src/app/layout.tsx`.
