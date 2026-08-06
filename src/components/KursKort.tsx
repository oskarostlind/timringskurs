import Link from "next/link";
import type { Kurs } from "@/data/kurser";
import Media from "./Media";

export default function KursKort({ kurs }: { kurs: Kurs }) {
  const antal = kurs.tillfallen.length;

  return (
    <Link
      href={`/kurser/${kurs.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-lin-200 bg-white transition hover:-translate-y-0.5 hover:border-skog-700/40 hover:shadow-lg hover:shadow-skog-900/5"
    >
      <Media
        src={kurs.bild}
        alt={kurs.namn}
        label={kurs.namn}
        className="aspect-[4/3] w-full"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-skog-900">
          {kurs.namn}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-kol-700">
          {kurs.kort}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-lin-200 pt-4 text-sm">
          <span className="text-kol-500">
            {antal > 0
              ? `${antal} ${antal === 1 ? "tillfälle" : "tillfällen"}`
              : "Bokas på förfrågan"}
          </span>
          <span className="font-medium text-skog-700 transition group-hover:text-skog-600">
            Läs mer →
          </span>
        </div>
      </div>
    </Link>
  );
}
