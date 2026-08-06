import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { kurser } from "@/data/kurser";
import Media from "@/components/Media";

export const metadata: Metadata = {
  title: "Om Norrhed Skog",
  description: `${site.name} drivs av ${site.owner} i Boden och håller kurser i timring, motorsåg, röjsåg, solosåg, jägarexamen och skjutträning.`,
  alternates: { canonical: "/om" },
};

export default function OmSida() {
  return (
    <>
      <section className="bg-skog-900 text-lin-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <nav aria-label="Brödsmulor" className="text-sm text-lin-200">
            <Link href="/" className="hover:text-white">
              Start
            </Link>
            <span className="px-2 text-lin-300">/</span>
            <span>Om oss</span>
          </nav>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Om Norrhed Skog
          </h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="text-[17px] leading-relaxed text-kol-700">
            Norrhed Skog drivs av {site.owner} med bas i {site.address.city}. Vi
            håller kurser i knuttimring, motorsåg, röjsåg, solosåg, jägarexamen
            och skjutträning — för privatpersoner, företag och föreningar.
          </p>
          <p className="mt-5 text-[17px] leading-relaxed text-kol-700">
            Grundtanken är enkel: små grupper och mycket tid vid det du faktiskt
            ska lära dig. På en timringskurs betyder det att alla har en egen
            stock att arbeta med. På en motorsågskurs betyder det att du hinner
            såga tillräckligt många gånger för att tekniken ska sätta sig.
          </p>

          {/* TODO: Ersätt nedanstående med Olas egen text — bakgrund, år i yrket,
              instruktörsbehörigheter och certifieringar. */}
          <h2 className="mt-12 font-display text-2xl font-semibold text-skog-900">
            Så jobbar vi
          </h2>
          <ul className="mt-5 space-y-3">
            {[
              "Små grupper med handledning vid varje deltagare",
              "Mycket praktik — teori bara så mycket som behövs",
              "Kurser på flera orter, från Kalix till Uppsala",
              "Uppdragsutbildning på plats hos företag och föreningar",
            ].map((rad) => (
              <li key={rad} className="flex gap-3 text-kol-700">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-tra-500" />
                {rad}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-2xl font-semibold text-skog-900">
            Samarbeten
          </h2>
          <p className="mt-5 leading-relaxed text-kol-700">
            Timringskurserna arrangeras tillsammans med{" "}
            <a
              href="https://www.sv.se"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-skog-800 underline underline-offset-4"
            >
              Studieförbundet Vuxenskolan
            </a>
            . Jägarexamen och skjutträning hålls på Sunderby Jakt &
            Sportskytteklubbs bana i Sunderbyn.
          </p>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Media
            src={undefined}
            alt={site.owner}
            label="Porträtt"
            className="aspect-[4/5] w-full rounded-xl"
          />
          <div className="mt-6 rounded-xl border border-lin-200 bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-skog-900">
              Kontakt
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-kol-700">
              <li>
                <a href={`tel:${site.phoneHref}`} className="hover:text-skog-700">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-skog-700">
                  {site.email}
                </a>
              </li>
              <li className="pt-2">
                {site.address.line1}
                <br />
                {site.address.city}
              </li>
            </ul>
          </div>
          <div className="mt-6 rounded-xl border border-lin-200 bg-lin-100 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-kol-500">
              Kurser
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {kurser.map((k) => (
                <li key={k.slug}>
                  <Link
                    href={`/kurser/${k.slug}`}
                    className="text-skog-800 underline underline-offset-4 hover:text-skog-600"
                  >
                    {k.namn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
