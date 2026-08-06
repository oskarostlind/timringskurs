export type Tillfalle = {
  datum: string;
  ort: string;
  pris?: string;
  /** Extern anmälningslänk, t.ex. Studieförbundet Vuxenskolan */
  anmalanUrl?: string;
  status?: "öppen" | "fåtal platser" | "fullbokad";
};

export type Kurs = {
  slug: string;
  namn: string;
  kort: string;
  /** Kort ingress högst upp på kurssidan */
  ingress: string;
  /** Brödtext, ett stycke per element */
  brodtext: string[];
  langd: string;
  plats: string;
  pris: string;
  innehall: string[];
  forkunskaper: string;
  taMed: string[];
  /** Sökväg till bild i /public/bilder. Utelämnas → dekorativ platshållare visas. */
  bild?: string;
  tillfallen: Tillfalle[];
  /** Om anmälan sker via extern part istället för vårt formulär */
  externAnmalan?: { namn: string; url: string };
};

const SV_URL = "https://www.sv.se";

export const kurser: Kurs[] = [
  {
    slug: "timringskurs",
    namn: "Timringskurs",
    kort: "Lär dig knuttimra för hand — från stock till färdig knut.",
    ingress:
      "En praktisk grundkurs i knuttimring där du arbetar med handverktyg och lär dig hela kedjan: välja virke, märka, hugga ur och passa in knutar.",
    brodtext: [
      "Timring är ett hantverk som bygger på noggrannhet snarare än styrka. Under kursen arbetar du med riktigt virke från första stunden och bygger upp känslan för hur stocken beter sig, hur du läser den och hur du får två stockar att sitta ihop utan glapp.",
      "Vi jobbar i liten grupp så att alla får handledning vid sin egen stock. Du behöver inte ha timrat förut — kursen fungerar både för nybörjaren och för dig som redan har hållit i en yxa.",
    ],
    langd: "2 dagar",
    plats: "Kalix, Uppsala, Norsjö m.fl.",
    pris: "Se aktuellt tillfälle",
    innehall: [
      "Virkesval och virkets egenskaper",
      "Handverktyg: yxa, timmerskiva, dragmått, bandkniv",
      "Märkning och rittning",
      "Urhuggning och inpassning av knut",
      "Slipning och skötsel av verktyg",
      "Säkerhet på timringsplatsen",
    ],
    forkunskaper: "Inga förkunskaper krävs.",
    taMed: [
      "Kläder efter väder — vi är utomhus",
      "Kraftiga skor eller kängor",
      "Arbetshandskar",
      "Egen yxa om du har",
      "Matsäck",
    ],
    // bild: "/bilder/timringskurs.jpg", // ← lägg bilden i public/bilder och avkommentera
    externAnmalan: { namn: "Studieförbundet Vuxenskolan", url: SV_URL },
    tillfallen: [
      { datum: "9–10 maj", ort: "Kalix", anmalanUrl: SV_URL },
      { datum: "1–2 juli", ort: "Uppsala", anmalanUrl: SV_URL },
      { datum: "4–5 juli", ort: "Uppsala", anmalanUrl: SV_URL },
      { datum: "22–23 augusti", ort: "Norsjö", anmalanUrl: SV_URL },
    ],
  },
  {
    slug: "motorsagskurs",
    namn: "Motorsågskurs",
    kort: "Motorsågskörkort nivå A och B enligt Säker Skog.",
    ingress:
      "Utbildning mot motorsågskörkort. Nivå A ger grunderna i säker hantering och kapning, nivå B lägger till trädfällning och upparbetning av vindfällen.",
    brodtext: [
      "Motorsågskörkortet är en branschstandard framtagen inom Säker Skog. Nivå A är grundnivån som alla börjar med och handlar om säker hantering, underhåll och kapning. Nivå B bygger vidare med trädfällning och upparbetning.",
      "Kursen varvar teori med praktiskt arbete i skogen. Både teoretiskt och praktiskt prov ingår.",
    ],
    langd: "Enligt överenskommelse",
    plats: "Norrbotten och efter överenskommelse",
    pris: "Kontakta för offert",
    innehall: [
      "Motorsågens uppbyggnad, skötsel och underhåll",
      "Skyddsutrustning och sågens säkerhetsdetaljer",
      "Kapteknik och spänningar i virket",
      "Trädfällning med fällteknik (nivå B)",
      "Upparbetning av vindfällen (nivå B)",
      "Teoretiskt och praktiskt prov",
    ],
    forkunskaper: "Nivå A: inga. Nivå B: godkänd nivå A.",
    taMed: [
      "Godkänd skyddsutrustning: hjälm med visir och hörselskydd, sågskyddsbyxor, skyddsskor, handskar",
      "Egen motorsåg om du har",
      "Matsäck",
    ],
    // bild: "/bilder/motorsagskurs.jpg", // ← lägg bilden i public/bilder och avkommentera
    tillfallen: [],
  },
  {
    slug: "rojsagskurs",
    namn: "Röjsågskurs",
    kort: "Röjsågskörkort nivå RA och RB.",
    ingress:
      "Utbildning mot röjsågskörkort. RA är grundnivån med skötsel, hantering och enklare röjning. RB inriktas på ungskogsröjning och underröjning.",
    brodtext: [
      "Röjsågskörkortet har två nivåer. RA täcker skötsel och handhavande samt enklare röjningsarbete som gräs- och slyröjning. RB inriktar sig på skogsröjning med tonvikt på arbetsteknik vid ungskogsröjning och underröjning.",
      "För varje nivå ingår både teoretiskt och praktiskt prov.",
    ],
    langd: "Enligt överenskommelse",
    plats: "Norrbotten och efter överenskommelse",
    pris: "Kontakta för offert",
    innehall: [
      "Röjsågens uppbyggnad och underhåll",
      "Skyddsutrustning",
      "Arbetsteknik och ergonomi",
      "Röjning av gräs och sly (RA)",
      "Ungskogsröjning och underröjning (RB)",
      "Teoretiskt och praktiskt prov",
    ],
    forkunskaper: "RA: inga. RB: godkänd RA.",
    taMed: [
      "Skyddsutrustning: hjälm med visir och hörselskydd, skyddsbyxor, skyddsskor, handskar",
      "Egen röjsåg om du har",
      "Matsäck",
    ],
    // bild: "/bilder/rojsagskurs.jpg", // ← lägg bilden i public/bilder och avkommentera
    tillfallen: [],
  },
  {
    slug: "solosagskurs",
    namn: "Solosågskurs",
    kort: "Såga eget virke med solosåg direkt i skogen.",
    ingress:
      "Praktisk kurs i att såga eget virke med solosåg — ett bandsågverk som du tar med dit stocken ligger.",
    brodtext: [
      "Med en solosåg kan du förädla virke där det växte, utan att transportera stock till ett sågverk. Kursen går igenom riggning, sågning, virkeslära och hur du får ut mesta möjliga av varje stock.",
    ],
    langd: "Enligt överenskommelse",
    plats: "Norrbotten och efter överenskommelse",
    pris: "Kontakta för offert",
    innehall: [
      "Riggning och inställning av sågen",
      "Sågteknik och sågmönster",
      "Virkeslära och postning",
      "Underhåll och sågklingor",
      "Torkning och lagring av virket",
    ],
    forkunskaper: "Inga förkunskaper krävs.",
    taMed: ["Kläder efter väder", "Skyddsskor och handskar", "Matsäck"],
    // bild: "/bilder/solosagskurs.jpg", // ← lägg bilden i public/bilder och avkommentera
    tillfallen: [],
  },
  {
    slug: "jagarexamen",
    namn: "Jägarexamen",
    kort: "Intensivpaket mot fullständig jägarexamen i Sunderbyn.",
    ingress:
      "Intensivutbildning mot jägarexamen. En fullständig jägarexamen består av ett teoretiskt prov och tre praktiska delprov: hagelgevärsprov, grundprov för kulgevär och högviltprov för kulgevär.",
    brodtext: [
      "Intensivpaketet är upplagt över fyra dagar där teori och skjutning varvas. Vi håller till på Sunderby Jakt & Sportskytteklubbs bana.",
      "Proven avläggs inför provledare som godkänts av Polismyndigheten. Naturvårdsverket ansvarar för provens innehåll.",
    ],
    langd: "4 dagar (intensivpaket)",
    plats: "Sunderbyn",
    pris: "5 500 kr (intensivpaket)",
    innehall: [
      "Jaktlagstiftning och jaktetik",
      "Viltarter och viltvård",
      "Vapen, ammunition och ballistik",
      "Säker vapenhantering",
      "Teoriprov: 70 frågor, minst 60 rätt krävs",
      "Praktiska prov: hagelgevär, grundprov kulgevär, högviltprov kulgevär",
    ],
    forkunskaper: "Inga förkunskaper krävs.",
    taMed: [
      "Kläder efter väder",
      "Hörselskydd och skyddsglasögon",
      "Legitimation",
      "Matsäck",
    ],
    // bild: "/bilder/jagarexamen.jpg", // ← lägg bilden i public/bilder och avkommentera
    tillfallen: [
      { datum: "28–31 maj", ort: "Sunderbyn", pris: "5 500 kr" },
      { datum: "25–28 juni", ort: "Sunderbyn", pris: "5 500 kr" },
      { datum: "23–26 juli", ort: "Sunderbyn", pris: "5 500 kr" },
    ],
  },
  {
    slug: "skjuttraning",
    namn: "Skjutträning",
    kort: "Skjutkurs för dig som vill bli säkrare på banan och i skogen.",
    ingress:
      "Skjutkurs med fokus på träffsäkerhet, vapenhantering och skjutställningar — bra inför jaktpremiären eller inför de praktiska proven.",
    brodtext: [
      "Kursen riktar sig både till dig som är ny och till dig som vill slipa på tekniken. Vi går igenom skjutställningar, andning, avfyrning och hur du använder stöd i verkliga jaktsituationer.",
    ],
    langd: "2 dagar",
    plats: "Sunderbyn",
    pris: "2 500 kr",
    innehall: [
      "Säker vapenhantering",
      "Skjutställningar och stöd",
      "Andning och avfyrning",
      "Inskjutning av vapen",
      "Träning mot älgbana och hagelbana",
    ],
    forkunskaper: "Inga förkunskaper krävs.",
    taMed: [
      "Eget vapen och ammunition om du har",
      "Hörselskydd och skyddsglasögon",
      "Kläder efter väder",
    ],
    // bild: "/bilder/skjuttraning.jpg", // ← lägg bilden i public/bilder och avkommentera
    tillfallen: [{ datum: "11–12 juli", ort: "Sunderbyn", pris: "2 500 kr" }],
  },
];

export function getKurs(slug: string) {
  return kurser.find((k) => k.slug === slug);
}

export function allaTillfallen() {
  return kurser.flatMap((k) =>
    k.tillfallen.map((t) => ({ ...t, kurs: k.namn, slug: k.slug }))
  );
}
