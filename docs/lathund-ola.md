# Guide för Ola

Den fullständiga guiden ligger som PDF i den här mappen:

**[Guide for Ola - sa skoter du timringskurs.nu.pdf](./Guide%20for%20Ola%20-%20sa%20skoter%20du%20timringskurs.nu.pdf)**

15 sidor som täcker inloggning, kurstillfällen, priser, texter, bilder, nya
kurser, startsidan, kontaktuppgifter och vad man gör när något blir fel. Sista
sidan är en lathund att skriva ut.

## Bygga om PDF:en

Källan är `guide.html` + `guide.css` i samma mapp. Rendera med WeasyPrint:

```bash
pip install weasyprint --break-system-packages
weasyprint docs/guide.html "docs/Guide for Ola - sa skoter du timringskurs.nu.pdf"
```

Skärmbilderna är HTML-återskapningar av Studio, inte riktiga skärmdumpar — de
håller sig skarpa i tryck och går att ändra i `guide.html`.

## När guiden behöver uppdateras

Guiden namnger knappar och fältnamn exakt. Ändrar du något av det här måste
guiden ändras med:

- fältens `title` i `sanity/schemaTypes/*.ts`
- gruppernas namn (flikarna) i samma filer
- menyn i `sanity/structure.ts`
- versionen av `@sanity/locale-sv-se`, som styr Sanitys egna knapptexter
  (*Publicera*, *Lägg till objekt*, *Kassera ändringar*, *Rensa fält* med flera)
