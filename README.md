# League Predictor

**Live at [league-predictor.vercel.app](https://league-predictor.vercel.app)**

Pick a competition, drag the clubs into the order you reckon they will finish, then share your table
as a link or an image. Nothing is stored — the prediction, the name and the timestamp all travel
inside the URL, so a shared link always opens the same table.

## Running it

```bash
pnpm install
pnpm dev
```

## Refreshing the competitions

Club lists and badges are scraped once and committed, so the site has no runtime dependency on any
football API. At the start of a new season, re-run:

```bash
pnpm leagues
```

That rebuilds `src/lib/leagues.generated.ts`, the club badges in `public/logos/` and the competition
logos in `public/competitions/`.

- The **Premier League** comes from premierleague.com, so its badges are the official files.
- Every other competition comes from ESPN's public soccer API.

Competitions, colour themes and the promotion/relegation bands are configured in
`scripts/leagues.config.mjs`.
