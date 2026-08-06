import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton: texten högst upp på startsidan, galleri och filmer. */
export const startsida = defineType({
  name: "startsida",
  title: "Startsidan",
  type: "document",
  groups: [
    { name: "topp", title: "Text högst upp", default: true },
    { name: "galleri", title: "Bilder" },
    { name: "filmer", title: "Filmer" },
  ],
  fields: [
    defineField({
      name: "rubrik",
      title: "Stor rubrik",
      type: "string",
      group: "topp",
      description: "Det första besökaren läser.",
    }),
    defineField({
      name: "ingress",
      title: "Text under rubriken",
      type: "text",
      rows: 4,
      group: "topp",
    }),
    defineField({
      name: "heroBild",
      title: "Bakgrundsbild högst upp",
      type: "image",
      group: "topp",
      options: { hotspot: true },
      description:
        "Liggande bild i hög upplösning. Texten läggs ovanpå, så en lugn bild fungerar bäst.",
      fields: [
        defineField({ name: "alt", title: "Bildbeskrivning", type: "string" }),
      ],
    }),

    defineField({
      name: "galleri",
      title: "Bildgalleri",
      type: "array",
      group: "galleri",
      description:
        "Bilder från kurser och projekt. Lämnar du galleriet tomt visas det inte alls på sajten.",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Bildbeskrivning",
              type: "string",
              description: "Beskriv kort vad bilden föreställer.",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "videor",
      title: "Filmer från YouTube",
      type: "array",
      group: "filmer",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "youtubeId",
              title: "Video-ID eller länk",
              type: "string",
              description:
                "Klistra in hela YouTube-länken så plockar vi ut rätt del automatiskt.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "titel",
              title: "Filmens titel",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "kalla",
              title: "Vem har gjort filmen",
              type: "string",
            }),
          ],
          preview: { select: { title: "titel", subtitle: "kalla" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Startsidan" }) },
});
