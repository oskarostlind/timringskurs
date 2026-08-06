import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Tar emot en signal från Sanity när Ola publicerar något och bygger om
 * sidorna direkt — annars hade ändringen synts först efter en minut.
 *
 * Sätts upp i Sanity: Manage → API → Webhooks → URL
 * https://timringskurs.nu/api/revalidate med samma hemlighet som
 * miljövariabeln SANITY_REVALIDATE_SECRET.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ error: "Ogiltig signatur." }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ error: "Saknar dokumenttyp." }, { status: 400 });
    }

    // Allt innehåll delas mellan sidorna, så vi bygger om hela sajten.
    revalidatePath("/", "layout");

    return NextResponse.json({ uppdaterad: true, typ: body._type });
  } catch (error) {
    console.error("Kunde inte uppdatera sidorna:", error);
    return NextResponse.json({ error: "Något gick fel." }, { status: 500 });
  }
}
