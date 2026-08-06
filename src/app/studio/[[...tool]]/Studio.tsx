"use client";

/**
 * Studio måste ligga i en klientkomponent. Importeras `sanity.config` från en
 * serverkomponent drar Next in hela Studio i RSC-grafen, och då plockar den
 * `react-server`-varianten av swr — som saknar de exporter Sanity behöver.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}
