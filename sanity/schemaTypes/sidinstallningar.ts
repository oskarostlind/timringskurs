import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton: kontaktuppgifter och sådant som återkommer på hela sajten. */
export const sidinstallningar = defineType({
  name: "sidinstallningar",
  title: "Kontakt och företagsuppgifter",
  type: "document",
  groups: [
    { name: "kontakt", title: "Kontakt", default: true },
    { name: "foretag", title: "Företaget" },
    { name: "sociala", title: "Sociala kanaler" },
  ],
  fields: [
    defineField({
      name: "telefon",
      title: "Telefonnummer",
      type: "string",
      group: "kontakt",
      description: "Skrivs ut som du skriver det, t.ex. 070-446 60 01.",
    }),
    defineField({
      name: "telefonHref",
      title: "Telefonnummer för klickbar länk",
      type: "string",
      group: "kontakt",
      description:
        "Samma nummer men i formatet +46704466001. Används när någon trycker på numret i mobilen.",
    }),
    defineField({
      name: "epost",
      title: "E-postadress",
      type: "string",
      group: "kontakt",
      description: "Hit skickas anmälningar från formuläret.",
      validation: (rule) => rule.email().warning("Ser inte ut som en e-postadress."),
    }),
    defineField({
      name: "ort",
      title: "Ort",
      type: "string",
      group: "kontakt",
    }),

    defineField({
      name: "namn",
      title: "Företagets namn",
      type: "string",
      group: "foretag",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Kort beskrivning av verksamheten",
      type: "string",
      group: "foretag",
      description: "En rad som visas i sidhuvud och i sökresultat på Google.",
    }),
    defineField({
      name: "beskrivning",
      title: "Beskrivning för Google",
      type: "text",
      rows: 3,
      group: "foretag",
      description:
        "Texten som syns under rubriken i Googles sökresultat. Cirka 150 tecken.",
      validation: (rule) => rule.max(170).warning("Google kapar längre texter."),
    }),
    defineField({
      name: "orgNr",
      title: "Organisationsnummer",
      type: "string",
      group: "foretag",
    }),
    defineField({
      name: "portratt",
      title: "Porträttbild",
      type: "image",
      group: "foretag",
      options: { hotspot: true },
      description:
        "Bild på Ola som visas på Om-sidan. Stående bild fungerar bäst — dra i " +
        "hotspoten så hamnar ansiktet rätt när bilden beskärs.",
      fields: [
        defineField({
          name: "alt",
          title: "Bildbeskrivning",
          type: "string",
          description: "Till exempel ”Ola Andersson vid en timmerstock”.",
        }),
      ],
    }),
    defineField({
      name: "adress",
      title: "Adressrad",
      type: "string",
      group: "foretag",
    }),

    defineField({
      name: "sociala",
      title: "Sociala kanaler",
      type: "array",
      group: "sociala",
      description: "Länkarna som visas längst ner på sajten.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "namn",
              title: "Vad kanalen heter",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "typ",
              title: "Sorts kanal",
              type: "string",
              initialValue: "facebook",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Annan", value: "annan" },
                ],
                layout: "radio",
              },
            }),
            defineField({
              name: "url",
              title: "Adress",
              type: "url",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }),
            }),
            defineField({
              name: "beskrivning",
              title: "Kort förklaring",
              type: "string",
            }),
          ],
          preview: { select: { title: "namn", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Kontakt och företagsuppgifter" }),
  },
});
