type Props = {
  url: string;
  namn: string;
  typ?: "facebook" | "youtube" | "instagram";
  variant?: "footer" | "kort";
  beskrivning?: string;
};

function Ikon({ typ }: { typ: Props["typ"] }) {
  if (typ === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    );
  }
  if (typ === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0" aria-hidden>
        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2Zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm8.4-11.2a1.5 1.5 0 1 1-3.1 0 1.5 1.5 0 0 1 3.1 0Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export default function SocialLank({
  url,
  namn,
  typ = "facebook",
  variant = "footer",
  beskrivning,
}: Props) {
  if (variant === "kort") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3.5 rounded-xl border border-lin-200 bg-white p-5 transition hover:border-skog-700/40 hover:shadow-sm"
      >
        <span className="mt-0.5 text-skog-700">
          <Ikon typ={typ} />
        </span>
        <span className="min-w-0">
          <span className="block font-medium text-skog-900">{namn}</span>
          {beskrivning && (
            <span className="mt-1 block text-sm leading-relaxed text-kol-700">
              {beskrivning}
            </span>
          )}
        </span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 text-sm transition hover:text-white"
    >
      <Ikon typ={typ} />
      {namn}
    </a>
  );
}
