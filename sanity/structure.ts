import { BookIcon, CogIcon, HomeIcon } from "@sanity/icons";
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
        .icon(HomeIcon)
        .child(S.document().schemaType("startsida").documentId("startsida")),

      S.listItem()
        .title("Kurser")
        .icon(BookIcon)
        .child(
          S.documentTypeList("kurs")
            .title("Kurser")
            .defaultOrdering([{ field: "ordning", direction: "asc" }])
        ),

      S.divider(),

      S.listItem()
        .title("Kontakt och företagsuppgifter")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("sidinstallningar")
            .documentId("sidinstallningar")
        ),
    ]);
