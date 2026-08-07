export type Site = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  owner: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: { line1: string; city: string; country: string };
  orgNr: string;
  /** Porträtt på Om-sidan. Laddas upp i Studio; saknas det visas en platshållare. */
  portratt?: string;
  portrattAlt?: string;
};

export type SocialKanal = {
  namn: string;
  typ: "facebook" | "instagram" | "youtube" | "annan";
  url: string;
  beskrivning?: string;
};

/**
 * Reservinnehåll. Används bara innan Sanity är ifyllt, eller om Sanity
 * skulle vara onåbart. Redigeras normalt i Studio på /studio.
 */
export const site: Site = {
  name: "Norrhed Skog",
  tagline: "Timringskurser, motorsågsutbildning och jägarexamen",
  description:
    "Norrhed Skog håller timringskurser, motorsågsutbildning, röjsågskurser, solosågskurs, jägarexamen och skjutträning. Praktiska kurser i liten grupp med erfaren instruktör.",
  url: "https://timringskurs.nu",
  owner: "Ola Andersson",
  phone: "070-4466001",
  phoneHref: "+46704466001",
  // TODO: fyll i rätt e-postadress
  email: "info@timringskurs.nu",
  address: {
    line1: "Norrhed Skog / Ola Andersson",
    city: "Boden",
    country: "Sverige",
  },
  // TODO: fyll i organisationsnummer
  orgNr: "",
  // Olas egen profilbild från Facebook, beskuren till 4:5. Bara 358×448, så
  // byt gärna upp till ett foto i högre upplösning via Studio.
  portratt: "/bilder/ola-portratt.jpg",
  portrattAlt: "Ola Andersson i hjälm och skyddsjacka ute i skogen",
};

/**
 * Sociala kanaler. Redigeras normalt i Studio under
 * “Kontakt och företagsuppgifter”.
 */
export const sociala: SocialKanal[] = [
  {
    namn: "Jägarexamen Norrbotten",
    typ: "facebook",
    url: "https://www.facebook.com/JagarexamenNorrbotten",
    beskrivning: "Facebookgrupp med extra kurstillfällen och nyheter",
  },
];

// Menyn byggs från kurserna av hamtaNav() i src/lib/innehall.ts — en kurs som
// döljs i Studio försvinner därför automatiskt ur menyn.
