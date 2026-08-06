import "server-only";

import { hamtaClient } from "../../sanity/lib/client";
import { bildUrl } from "../../sanity/lib/image";
import {
  kurserQuery,
  sidinstallningarQuery,
  startsidaQuery,
} from "../../sanity/lib/queries";

import { kurser as kurserFallback, type Kurs, type Tillfalle } from "@/data/kurser";
import { galleri as galleriFallback, videos as videosFallback } from "@/data/media";
import {
  site as siteFallback,
  sociala as socialaFallback,
  type Site,
  type SocialKanal,
} from "@/data/site";

import type { GalleriBild, NavPost, Video } from "@/lib/typer";

export type { Kurs, Tillfalle, Site, SocialKanal };
export type { GalleriBild, NavPost, Video };

export type Startsida = {
  rubrik?: string;
  ingress?: string;
  heroBild?: string;
  galleri: GalleriBild[];
  videor: Video[];
};

/**
 * Hur ofta sajten frågar Sanity efter nytt innehåll (sekunder).
 * Publicerar Ola en ändring syns den inom en minut även utan webhook.
 */
const REVALIDERA = 60;

type SanityBild = { asset?: { _ref?: string }; alt?: string };

/** Bild-URL från ett Sanity-bildfält, eller undefined om bilden saknas. */
function bildFran(bild: SanityBild | undefined, bredd: number) {
  const ref = bild?.asset?._ref;
  if (!ref) return undefined;
  return bildUrl({ asset: { _ref: ref } }, bredd);
}

type RaKurs = Omit<Kurs, "tillfallen" | "bild" | "brodtext" | "pris"> & {
  bild?: SanityBild;
  brodtext?: string;
  prisText?: string;
  visaINavigering?: boolean;
  tillfallen?: {
    startDatum?: string;
    slutDatum?: string;
    ort?: string;
    pris?: number;
    status?: Tillfalle["status"];
    anmalanUrl?: string;
  }[];
};

async function fraga<T>(query: string): Promise<T | null> {
  const client = hamtaClient();
  if (!client) return null;
  try {
    return await client.fetch<T>(query, {}, { next: { revalidate: REVALIDERA } });
  } catch (error) {
    // Hellre en sajt på reservinnehåll än en sajt som ligger nere.
    console.error("Kunde inte hämta innehåll från Sanity:", error);
    return null;
  }
}

/* ---------- formatering ---------- */

const manad = new Intl.DateTimeFormat("sv-SE", { month: "long" });

function dag(iso: string) {
  return new Date(`${iso}T12:00:00Z`).getUTCDate();
}

/** "9–10 maj 2027", "28 maj – 2 juni 2027" eller "9 maj 2027". */
export function formateraPeriod(start: string, slut?: string): string {
  const s = new Date(`${start}T12:00:00Z`);
  const ar = s.getUTCFullYear();

  if (!slut || slut === start) {
    return `${dag(start)} ${manad.format(s)} ${ar}`;
  }

  const e = new Date(`${slut}T12:00:00Z`);
  if (s.getUTCMonth() === e.getUTCMonth() && ar === e.getUTCFullYear()) {
    return `${dag(start)}–${dag(slut)} ${manad.format(s)} ${ar}`;
  }
  return `${dag(start)} ${manad.format(s)} – ${dag(slut)} ${manad.format(e)} ${e.getUTCFullYear()}`;
}

/** 5500 → "5 500 kr" */
export function formateraPris(kronor: number): string {
  return `${new Intl.NumberFormat("sv-SE").format(kronor)} kr`;
}

/** Dagens datum som YYYY-MM-DD, för att gallra passerade tillfällen. */
function idag() {
  return new Date().toISOString().slice(0, 10);
}

function styckenAv(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ---------- kurser ---------- */

function omvandlaKurs(rad: RaKurs): Kurs {
  const dagensDatum = idag();

  const tillfallen: Tillfalle[] = (rad.tillfallen ?? [])
    .filter((t) => t.startDatum && (t.slutDatum ?? t.startDatum) >= dagensDatum)
    .sort((a, b) => (a.startDatum ?? "").localeCompare(b.startDatum ?? ""))
    .map((t) => ({
      datum: formateraPeriod(t.startDatum!, t.slutDatum),
      startDatum: t.startDatum,
      ort: t.ort ?? "",
      pris: typeof t.pris === "number" ? formateraPris(t.pris) : undefined,
      anmalanUrl: t.anmalanUrl,
      status: t.status,
    }));

  const forstaPris = tillfallen.find((t) => t.pris)?.pris;

  return {
    slug: rad.slug,
    namn: rad.namn,
    kort: rad.kort ?? "",
    ingress: rad.ingress ?? "",
    brodtext: styckenAv(rad.brodtext),
    langd: rad.langd ?? "",
    plats: rad.plats ?? "",
    pris: rad.prisText || forstaPris || "Kontakta för offert",
    innehall: rad.innehall ?? [],
    forkunskaper: rad.forkunskaper ?? "",
    taMed: rad.taMed ?? [],
    bild: bildFran(rad.bild, 1600),
    bildAlt: rad.bild?.alt,
    tillfallen,
    externAnmalan: rad.externAnmalan,
    lankar: rad.lankar,
    visaINavigering: rad.visaINavigering !== false,
  };
}

export async function hamtaKurser(): Promise<Kurs[]> {
  const rader = await fraga<RaKurs[]>(kurserQuery);
  if (!rader || rader.length === 0) return kurserFallback;
  return rader.map(omvandlaKurs);
}

export async function hamtaKurs(slug: string): Promise<Kurs | undefined> {
  const alla = await hamtaKurser();
  return alla.find((k) => k.slug === slug);
}

export async function hamtaTillfallen() {
  const alla = await hamtaKurser();
  return alla
    .flatMap((k) => k.tillfallen.map((t) => ({ ...t, kurs: k.namn, slug: k.slug })))
    .sort((a, b) => (a.startDatum ?? "").localeCompare(b.startDatum ?? ""));
}

export async function hamtaNav(): Promise<NavPost[]> {
  const alla = await hamtaKurser();
  return alla
    .filter((k) => k.visaINavigering !== false)
    .map((k) => ({ href: `/kurser/${k.slug}`, label: k.namn }));
}

/* ---------- sidinställningar ---------- */

type RaSite = {
  namn?: string;
  tagline?: string;
  beskrivning?: string;
  telefon?: string;
  telefonHref?: string;
  epost?: string;
  ort?: string;
  adress?: string;
  orgNr?: string;
  sociala?: SocialKanal[];
};

export async function hamtaSite(): Promise<Site> {
  const rad = await fraga<RaSite | null>(sidinstallningarQuery);
  if (!rad) return siteFallback;

  return {
    ...siteFallback,
    name: rad.namn || siteFallback.name,
    tagline: rad.tagline || siteFallback.tagline,
    description: rad.beskrivning || siteFallback.description,
    phone: rad.telefon || siteFallback.phone,
    phoneHref: rad.telefonHref || siteFallback.phoneHref,
    email: rad.epost || siteFallback.email,
    orgNr: rad.orgNr || siteFallback.orgNr,
    address: {
      line1: rad.adress || siteFallback.address.line1,
      city: rad.ort || siteFallback.address.city,
      country: siteFallback.address.country,
    },
  };
}

export async function hamtaSociala(): Promise<SocialKanal[]> {
  const rad = await fraga<RaSite | null>(sidinstallningarQuery);
  if (!rad?.sociala?.length) return socialaFallback;
  return rad.sociala;
}

/* ---------- startsidan ---------- */

type RaStartsida = {
  rubrik?: string;
  ingress?: string;
  heroBild?: SanityBild;
  galleri?: SanityBild[];
  videor?: { youtubeId?: string; titel?: string; kalla?: string }[];
};

/** Plockar ut video-ID:t ur en YouTube-länk, eller returnerar ID:t som det är. */
export function youtubeId(input: string): string {
  const match = input.match(
    /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : input.trim();
}

export async function hamtaStartsida(): Promise<Startsida> {
  const rad = await fraga<RaStartsida | null>(startsidaQuery);

  if (!rad) {
    return {
      galleri: galleriFallback,
      videor: videosFallback,
    };
  }

  return {
    rubrik: rad.rubrik,
    ingress: rad.ingress,
    heroBild: bildFran(rad.heroBild, 2000),
    galleri: (rad.galleri ?? [])
      .map((b) => ({ src: bildFran(b, 1200), alt: b.alt ?? "" }))
      .filter((b): b is GalleriBild => Boolean(b.src)),
    videor: (rad.videor ?? [])
      .filter((v) => v.youtubeId && v.titel)
      .map((v) => ({
        id: youtubeId(v.youtubeId!),
        titel: v.titel!,
        kalla: v.kalla,
      })),
  };
}
