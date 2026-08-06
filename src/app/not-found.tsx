import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-5 py-28">
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
    </div>
  );
}
