# timringskurs.nu — Norrhed Skog

Ny webbplats för Norrhed Skog (timringskurs.nu). Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript. Byggd för deploy på Vercel.

## Kom igång

```bash
npm install
npm run dev
```

Sajten körs på http://localhost:3000

## Var innehållet ligger

Allt redaktionellt innehåll ligger i `src/data/` — du behöver inte röra komponenterna för att ändra text, datum eller priser.

| Fil | Innehåller |
| --- | --- |
| `src/data/kurser.ts` | Alla sex kurser: beskrivningar, priser, innehåll, ta-med-listor och kurstillfällen |
| `src/data/site.ts` | Företagsnamn, telefon, e-post, adress, org.nr, huvudmeny |
| `src/data/media.ts` | YouTube-klipp och galleribilder |

### Lägga till ett kurstillfälle

Öppna `src/data/kurser.ts`, hitta rätt kurs och lägg till i `tillfallen`:

```ts
{ datum: "12–13 september", ort: "Boden", pris: "3 500 kr" }
```

Lägg till `anmalanUrl: "https://www.sv.se/..."` om anmälan sker via Studieförbundet Vuxenskolan — då byts knappen ut mot en länk dit istället för det egna formuläret.

### Lägga till bilder

1. Lägg bildfilen i `public/bilder/`, t.ex. `public/bilder/timringskurs.jpg`
2. Avkommentera `bild:`-raden för kursen i `src/data/kurser.ts`

Utan bild visas en dekorativ platshållare — inget går sönder.

Galleriet på startsidan fylls på i `src/data/media.ts` (`galleri`). Tom lista döljer hela sektionen.

**Rekommenderad bildstorlek:** minst 1600 px bred. Bilderna på gamla sajten är 300 px och för små för att användas.

## Anmälningsformuläret

Formuläret postar till `/api/anmalan`, som mejlar via [Resend](https://resend.com). Sätt miljövariablerna i `.env.local` lokalt och i Vercel-projektets Environment Variables i produktion — se `.env.example`.

Utan `RESEND_API_KEY` visar formuläret ett meddelande om att ringa istället, och anmälan loggas i serverloggen.

## Sidor

- `/` — start: hero, kommande tillfällen, kursutbud, om, video, kontakt
- `/kurser/[slug]` — en sida per kurs, genereras statiskt från `kurser.ts`
- `/om` — om Norrhed Skog
- `/kontakt` — anmälningsformulär och kontaktuppgifter
- `/sitemap.xml`, `/robots.txt` — genereras automatiskt

## Kvar att fylla i

Sök på `TODO` i koden. I korthet:

- E-postadress och organisationsnummer i `src/data/site.ts`
- Olas egen text om bakgrund och behörigheter i `src/app/om/page.tsx`
- Priser för motorsåg, röjsåg och solosåg i `src/data/kurser.ts`
- Riktiga bilder i `public/bilder/`
