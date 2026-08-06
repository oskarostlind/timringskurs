import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { hamtaNav, hamtaSite, hamtaSociala } from "@/lib/innehall";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [site, nav, sociala] = await Promise.all([
    hamtaSite(),
    hamtaNav(),
    hamtaSociala(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressCountry: "SE",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-skog-900 focus:px-4 focus:py-2 focus:text-lin-50"
      >
        Hoppa till innehåll
      </a>
      <Header site={site} nav={nav} />
      <main id="innehall" className="flex-1">
        {children}
      </main>
      <Footer site={site} nav={nav} sociala={sociala} />
    </>
  );
}
