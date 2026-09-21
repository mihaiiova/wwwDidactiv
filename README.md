# Didactiv

Site-ul public Didactiv este o aplicație Astro statică, cu pagini în limba română pentru Didactiv și Slove.

## Local

```bash
npm install
npm run dev
```

Verificările și build-ul static:

```bash
npm run check
npm run build
npm test
```

Pentru deploy Cloudflare Workers, autentifică Wrangler în mediul local și rulează `npm run deploy`. Configurația servește directorul `./dist` și nu conține identificatori de cont sau secrete. Domeniul `didactiv.ro` trebuie configurat separat în proiectul Cloudflare potrivit.

## Snapshot surse

Conținutul și materialele Slove din acest site sunt un snapshot manual făcut la 7 august 2026 din repository-ul de produs `/Users/m/dev/didactiv/lexio`. Sursele principale sunt:

- `store_listings/privacy_policy.md` — politica publicată la `/confidentialitate/slove/`;
- `store_listings/app_store.md` și `store_listings/google_play.md` — verificarea copy-ului aplicației;
- `DESIGN.md`, `lib/design/colors.dart` — tipografie și paletă;
- `assets/fonts/` — fonturile NoticiaText folosite local;
- `assets/brand_icons/` și `screenshots/` — iconița, favicon-ul și capturile de ecran.

Politica păstrează sensul și data din sursa canonică. Store buttons rămân în starea onestă „În curând” până la existența unor URL-uri reale.
