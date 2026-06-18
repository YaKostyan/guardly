# TASK.md — Guardly MVP frontend refactor and expansion

You are working on Guardly, an interactive cyber safety quest platform.

The current project contains several static HTML pages:
- guardly-landing.html
- guardly-missions.html
- guardly-parents.html
- guardly-pricing.html
- guardly-schools.html

Your task is to turn this into a cleaner frontend MVP while preserving the current design direction.

## Very important

Do not redesign the project from scratch.

The existing Claude-generated visual style is the source of truth:
- dark hero sections
- off-white cards
- red signal accent
- Sora + Inter typography
- clean premium product look
- rounded cards
- interactive quest/product feeling
- final Guardly logo

Do not introduce a completely new palette.
Do not make it look cheaper.
Do not make it look more childish.
Do not make it look like generic cyberpunk/matrix/hacker style.

## Main goal

Refactor the current static pages into a maintainable frontend MVP with:
- reusable components
- shared styles/tokens
- working navigation
- Ukrainian text only
- no Russian examples
- a real demo quest page
- data-driven mission cards
- basic interactivity
- responsive layout

## Recommended technical direction

Use Vite + React if possible.

Expected structure:

```txt
guardly/
  package.json
  index.html
  src/
    main.jsx
    App.jsx
    routes/
      Home.jsx
      Missions.jsx
      Parents.jsx
      Schools.jsx
      Pricing.jsx
      DemoQuest.jsx
    components/
      Navbar.jsx
      Footer.jsx
      Button.jsx
      MissionCard.jsx
      PricingCard.jsx
      SectionHeader.jsx
      QuestScenario.jsx
    data/
      missions.js
      pricing.js
      questDemo.js
    styles/
      globals.css
      tokens.css
      components.css
  public/
    logo.png
