/**
 * Sanity-inställningar.
 *
 * Projekt-ID och dataset är inga hemligheter — de följer ändå med ut i
 * webbläsaren — så de ligger som standardvärden här. Då fungerar sajten och
 * Studio direkt efter en `git clone`, utan miljövariabler. Vill man peka mot
 * ett annat projekt eller dataset går det att sätta variablerna i .env.local
 * eller i Vercel.
 */

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pv9m05mm";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

/** Sant när Sanity är konfigurerat och innehåll ska hämtas därifrån. */
export const sanityAktiverat = projectId.length > 0;
