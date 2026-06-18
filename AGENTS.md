# AGENTS.md — Guardly

## Project context

Guardly is an interactive cyber safety quest platform for children, parents, and schools.

Current project is a static HTML/CSS prototype generated from a visual concept. The most important rule: preserve the existing visual style. Do not redesign the brand from scratch.

## Brand direction

Guardly should look:
- modern
- product-like
- premium enough
- not childish
- not generic cyber
- not like a school presentation
- not like cheap hacker/matrix style

The current design style is the source of truth:
- dark hero sections
- off-white cards and backgrounds
- red signal accent
- Sora for headings
- Inter for UI/body text
- rounded cards
- minimal product-like UI
- final Guardly logo must be used

## Hard rules

1. Do not replace the visual style with a new one.
2. Do not invent a new logo.
3. Do not use Russian text.
4. All visible text must be Ukrainian.
5. Do not use VK, Sberbank, Russian services, or Russian examples.
6. Use Telegram, Roblox, Discord, TikTok, fake bank messages, fake links, phishing, scam, AI fakes.
7. Keep the project simple and frontend-only for now.
8. Do not add backend unless explicitly asked.
9. Do not break existing pages.
10. If refactoring, keep the same visual quality or improve it without changing direction.

## Technical expectations

Prefer a clean frontend structure.

If converting the project:
- use Vite
- use React or plain modular JS if React is too much
- keep routing simple
- keep all data in local JSON/JS files
- no backend
- no database
- no paid APIs

## Quality checks

Before finishing:
- check all links
- check responsive layout
- check console errors
- check that pages load locally
- remove dead code
- remove duplicated CSS where reasonable
- ensure Ukrainian text
- ensure the final logo is used everywhere
