# Repository Guidelines

## Project Structure & Module Organization

- `src/` houses TypeScript entrypoints, Tailwind styles, helper utilities, and Alpine integrations bundled with Vite.
- `templates/` contains Halo page, post, and widget templates; keep layout edits scoped here.
- `lit-components/` stores reusable Lit elements compiled into the theme.
- `dist/` is generated output from `pnpm build`; never hand-edit.
- Root configs (`theme.yaml`, `tailwind.config.js`, `vite.config.ts`) define Halo metadata, design tokens, and bundler behavior.

## Build, Test, and Development Commands

- `pnpm install` ensures dependencies align with the locked versions.
- `pnpm dev` runs `vite build --watch` to rebuild theme assets on change for local Halo instances.
- `pnpm build` performs a full production build and packages the theme via `theme-package`.
- `pnpm lint` checks TypeScript sources against ESLint + Prettier rules.
- `pnpm prettier` rewrites supported files to the project formatting profile.

## Coding Style & Naming Conventions

- Follow Prettier defaults: 2-space indentation, 120-character lines, LF endings.
- Prefer PascalCase for component classes, camelCase for utilities, and kebab-case for template filenames.
- Tailwind classes should remain sorted automatically by `prettier-plugin-tailwindcss`.
- TypeScript files must satisfy the `.eslintrc.cjs` rule set; use explicit typing for shared utilities in `src/utils`.

## Testing Guidelines

- No automated unit suite exists; rely on `pnpm build` and manual verification in a Halo sandbox before PRs.
- When reproducing issues, capture theme configuration from `theme.yaml` to ensure parity.
- Document visual diffs (screenshots or screen recordings) for layout-related fixes.

## Commit & Pull Request Guidelines

- Follow Conventional Commits (`feat:`, `fix:`, `chore:`) as reflected in recent history.
- Group related template, style, and config changes per commit to aid theme rollbacks.
- PRs should link Halo issue IDs when applicable, summarize test/build output, and attach before/after screenshots for UI work.
- Request at least one reviewer familiar with Halo theming when touching `templates/` or `lit-components/`.

## Packaging & Release Tips

- Use `pnpm build` before tagging to refresh `dist/` and ensure assets compress correctly.
- Verify `theme.yaml` version metadata matches the intended release and update changelog entries in `README` prior to publish.
