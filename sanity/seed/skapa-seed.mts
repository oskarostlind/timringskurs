/**
 * Skapar en NDJSON-fil med sajtens nuvarande innehåll, så att Sanity kan
 * fyllas på i ett svep istället för att allt skrivs in för hand.
 *
 *   node --experimental-strip-types sanity/seed/skapa-seed.mts
 *   npx sanity dataset import sanity/seed/innehall.ndjson production
 *
 * Bilder och kurstillfällen ingår inte — bilderna laddas upp i Studio och
 * datumen skrivs in där, eftersom de gamla datumen saknade årtal.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { kurser } from "../../src/data/kurser.ts";
import { site, sociala } from "../../src/data/site.ts";
import { videos } from "../../src/data/media.ts";

const harMapp = dirname(fileURLToPath(import.meta.url));

const dokument: Record<string, unknown>[] = [];

kurser.forEach((k, i) => {
  dokument.push({
    _id: `kurs-${k.slug}`,
    _type: "kurs",
    namn: k.namn,
    slug: { _type: "slug", current: k.slug },
    kort: k.kort,
    ingress: k.ingress,
    brodtext: k.brodtext.join("\n\n"),
    langd: k.langd,
    plats: k.plats,
    prisText: k.pris,
    innehall: k.innehall,
    forkunskaper: k.forkunskaper,
    taMed: k.taMed,
    ...(k.externAnmalan ? { externAnmalan: k.externAnmalan } : {}),
    ...(k.lankar?.length
      ? {
          lankar: k.lankar.map((l, j) => ({
            _key: `lank-${j}`,
            _type: "object",
            ...l,
          })),
        }
      : {}),
    tillfallen: [],
    ordning: (i + 1) * 10,
    visaINavigering: true,
  });
});

dokument.push({
  _id: "sidinstallningar",
  _type: "sidinstallningar",
  namn: site.name,
  tagline: site.tagline,
  beskrivning: site.description,
  telefon: site.phone,
  telefonHref: site.phoneHref,
  epost: site.email,
  ort: site.address.city,
  adress: site.address.line1,
  orgNr: site.orgNr,
  sociala: sociala.map((s, i) => ({ _key: `social-${i}`, _type: "object", ...s })),
});

dokument.push({
  _id: "startsida",
  _type: "startsida",
  rubrik: "Timringskurser och skogsutbildning — med yxa i hand",
  ingress:
    "Knuttimring, motorsågskörkort, röjsågskörkort, solosåg, jägarexamen och skjutträning. Små grupper, mycket praktik och tid vid din egen stock.",
  galleri: [],
  videor: videos.map((v, i) => ({
    _key: `video-${i}`,
    _type: "object",
    youtubeId: v.id,
    titel: v.titel,
    kalla: v.kalla,
  })),
});

const fil = join(harMapp, "innehall.ndjson");
writeFileSync(fil, dokument.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Skrev ${dokument.length} dokument till ${fil}`);
