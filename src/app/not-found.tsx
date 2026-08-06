import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { hamtaNav, hamtaSite, hamtaSociala } from "@/lib/innehall";

export default async function NotFound() {
  const [site, nav, sociala] = await Promise.all([
    hamtaSite(),
    hamtaNav(),
    hamtaSociala(),
  ]);

  return (
    <>
      <Header site={site} nav={nav} />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start px-5 py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tra-600">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-skog-900">
        Sidan finns inte
      </h1>
      <p className="mt-4 text-kol-700">
        Länken kan vara gammal eller felstavad. Prova kursutbudet istället.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-skog-800 px-6 py-3 font-medium text-lin-50 transition hover:bg-skog-700"
      >
        Till startsidan
      </Link>
      </main>
      <Footer site={site} nav={nav} sociala={sociala} />
    </>
  );
}
