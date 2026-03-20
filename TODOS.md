# TODOS

## Dark Mode Token Values
**Priority:** Medium
**What:** Define dark mode variants for all semantic + component tokens across 22 JSON files.
**Why:** The architecture fix (createStyles → context) enables theme switching, but no dark palette exists to switch to. Without this, the `mode` prop on `ZDSProvider` is cosmetic.
**Pros:** Unlocks the full theme value proposition.
**Cons:** Requires design input for color decisions — not purely an engineering task.
**Depends on:** createStyles context fix (Architecture Issue 1).
**Where to start:** `packages/tokens/src/semantic/color.semantic.json` — add dark mode variants, then propagate to component tokens.

## CI/CD Quality Gates
**Priority:** Medium
**What:** Create GitHub Actions workflow with lint + typecheck + test + a11y gates on PRs.
**Why:** Without CI gates, the design system's rules (no hardcoded colors, 80% coverage, etc.) aren't enforced on PRs. The ESLint plugin and jest config set standards, but nothing blocks a bad PR from merging.
**Pros:** Prevents regressions, enforces coverage thresholds automatically.
**Cons:** Visual regression needs paid service (Chromatic) or self-hosted solution.
**Depends on:** Comprehensive test suite (Issue 7A) and a11y tests (Issue 8A).
**Where to start:** `.github/workflows/` — a PR quality gate workflow may already exist but needs expansion.

## Missing Component Spec Docs
**Priority:** Low
**What:** Write `docs/components/*.md` spec files for ~8 components that lack them (Box, Stack, Pressable, Badge, Spacer, Divider, SafeArea, etc.).
**Why:** Agents and the MCP `zds_get_component` tool rely on these docs. Without them, the MCP server returns "not found" for those components.
**Pros:** Completes the docs-first promise, makes MCP fully functional.
**Cons:** Minimal — straightforward to write following the existing format.
**Depends on:** Nothing.
**Where to start:** Copy the format from `docs/components/button.md` and adapt for each missing component.
