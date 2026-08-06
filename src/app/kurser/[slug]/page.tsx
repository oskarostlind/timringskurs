import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKurs, kurser } from "@/data/kurser";
import { site } from "@/data/site";
import Media from "@/components/Media";
import AnmalanForm from "@/components/AnmalanForm";
import SocialLank from "@/components/SocialLank";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return kurser.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const kurs = getKurs(slug);
  if (!kurs) return {};
  return {
    title: kurs.namn,
    description: kurs.ingress,
    alternates: { canonical: `/kurser/${kurs.slug}` },
    openGraph: {
      title: `${kurs.namn} | ${site.name}`,
      description: kurs.ingress,
      url: `/kurser/${kurs.slug}`,
    },
  };
}

export default async function KursSida({ params }: Params) {
  const { slug } = await params;
  const kurs = getKurs(slug);
  if (!kurs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: kurs.namn,
    description: kurs.ingress,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Rubrik */}
      <section className="relative isolate overflow-hidden bg-skog-900 text-lin-50">
        <Media src={kurs.bild} alt="" className="absolute inset-0 -z-10 h-full w-full" />
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <nav aria-label="Brödsmulor" className="text-sm text-lin-200">
            <Link href="/" className="hover:text-white">
              Start
            </Link>
            <span className="px-2 text-lin-300">/</span>
            <span>{kurs.namn}</span>
          </nav>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {kurs.namn}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-lin-200">
            {kurs.ingress}
          </p>
        </div>
      </section>

      {/* Fakta */}
      <section className="border-b border-lin-200 bg-lin-100">
        <dl className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Längd", kurs.langd],
            ["Plats", kurs.plats],
            ["Pris", kurs.pris],
            ["Förkunskaper", kurs.forkunskaper],
          ].map(([t, v]) => (
            <div key={t}>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-kol-500">
                {t}
              </dt>
              <dd className="mt-1.5 text-[15px] text-kol-900">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 lg:grid-cols-[1fr_20rem]">
        <div>
          {kurs.brodtext.map((p, i) => (
            <p key={i} className="mb-5 text-[17px] leading-relaxed text-kol-700">
              {p}
            </p>
          ))}

          <h2 className="mt-12 font-display text-2xl font-semibold text-skog-900">
            Det här går vi igenom
          </h2>
          <ul className="mt-5 space-y-2.5">
            {kurs.innehall.map((rad) => (
              <li key={rad} className="flex gap-3 text-kol-700">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-tra-500" />
                {rad}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-2xl font-semibold text-skog-900">
            Ta med
          </h2>
          <ul className="mt-5 space-y-2.5">
            {kurs.taMed.map((rad) => (
              <li key={rad} className="flex gap-3 text-kol-700">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-skog-600" />
                {rad}
              </li>
            ))}
          </ul>

          {kurs.tillfallen.length > 0 && (
            <>
              <h2 className="mt-12 font-display text-2xl font-semibold text-skog-900">
                Kurstillfällen
              </h2>
              <ul className="mt-5 divide-y divide-lin-200 overflow-hidden rounded-xl border border-lin-200 bg-white">
                {kurs.tillfallen.map((t, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-display text-lg font-semibold text-skog-800">
                        {t.datum}
                      </p>
                      <p className="text-sm text-kol-700">
                        {t.ort}
                        {t.pris ? ` · ${t.pris}` : ""}
                      </p>
                    </div>
                    {t.anmalanUrl ? (
                      <a
                        href={t.anmalanUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-skog-800 px-4 py-2 text-center text-sm font-medium text-skog-800 transition hover:bg-skog-800 hover:text-lin-50"
                      >
                        Anmäl via SV
                      </a>
                    ) : (
                      <a
                        href="#anmalan"
                        className="rounded-lg bg-skog-800 px-4 py-2 text-center text-sm font-medium text-lin-50 transition hover:bg-skog-700"
                      >
                        Anmäl dig
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {kurs.externAnmalan && (
            <p className="mt-6 rounded-xl border border-tra-400/40 bg-tra-100 p-5 text-sm leading-relaxed text-kol-700">
              Anmälan till {kurs.namn.toLowerCase()} sker via{" "}
              <a
                href={kurs.externAnmalan.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-skog-800 underline underline-offset-4"
              >
                {kurs.externAnmalan.namn}
              </a>
              . Har du frågor innan du anmäler dig — hör av dig till oss direkt.
            </p>
          )}
        </div>

        {/* Sidopanel */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-lin-200 bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-skog-900">
              Frågor om kursen?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-kol-700">
              Ring så svarar vi på det du undrar över.
            </p>
            <a
              href={`tel:${site.phoneHref}`}
              className="mt-5 block rounded-lg bg-skog-800 px-5 py-3 text-center font-medium text-lin-50 transition hover:bg-skog-700"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block rounded-lg border border-lin-300 px-5 py-3 text-center text-sm font-medium text-kol-900 transition hover:border-skog-700"
            >
              Mejla oss
            </a>
          </div>

          {kurs.lankar && kurs.lankar.length > 0 && (
            <div className="mt-6 space-y-3">
              {kurs.lankar.map((l) => (
                <SocialLank
                  key={l.url}
                  url={l.url}
                  namn={l.namn}
                  beskrivning={l.beskrivning}
                  variant="kort"
                />
              ))}
            </div>
          )}

          <div className="mt-6 rounded-xl border border-lin-200 bg-lin-100 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-kol-500">
              Andra kurser
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {kurser
                .filter((k) => k.slug !== kurs.slug)
                .map((k) => (
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

      {/* Anmälan */}
      <section id="anmalan" className="scroll-mt-24 border-t border-lin-200 bg-lin-100">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
          <h2 className="font-display text-3xl font-semibold text-skog-900">
            Anmäl dig till {kurs.namn.toLowerCase()}
          </h2>
          <p className="mt-3 text-kol-700">
            Fyll i formuläret så hör vi av oss med bekräftelse och praktisk
            information.
          </p>
          <div className="mt-9">
            <AnmalanForm förvaldKurs={kurs.namn} />
          </div>
        </div>
      </section>
    </>
  );
}
