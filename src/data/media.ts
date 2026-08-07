export const videos = [
  {
    id: "wVPJoZo3hPg",
    titel: "Timringskurs – grundkurs",
    kalla: "Skelleftekanalen",
  },
  {
    id: "rOZ06Sdvesg",
    titel: "På timringskurs – Krångåsen",
    kalla: "Stugan off grid",
  },
];

/**
 * Bilderna nedan är hämtade från gamla timringskurs.nu och ligger i
 * /public/bilder. De används bara som reserv: så fort Ola lägger upp en bild
 * på motsvarande plats i Studio är det den som visas i stället.
 */

/** Bakgrundsbild högst upp på startsidan (dekorativ, texten ligger ovanpå). */
export const heroBild = "/bilder/hero-timringskurs.jpg";

/**
 * Galleribilder på startsidan.
 * Tom lista → galleriet döljs automatiskt.
 */
export const galleri: { src: string; alt: string }[] = [
  {
    src: "/bilder/galleri/timmerstomme-under-uppbyggnad.jpg",
    alt: "Timmerstomme under uppbyggnad på en kursplats",
  },
  {
    src: "/bilder/galleri/deltagare-i-arbete.jpg",
    alt: "Kursdeltagare som arbetar med stockar och handverktyg",
  },
  {
    src: "/bilder/galleri/timring-pa-kursplats.jpg",
    alt: "Timring pågår utomhus på kursplatsen",
  },
  {
    src: "/bilder/galleri/knuttimrat-virke-staplat.jpg",
    alt: "Staplat knuttimrat virke med färdiga knutar",
  },
  {
    src: "/bilder/galleri/bilat-timmer.jpg",
    alt: "Bilat timmer upplagt inför timring",
  },
  {
    src: "/bilder/galleri/inpassning-av-knut.jpg",
    alt: "Två deltagare passar in en knut mellan två stockar",
  },
  {
    src: "/bilder/galleri/kursdeltagare-gruppbild.jpg",
    alt: "Gruppbild på kursdeltagare med sågar och yxor",
  },
  {
    src: "/bilder/galleri/fallning-med-motorsag.jpg",
    alt: "Fällning av träd med motorsåg under utbildning",
  },
];

/**
 * Bild per kurs, kopplad på kursens slug. Används när kursen saknar bild
 * i Studio.
 */
export const kursbilder: Record<string, { src: string; alt: string }> = {
  timringskurs: {
    src: "/bilder/kurser/timringskurs.jpg",
    alt: "Bandkniv och handverktyg på en bilad stock",
  },
  motorsagskurs: {
    src: "/bilder/kurser/motorsagskurs.jpg",
    alt: "Fällning av träd med motorsåg i skogen",
  },
  rojsagskurs: {
    src: "/bilder/kurser/rojsagskurs.jpg",
    alt: "Kursdeltagare i skyddsutrustning under röjsågskurs",
  },
  solosagskurs: {
    src: "/bilder/kurser/solosagskurs.jpg",
    alt: "Sågning av plank med solosåg",
  },
  jagarexamen: {
    src: "/bilder/kurser/jagarexamen.jpg",
    alt: "Älgfigur med träffbild från skjutbanan",
  },
  skjuttraning: {
    src: "/bilder/kurser/skjuttraning.jpg",
    alt: "Elektronisk måltavla som visar träffar på älgfigur",
  },
};
