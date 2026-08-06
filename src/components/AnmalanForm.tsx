"use client";

import { useState } from "react";

type Status = "idle" | "skickar" | "klar" | "fel";

export default function AnmalanForm({
  förvaldKurs,
  kurser,
}: {
  förvaldKurs?: string;
  kurser: { slug: string; namn: string }[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [felmeddelande, setFelmeddelande] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("skickar");
    setFelmeddelande("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/anmalan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Något gick fel.");
      }
      setStatus("klar");
    } catch (err) {
      setStatus("fel");
      setFelmeddelande(
        err instanceof Error ? err.message : "Något gick fel. Försök igen."
      );
    }
  }

  if (status === "klar") {
    return (
      <div className="rounded-xl border border-skog-700/30 bg-skog-100 p-6">
        <h3 className="font-display text-xl font-semibold text-skog-900">
          Tack, din anmälan är skickad!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-kol-700">
          Vi hör av oss så snart vi kan. Är det bråttom går det bra att ringa.
        </p>
      </div>
    );
  }

  const fält =
    "mt-1.5 w-full rounded-lg border border-lin-300 bg-white px-3.5 py-2.5 text-[15px] text-kol-900 transition placeholder:text-kol-500/60 focus:border-skog-700 focus:outline-none";
  const etikett = "block text-sm font-medium text-kol-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* honeypot mot skräppost */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Lämna tomt
          <input name="webbplats" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="namn" className={etikett}>
            Namn <span className="text-tra-600">*</span>
          </label>
          <input id="namn" name="namn" required className={fält} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="epost" className={etikett}>
            E-post <span className="text-tra-600">*</span>
          </label>
          <input
            id="epost"
            name="epost"
            type="email"
            required
            className={fält}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="telefon" className={etikett}>
            Telefon
          </label>
          <input id="telefon" name="telefon" type="tel" className={fält} autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="kurs" className={etikett}>
            Kurs <span className="text-tra-600">*</span>
          </label>
          <select
            id="kurs"
            name="kurs"
            required
            defaultValue={förvaldKurs ?? ""}
            className={fält}
          >
            <option value="" disabled>
              Välj kurs
            </option>
            {kurser.map((k) => (
              <option key={k.slug} value={k.namn}>
                {k.namn}
              </option>
            ))}
            <option value="Annat">Annat / vet ej ännu</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tillfalle" className={etikett}>
          Önskat kurstillfälle
        </label>
        <input
          id="tillfalle"
          name="tillfalle"
          placeholder="T.ex. 9–10 maj, Kalix"
          className={fält}
        />
      </div>

      <div>
        <label htmlFor="meddelande" className={etikett}>
          Meddelande
        </label>
        <textarea
          id="meddelande"
          name="meddelande"
          rows={5}
          className={fält}
          placeholder="Förkunskaper, frågor, önskemål …"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-kol-700">
        <input
          type="checkbox"
          name="nyhetsbrev"
          className="mt-0.5 size-4 rounded border-lin-300 accent-skog-700"
        />
        Ja, jag vill få information om kommande kurser.
      </label>

      {status === "fel" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {felmeddelande}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "skickar"}
        className="w-full rounded-lg bg-skog-800 px-6 py-3 font-medium text-lin-50 transition hover:bg-skog-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "skickar" ? "Skickar …" : "Skicka anmälan"}
      </button>

      <p className="text-xs leading-relaxed text-kol-500">
        Uppgifterna används endast för att hantera din anmälan.
      </p>
    </form>
  );
}
