/**
 * Miljövariabler för Sanity.
 *
 * Sätts i .env.local lokalt och i Vercel → Settings → Environment Variables.
 * Om projectId saknas körs sajten på det inbyggda reservinnehållet i src/data,
 * så att bygget aldrig går sönder bara för att en variabel glömts bort.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-01-01";

/** Sant när Sanity är konfigurerat och innehåll ska hämtas därifrån. */
export const sanityAktiverat = projectId.length > 0;
