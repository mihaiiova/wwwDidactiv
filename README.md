# Didactiv

The public Didactiv site is a static Astro application with Romanian-language pages for Didactiv and Slove.

## Local development

```bash
npm install
npm run dev
```

Run validation and the static build with:

```bash
npm run check
npm run build
npm test
```

To deploy to Cloudflare Workers, authenticate Wrangler locally and run `npm run deploy`. The configuration serves `./dist` and contains no account identifiers or secrets. The `didactiv.ro` domain must be configured separately in the intended Cloudflare project.

## Source snapshot

The Slove content and assets in this site are a manual snapshot taken on 7 August 2026 from the product repository `/Users/m/dev/didactiv/lexio`. The primary sources are:

- `store_listings/privacy_policy.md` — the policy published at `/confidentialitate/slove/`;
- `store_listings/app_store.md` and `store_listings/google_play.md` — application copy references;
- `DESIGN.md` and `lib/design/colors.dart` — typography and palette;
- `assets/fonts/` — the local NoticiaText fonts;
- `assets/brand_icons/` and `screenshots/` — the icon, favicon, and screenshots;
- `store_assets/` — the source store artwork used for the screenshots.

The policy preserves the meaning and date from the canonical source. Store buttons remain in the honest “În curând” state until real URLs exist.
