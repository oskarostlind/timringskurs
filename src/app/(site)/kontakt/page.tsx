import type { Metadata } from "next";
import Link from "next/link";
import AnmalanForm from "@/components/AnmalanForm";
import { hamtaKurser, hamtaSite } from "@/lib/innehall";

export async function generateMetadata(): Promise<Metadata> {
  const site = await hamtaSite();
  return {
    title: "Kontakt och anmälan",
    description: `Anmäl dig till en kurs hos ${site.name} eller hör av dig med frågor. Telefon ${site.phone}.`,
    alternates: { canonical: "/kontakt" },
  };
}

export default async function KontaktSida({
  searchParams,
}: {
  searchParams: Promise<{ kurs?: string }>;
}) {
  const [{ kurs: slug }, kurser, site] = await Promise.all([
    searchParams,
    hamtaKurser(),
    hamtaSite(),
  ]);
  const förvald = slug ? kurser.find((k) => k.slug === slug)?.namn : undefined;

  return (
    <>
      <section className="bg-skog-900 text-lin-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <nav aria-label="Brödsmulor" className="text-sm text-lin-200">
            <Link href="/" className="hover:text-white">
              Start
            </Link>
            <span className="px-2 text-lin-300">/</span>
            <span>Kontakt</span>
          </nav>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Kontakt och anmälan
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-lin-200">
            Anmäl dig till en kurs, anmäl intresse för ett datum som inte ligger
            uppe ännu, eller fråga något innan du bestämmer dig.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-skog-900">
            Anmälningsformulär
          </h2>
          <div className="mt-8">
            <AnmalanForm förvaldKurs={förvald} kurser={kurser} />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-lin-200 bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-skog-900">
              Ring oss
            </h2>
            <a
              href={`tel:${site.phoneHref}`}
              className="mt-4 block rounded-lg bg-skog-800 px-5 py-3 text-center font-medium text-lin-50 transition hover:bg-skog-700"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block rounded-lg border border-lin-300 px-5 py-3 text-center text-sm font-medium text-kol-900 transition hover:border-skog-700"
            >
              {site.email}
            </a>
          </div>

          <div className="rounded-xl border border-lin-200 bg-lin-100 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-kol-500">
              Adress
            </h2>
            <address className="mt-4 text-sm not-italic leading-relaxed text-kol-700">
              {site.address.line1}
              <br />
              {site.address.city}
              <br />
              {site.address.country}
            </address>
          </div>

          <div className="rounded-xl border border-tra-400/40 bg-tra-100 p-6">
            <h2 className="font-display text-base font-semibold text-skog-900">
              Timringskurs?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-kol-700">
              Anmälan till timringskurserna görs via Studieförbundet
              Vuxenskolan.
            </p>
            <a
              href="https://www.sv.se"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-skog-800 underline underline-offset-4"
            >
              Till sv.se →
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
