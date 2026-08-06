import type { StructureResolver } from "sanity/structure";

/**
 * Menyn till vänster i Studio.
 *
 * Startsidan och kontaktuppgifterna är enskilda dokument (singletons) och
 * öppnas direkt när man klickar — inga listor med ett objekt i.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innehåll")
    .items([
      S.listItem()
        .title("Startsidan")
        .child(S.document().schemaType("startsida").documentId("startsida")),

      S.listItem()
        .title("Kurser")
        .child(
          S.documentTypeList("kurs")
            .title("Kurser")
            .defaultOrdering([{ field: "ordning", direction: "asc" }])
        ),

      S.divider(),

      S.listItem()
        .title("Kontakt och företagsuppgifter")
        .child(
          S.document()
            .schemaType("sidinstallningar")
            .documentId("sidinstallningar")
        ),
    ]);
