/**
 * Sanity Studio — redigeringsverktyget som Ola loggar in i.
 * Ligger på timringskurs.nu/studio och byggs med resten av sajten.
 *
 * Själva Studio ligger i Studio.tsx (klientkomponent). Den här filen håller
 * bara metadata, så att Sanity aldrig hamnar i serverbygget.
 */
import type { Metadata, Viewport } from "next";

import Studio from "./Studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Redigera innehåll",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  return <Studio />;
}
