# Shelf Front Guidelines

## Summary

Shelf Front is the TypeScript and React frontend for Shelf, a self-hosted file manager. The UI exposes two product surfaces: a Files app for browsing and managing files, and a Photos app for media browsing and photo-specific workflows.

## Terminology

- Files app: The file-browser application under `src/apps/files`; use it as the reference for the preferred app layout.
- Photos app: The photo manager. It is still partly legacy and many features remain under `src/components/photos` and `src/pages/Photos`.
- UI Kit: Base reusable UI primitives in `src/ui`, built on top of shadcn/ui and styled with Tailwind CSS.
- App-agnostic component: Reusable component that does not belong to a single app; keep these in `src/components`.
- App-specific code: Components, pages, hooks, and helpers that belong to one app; keep these under that app in `src/apps/<app>`.

## Architecture

Use TypeScript, React, Redux Toolkit, and RTK Query patterns already present in the repo. Keep shared helpers in `src/lib`, generic hooks in `src/hooks`, Redux state and API slices in `src/store`, and all icon exports centralized in `src/icons` instead of importing third-party icons directly in feature code. Prefer the new app-oriented structure in `src/apps`; `src/apps/files` is the canonical example.

## Task planning and problem-solving

- Before each task, you must first complete the following steps:
  1. Provide a full plan of your changes.
  2. Provide a list of behaviors that you'll change.
  3. Provide a list of test cases to add.
- Before you add any code, always check if you can just re-use or re-configure any existing code to achieve the result.
- Before editing, identify whether the change is app-specific or truly shared, then place code in the narrowest correct module.
- Follow existing patterns in the Files app when choosing structure, routing, store usage, and feature boundaries.
- When touching Photos code, improve the local area without expanding legacy patterns into new folders.
- Always use translation strings for user-facing text
- After adding or editing translation strings in components do the following:
  1. Regenerate translation files with `pnpm makelocales`.
  2. Add missing translations in `src/public/locales` for any new strings.
- After any code change, run `pnpm format`, `pnpm lint` and `pnpm build` from the repository root before finishing.
- When adding a new base UI component check if there a suitable shadcn/ui primitive available. If yes install with shadcn/ui MCP server.
- If you need to check available server API fetch openapi definitions following this link: http://localhost:8000/openapi.json.

## Coding guidelines

- Prefer existing shadcn/ui wrappers from `src/ui` over ad hoc primitives. Use Tailwind CSS for styling, RTK Query for server data, and Redux Toolkit patterns already used in `src/store`.
- For new reusable UI, extend `src/ui` or `src/components` instead of adding more legacy structure.
- Keep frontend/domain code in camelCase and confine backend snake_case naming to API schema and transformation boundaries. Reuse icons through `src/icons`.
- Put new code in the preferred `src/apps/<app>` layout when it is app-specific, and reserve `src/components` for reusable app-agnostic components.
