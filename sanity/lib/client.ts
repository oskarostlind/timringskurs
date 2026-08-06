import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId, sanityAktiverat } from "../env";

let instans: SanityClient | null = null;

/**
 * Skapas först när den behövs — utan projectId kastar createClient, och då
 * ska sajten falla tillbaka på reservinnehållet istället för att gå sönder.
 */
export function hamtaClient(): SanityClient | null {
  if (!sanityAktiverat) return null;
  if (!instans) {
    instans = createClient({
      projectId,
      dataset,
      apiVersion,
      // CDN i produktion (snabbt och billigt), direkt mot API:t i utveckling.
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
    });
  }
  return instans;
}
