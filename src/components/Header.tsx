"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-skog-800/40 bg-skog-900 text-lin-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {site.name}
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-skog-100/70">
            Kurser i skog och hantverk
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-skog-100 transition hover:bg-skog-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="ml-2 rounded-md bg-tra-500 px-4 py-2 text-sm font-medium text-skog-950 transition hover:bg-tra-400"
          >
            Anmäl dig
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Meny"
          className="rounded-md border border-skog-100/25 p-2 lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-skog-800/60 bg-skog-900 px-5 pb-5 lg:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-skog-100 transition hover:bg-skog-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                className="block rounded-md bg-tra-500 px-3 py-2.5 text-center font-medium text-skog-950"
              >
                Anmäl dig
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
