# timringskurs.nu — Norrhed Skog

Ny webbplats för Norrhed Skog (timringskurs.nu). Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript. Innehållet redigeras i Sanity Studio. Byggd för deploy på Vercel.

## Kom igång

```bash
npm install
cp .env.example .env.local   # fyll i värdena
npm run dev
```

Sajten körs på http://localhost:3000, redigeringsverktyget på http://localhost:3000/studio

Första `npm run build` tar några minuter — Studio är ett stort paket att bygga.

## Innehåll

Allt redaktionellt innehåll ligger i Sanity (projekt `pv9m05mm`, dataset `production`) och redigeras på **/studio**. Ola är tänkt användare — se [`docs/lathund-ola.md`](docs/lathund-ola.md).

| Var | Vad |
| --- | --- |
| `sanity/schemaTypes/` | Innehållsmodellen: kurs, kurstillfälle, startsida, kontaktuppgifter |
| `sanity/structure.ts` | Menyn i Studio |
| `sanity/lib/queries.ts` | GROQ-frågorna |
| `src/lib/innehall.ts` | Hämtar och formaterar innehållet åt sidorna |
| `src/data/` | **Reservinnehåll.** Används bara om Sanity är tomt eller onåbart |

Sidorna importerar aldrig `src/data` direkt — de anropar `hamtaKurser()`, `hamtaSite()` och `hamtaStartsida()` i `src/lib/innehall.ts`, som faller tillbaka på `src/data` om Sanity inte svarar. Sajten går alltså aldrig ner för att Sanity gör det.

### Datum och priser

Kurstillfällen lagras som riktiga datum (`startDatum` / `slutDatum`) och priser som tal. Formateringen till `"9–10 maj 2027"` och `"5 500 kr"` sker i `src/lib/innehall.ts`. Passerade tillfällen filtreras bort automatiskt.

### Uppdateringsfrekvens

Sidorna hämtar om innehållet var 60:e sekund (`REVALIDERA` i `src/lib/innehall.ts`). För omedelbar uppdatering finns webhooken `/api/revalidate` — se nedan.

## Engångsuppsättning

1. **Miljövariabler** i `.env.local` och i Vercel → Settings → Environment Variables (se `.env.example`).

2. **Fyll Sanity med nuvarande innehåll:**

   ```bash
   npx sanity login
   npm run seed            # bygger sanity/seed/innehall.ndjson från src/data
   npm run sanity:import
   ```

   Kurstillfällen och bilder ingår inte i importen — de gamla datumen saknade årtal, så de skrivs in i Studio.

3. **Bjud in Ola:** sanity.io/manage → projektet → Members → Invite. Rollen *Editor* räcker; den tillåter allt utom att ändra projektinställningar.

4. **Webhook för direktpublicering** (valfritt men trevligt): sanity.io/manage → API → Webhooks → Create webhook.
   - URL: `https://timringskurs.nu/api/revalidate`
   - Dataset: `production`, trigger på create/update/delete
   - Secret: samma sträng som miljövariabeln `SANITY_REVALIDATE_SECRET`

## Anmälningsformuläret

Formuläret postar till `/api/anmalan`, som mejlar via [Resend](https://resend.com). Utan `RESEND_API_KEY` visar formuläret ett meddelande om att ringa istället, och anmälan loggas i serverloggen.

## Sidor

- `/` — start: hero, kommande tillfällen, kursutbud, om, video, galleri, kontakt
- `/kurser/[slug]` — en sida per kurs
- `/om` — om Norrhed Skog
- `/kontakt` — anmälningsformulär och kontaktuppgifter
- `/studio` — Sanity Studio (redigering)
- `/sitemap.xml`, `/robots.txt` — genereras automatiskt

## Kvar att fylla i

- Kurstillfällen med riktiga datum i Studio
- Högupplösta bilder (minst 1600 px breda) i Studio
- E-postadress och organisationsnummer under *Kontakt och företagsuppgifter*
- Olas egen text om bakgrund och behörigheter i `src/app/(site)/om/page.tsx`
- Priser för motorsåg, röjsåg och solosåg
