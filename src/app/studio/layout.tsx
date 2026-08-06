/** Studio ska ligga för sig själv, utan sajtens sidhuvud och sidfot. */
export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex-1">{children}</div>;
}
