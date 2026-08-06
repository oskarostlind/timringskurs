import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/** Ett enskilt kurstillfälle: datum, ort, pris och anmälan. */
export const tillfalle = defineType({
  name: "tillfalle",
  title: "Kurstillfälle",
  type: "object",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "startDatum",
      title: "Startdatum",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      description: "Första kursdagen. Välj i kalendern.",
      validation: (rule) => rule.required().error("Startdatum måste fyllas i."),
    }),
    defineField({
      name: "slutDatum",
      title: "Slutdatum",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      description:
        "Sista kursdagen. Lämna tomt om kursen bara pågår en dag.",
      validation: (rule) =>
        rule.custom((slut, context) => {
          const start = (context.parent as { startDatum?: string })?.startDatum;
          if (!slut || !start) return true;
          return slut >= start
            ? true
            : "Slutdatum kan inte vara före startdatum.";
        }),
    }),
    defineField({
      name: "ort",
      title: "Ort",
      type: "string",
      description: "Var kursen hålls, t.ex. Kalix.",
      validation: (rule) => rule.required().error("Ort måste fyllas i."),
    }),
    defineField({
      name: "pris",
      title: "Pris (kr)",
      type: "number",
      description:
        "Bara siffror, utan “kr”. Lämna tomt om kursens ordinarie pris gäller.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "öppen",
      options: {
        list: [
          { title: "Öppen för anmälan", value: "öppen" },
          { title: "Fåtal platser kvar", value: "fåtal platser" },
          { title: "Fullbokad", value: "fullbokad" },
          { title: "Inställd", value: "inställd" },
        ],
        layout: "radio",
      },
      description: "Visas som en liten etikett vid tillfället på sajten.",
    }),
    defineField({
      name: "anmalanUrl",
      title: "Länk till anmälan",
      type: "url",
      description:
        "Om anmälan sker hos någon annan, t.ex. Studieförbundet Vuxenskolan. Lämna tomt så används formuläret på sajten.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { start: "startDatum", slut: "slutDatum", ort: "ort", status: "status" },
    prepare({ start, slut, ort, status }) {
      const period = slut && slut !== start ? `${start} – ${slut}` : start;
      return {
        title: `${period ?? "Datum saknas"} · ${ort ?? ""}`,
        subtitle: status && status !== "öppen" ? status : undefined,
      };
    },
  },
});
