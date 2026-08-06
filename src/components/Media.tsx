import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Bildyta som faller tillbaka på en dekorativ platshållare när src saknas.
 * Lägg riktiga bilder i /public/bilder och sätt `src` i src/data/kurser.ts.
 */
export default function Media({
  src,
  alt,
  label,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-skog-900 ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-skog-800 ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(216,161,99,0.22) 0px, rgba(216,161,99,0.22) 2px, transparent 2px, transparent 13px), repeating-linear-gradient(115deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 34px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-skog-900/70 via-transparent to-skog-950/80"
      />
      {label && (
        <div className="absolute inset-0 flex items-end p-5">
          <span className="font-display text-sm text-lin-100/75">{label}</span>
        </div>
      )}
    </div>
  );
}
