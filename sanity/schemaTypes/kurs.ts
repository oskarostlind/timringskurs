import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const kurs = defineType({
  name: "kurs",
  title: "Kurs",
  type: "document",
  icon: BookIcon,
  groups: [
    { name: "innehall", title: "Text och bild", default: true },
    { name: "tillfallen", title: "Datum och pris" },
    { name: "praktiskt", title: "Praktisk info" },
    { name: "installningar", title: "Inställningar" },
  ],
  fields: [
    defineField({
      name: "namn",
      title: "Kursens namn",
      type: "string",
      group: "innehall",
      validation: (rule) => rule.required().error("Kursen måste ha ett namn."),
    }),
    defineField({
      name: "slug",
      title: "Webbadress",
      type: "slug",
      group: "installningar",
      options: { source: "namn", maxLength: 60 },
      description:
        "Adressen till kurssidan, t.ex. “timringskurs” ger timringskurs.nu/kurser/timringskurs. Ändra inte på en kurs som redan ligger ute — då slutar gamla länkar att fungera.",
      validation: (rule) => rule.required().error("Webbadress måste fyllas i."),
    }),
    defineField({
      name: "kort",
      title: "Kort beskrivning",
      type: "string",
      group: "innehall",
      description:
        "En mening som visas i kurslistan på startsidan. Håll den kort.",
      validation: (rule) => rule.max(140).warning("Blir lätt för lång i listan."),
    }),
    defineField({
      name: "ingress",
      title: "Ingress",
      type: "text",
      rows: 3,
      group: "innehall",
      description: "Det fetare stycket högst upp på kurssidan.",
    }),
    defineField({
      name: "brodtext",
      title: "Brödtext",
      type: "text",
      rows: 12,
      group: "innehall",
      description:
        "Den löpande texten om kursen. Tryck Enter två gånger för att börja ett nytt stycke.",
    }),
    defineField({
      name: "bild",
      title: "Bild",
      type: "image",
      group: "innehall",
      options: { hotspot: true },
      description:
        "Toppbild för kursen. Liggande bild blir snyggast. Dra i cirkeln för att välja vad som ska synas när bilden beskärs.",
      fields: [
        defineField({
          name: "alt",
          title: "Bildbeskrivning",
          type: "string",
          description:
            "Beskriv kort vad bilden föreställer. Läses upp för synskadade och visas om bilden inte laddas.",
        }),
      ],
    }),

    defineField({
      name: "tillfallen",
      title: "Kurstillfällen",
      type: "array",
      group: "tillfallen",
      of: [defineArrayMember({ type: "tillfalle" })],
      description:
        "Lägg till ett tillfälle per datum. Tillfällen som har passerat döljs automatiskt på sajten — du behöver inte rensa bort dem.",
    }),
    defineField({
      name: "prisText",
      title: "Pris när inget tillfälle har eget pris",
      type: "string",
      group: "tillfallen",
      description:
        "Skrivs ut precis som du skriver det, t.ex. “5 500 kr” eller “Kontakta för offert”.",
    }),
    defineField({
      name: "externAnmalan",
      title: "Anmälan sker hos annan arrangör",
      type: "object",
      group: "tillfallen",
      options: { collapsible: true, collapsed: true },
      description:
        "Fyll bara i om anmälan görs någon annanstans, t.ex. hos Studieförbundet Vuxenskolan.",
      fields: [
        defineField({ name: "namn", title: "Arrangörens namn", type: "string" }),
        defineField({
          name: "url",
          title: "Länk",
          type: "url",
          validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
        }),
      ],
    }),

    defineField({
      name: "langd",
      title: "Kursens längd",
      type: "string",
      group: "praktiskt",
      description: "T.ex. “2 dagar” eller “Enligt överenskommelse”.",
    }),
    defineField({
      name: "plats",
      title: "Plats",
      type: "string",
      group: "praktiskt",
      description: "Var kursen brukar hållas, t.ex. “Norrbotten”.",
    }),
    defineField({
      name: "forkunskaper",
      title: "Förkunskaper",
      type: "text",
      rows: 2,
      group: "praktiskt",
    }),
    defineField({
      name: "innehall",
      title: "Det här går vi igenom",
      type: "array",
      group: "praktiskt",
      of: [defineArrayMember({ type: "string" })],
      description: "En punkt per rad. Visas som en punktlista på kurssidan.",
      options: { layout: "tags" },
    }),
    defineField({
      name: "taMed",
      title: "Ta med",
      type: "array",
      group: "praktiskt",
      of: [defineArrayMember({ type: "string" })],
      description: "En sak per rad, t.ex. “Arbetshandskar”.",
      options: { layout: "tags" },
    }),
    defineField({
      name: "lankar",
      title: "Länkar",
      type: "array",
      group: "praktiskt",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "namn",
              title: "Vad länken heter",
              type: "string",
              validation: (rule) => rule.required(),
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

    defineField({
      name: "ordning",
      title: "Ordning",
      type: "number",
      group: "installningar",
      initialValue: 100,
      description:
        "Lägre tal hamnar tidigare i menyn och i kurslistan. 10, 20, 30 … ger utrymme att skjuta in nya kurser.",
    }),
    defineField({
      name: "visaINavigering",
      title: "Visa kursen i menyn",
      type: "boolean",
      group: "installningar",
      initialValue: true,
      description: "Stäng av för att gömma kursen utan att radera den.",
    }),
  ],
  orderings: [
    {
      title: "Ordning som på sajten",
      name: "ordningAsc",
      by: [{ field: "ordning", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "namn", subtitle: "kort", media: "bild" },
  },
});
