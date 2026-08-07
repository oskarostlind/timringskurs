import { defineQuery } from "next-sanity";

export const kurserQuery = defineQuery(`
  *[_type == "kurs" && defined(slug.current)]
  | order(coalesce(ordning, 100) asc, namn asc) {
    "slug": slug.current,
    namn,
    kort,
    ingress,
    brodtext,
    langd,
    plats,
    prisText,
    innehall,
    forkunskaper,
    taMed,
    externAnmalan,
    lankar,
    tillfallen,
    bild,
    visaINavigering
  }
`);

export const sidinstallningarQuery = defineQuery(`
  *[_type == "sidinstallningar"][0] {
    namn, tagline, beskrivning, telefon, telefonHref, epost, ort, adress, orgNr,
    portratt, sociala
  }
`);

export const startsidaQuery = defineQuery(`
  *[_type == "startsida"][0] {
    rubrik, ingress, heroBild, galleri, videor
  }
`);
