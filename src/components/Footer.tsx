import Link from "next/link";
import type { Site, SocialKanal } from "@/data/site";
import type { NavPost } from "@/lib/typer";
import SocialLank from "./SocialLank";

export default function Footer({
  site,
  nav,
  sociala,
}: {
  site: Site;
  nav: NavPost[];
  sociala: SocialKanal[];
}) {
  return (
    <footer className="mt-24 border-t border-skog-800/40 bg-skog-950 text-lin-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-lin-50">
            {site.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-lin-300">
            {site.tagline}. Kurser i Norrbotten och på plats efter
            överenskommelse.
          </p>
          {sociala.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {sociala.map((s) => (
                <li key={s.url}>
                  <SocialLank url={s.url} namn={s.namn} typ={s.typ} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-tra-400">
            Kurser
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-tra-400">
            Kontakt
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`tel:${site.phoneHref}`} className="transition hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="pt-2 text-lin-300">
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.country}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-tra-400">
            Mer
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/om" className="transition hover:text-white">
                Om Norrhed Skog
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="transition hover:text-white">
                Kontakt och anmälan
              </Link>
            </li>
            <li>
              <a
                href="https://www.sv.se"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Studieförbundet Vuxenskolan
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-skog-800/40 px-5 py-6">
        <p className="mx-auto max-w-6xl text-xs text-lin-300">
          © {new Date().getFullYear()} {site.owner}. Alla rättigheter förbehållna.
        </p>
      </div>
    </footer>
  );
}
