export const site = {
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
} as const;

export const nav = [
  { href: "/kurser/timringskurs", label: "Timringskurs" },
  { href: "/kurser/motorsagskurs", label: "Motorsågskurs" },
  { href: "/kurser/rojsagskurs", label: "Röjsågskurs" },
  { href: "/kurser/solosagskurs", label: "Solosågskurs" },
  { href: "/kurser/jagarexamen", label: "Jägarexamen" },
  { href: "/kurser/skjuttraning", label: "Skjutträning" },
];
