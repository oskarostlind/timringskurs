import { NextResponse } from "next/server";
import { site } from "@/data/site";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

function str(v: unknown, max = 2000) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  // Honeypot – bottar fyller i fältet, människor ser det inte.
  if (str(body.webbplats)) {
    return NextResponse.json({ ok: true });
  }

  const namn = str(body.namn, 120);
  const epost = str(body.epost, 200);
  const telefon = str(body.telefon, 60);
  const kurs = str(body.kurs, 120);
  const tillfalle = str(body.tillfalle, 200);
  const meddelande = str(body.meddelande, 4000);
  const nyhetsbrev = Boolean(body.nyhetsbrev);

  if (!namn || !epost || !kurs) {
    return NextResponse.json(
      { error: "Namn, e-post och kurs måste fyllas i." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(epost)) {
    return NextResponse.json(
      { error: "E-postadressen ser inte riktig ut." },
      { status: 400 }
    );
  }

  const text = [
    `Kurs: ${kurs}`,
    tillfalle && `Önskat tillfälle: ${tillfalle}`,
    `Namn: ${namn}`,
    `E-post: ${epost}`,
    telefon && `Telefon: ${telefon}`,
    `Nyhetsbrev: ${nyhetsbrev ? "ja" : "nej"}`,
    meddelande && `\nMeddelande:\n${meddelande}`,
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const till = process.env.ANMALAN_EPOST ?? site.email;
  const fran = process.env.ANMALAN_AVSANDARE ?? "Anmälan <onboarding@resend.dev>";

  if (!apiKey) {
    // Utan konfigurerad e-post loggar vi istället för att tappa anmälan tyst.
    console.warn("[anmalan] RESEND_API_KEY saknas. Anmälan:\n" + text);
    return NextResponse.json(
      {
        error:
          "Anmälningsfunktionen är inte färdigkonfigurerad. Ring eller mejla oss så löser vi det direkt.",
      },
      { status: 503 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fran,
      to: [till],
      reply_to: epost,
      subject: `Anmälan: ${kurs} – ${namn}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[anmalan] Resend-fel", res.status, await res.text());
    return NextResponse.json(
      { error: "Kunde inte skicka just nu. Försök igen eller ring oss." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
