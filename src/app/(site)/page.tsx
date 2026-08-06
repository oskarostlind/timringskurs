import Link from "next/link";
import KursKort from "@/components/KursKort";
import Media from "@/components/Media";
import {
  hamtaKurser,
  hamtaSite,
  hamtaStartsida,
  hamtaTillfallen,
} from "@/lib/innehall";

export default async function Home() {
  const [kurser, tillfallen, site, startsida] = await Promise.all([
    hamtaKurser(),
    hamtaTillfallen(),
    hamtaSite(),
    hamtaStartsida(),
  ]);
  const { galleri, videor } = startsida;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-skog-900 text-lin-50">
        <Media
          src={startsida.heroBild}
          alt=""
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full"
        />
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-28 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tra-400">
            {site.name} · {site.address.city}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[2rem] leading-[1.12] font-semibold tracking-tight sm:mt-5 sm:text-5xl lg:text-6xl">
            {startsida.rubrik ??
              "Timringskurser och skogsutbildning — med yxa i hand"}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-lin-200 sm:mt-6 sm:text-lg">
            {startsida.ingress ??
              "Knuttimring, motorsågskörkort, röjsågskörkort, solosåg, jägarexamen och skjutträning. Små grupper, mycket praktik och tid vid din egen stock."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Link
              href="#kurser"
              className="rounded-lg bg-tra-500 px-6 py-3.5 text-center font-medium text-skog-950 transition hover:bg-tra-400"
            >
              Se alla kurser
            </Link>
            <Link
              href="#tillfallen"
              className="rounded-lg border border-lin-50/30 px-6 py-3.5 text-center font-medium text-lin-50 transition hover:bg-lin-50/10"
            >
              Kommande kurstillfällen
            </Link>
          </div>
        </div>
      </section>

      {/* Kommande tillfällen */}
      <section id="tillfallen" className="scroll-mt-24 border-b border-lin-200 bg-lin-100">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold text-skog-900 sm:text-4xl">
                Kommande kurstillfällen
              </h2>
              <p className="mt-3 max-w-xl text-kol-700">
                Datum som är bokningsbara just nu. Hittar du inget som passar går
                det bra att höra av sig — vi lägger till tillfällen löpande.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="text-sm font-medium text-skog-700 underline underline-offset-4 hover:text-skog-600"
            >
              Anmäl intresse för andra datum
            </Link>
          </div>

          <ul className="mt-10 divide-y divide-lin-200 overflow-hidden rounded-xl border border-lin-200 bg-white">
            {tillfallen.map((t, i) => (
              <li
                key={`${t.slug}-${i}`}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="min-w-0">
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-lg font-semibold text-skog-800">
                      {t.datum}
                    </span>
                    <span className="text-kol-900">{t.ort}</span>
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-kol-500">
                    <Link
                      href={`/kurser/${t.slug}`}
                      className="underline underline-offset-4 hover:text-skog-700"
                    >
                      {t.kurs}
                    </Link>
                    {t.pris && (
                      <>
                        <span aria-hidden>·</span>
                        <span className="font-medium text-kol-700">{t.pris}</span>
                      </>
                    )}
                  </p>
                </div>
                {t.anmalanUrl ? (
                  <a
                    href={t.anmalanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg border border-skog-800 px-4 py-2.5 text-center text-sm font-medium text-skog-800 transition hover:bg-skog-800 hover:text-lin-50"
                  >
                    Anmäl via SV
                  </a>
                ) : (
                  <Link
                    href={`/kontakt?kurs=${t.slug}`}
                    className="shrink-0 rounded-lg bg-skog-800 px-4 py-2.5 text-center text-sm font-medium text-lin-50 transition hover:bg-skog-700"
                  >
                    Anmäl dig
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kursutbud */}
      <section id="kurser" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="font-display text-3xl font-semibold text-skog-900 sm:text-4xl">
            Våra kurser
          </h2>
          <p className="mt-3 max-w-2xl text-kol-700">
            Sex kurser för dig som vill kunna mer om skog, virke och säker
            hantering av verktygen.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kurser.map((k) => (
              <KursKort key={k.slug} kurs={k} />
            ))}
          </div>
        </div>
      </section>

      {/* Om */}
      <section className="border-y border-lin-200 bg-lin-100">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-2">
          <Media
            src={undefined}
            alt={`${site.owner}, instruktör`}
            label="Porträtt"
            className="aspect-[4/3] w-full rounded-xl"
          />
          <div>
            <h2 className="font-display text-3xl font-semibold text-skog-900 sm:text-4xl">
              Kurser som hålls av någon som jobbar i skogen
            </h2>
            <p className="mt-5 leading-relaxed text-kol-700">
              Norrhed Skog drivs av {site.owner} med bas i Boden. Kurserna hålls
              i liten grupp med mycket handledning — målet är att du ska gå hem
              med något du faktiskt kan göra själv, inte bara ett intyg.
            </p>
            <p className="mt-4 leading-relaxed text-kol-700">
              Timringskurserna arrangeras i samarbete med Studieförbundet
              Vuxenskolan och hålls på flera orter, från Kalix i norr till
              Uppsala.
            </p>
            <Link
              href="/om"
              className="mt-7 inline-block rounded-lg border border-skog-800 px-5 py-2.5 text-sm font-medium text-skog-800 transition hover:bg-skog-800 hover:text-lin-50"
            >
              Mer om Norrhed Skog
            </Link>
          </div>
        </div>
      </section>

      {/* Video */}
      {videor.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="font-display text-3xl font-semibold text-skog-900 sm:text-4xl">
            Se hur en kurs går till
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {videor.map((v) => (
              <figure key={v.id}>
                <div className="aspect-video overflow-hidden rounded-xl bg-skog-950">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.titel}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <figcaption className="mt-3 text-sm text-kol-700">
                  <span className="font-medium text-kol-900">{v.titel}</span>
                  {" · "}
                  {v.kalla}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Galleri */}
      {galleri.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:pb-20">
          <h2 className="font-display text-3xl font-semibold text-skog-900 sm:text-4xl">
            Från kurserna
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleri.map((b) => (
              <Media
                key={b.src}
                src={b.src}
                alt={b.alt}
                className="aspect-square w-full rounded-lg"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-skog-900 text-lin-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Har du en fråga om en kurs?
            </h2>
            <p className="mt-3 max-w-xl text-lin-200">
              Ring eller skicka en rad så återkommer vi. Vi håller även kurser på
              plats hos företag och föreningar.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${site.phoneHref}`}
              className="rounded-lg bg-tra-500 px-6 py-3.5 text-center font-medium text-skog-950 transition hover:bg-tra-400"
            >
              {site.phone}
            </a>
            <Link
              href="/kontakt"
              className="rounded-lg border border-lin-50/30 px-6 py-3.5 text-center font-medium transition hover:bg-lin-50/10"
            >
              Skicka anmälan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
