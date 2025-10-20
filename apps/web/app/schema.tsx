export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Tetramanor",
    description:
      "Nigeria's leading real estate company offering premium residential and commercial properties, investment opportunities, and rental solutions.",
    url: "https://tetramanor.com",
    logo: "https://tetramanor.com/full-logo.png",
    image: "https://tetramanor.com/full-logo.png",
    telephone: "+2349166479719",
    email: "info@tetramanor.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
    },
    sameAs: [
      "https://web.facebook.com/share/r/1BG9en1Y2p/",
      "https://www.tiktok.com/@tetramanorltd?_t=ZS-90UKR9fGKXJ&_r=1",
      "https://www.instagram.com/tetramanor.ng?igsh=MWZxODdnN2gwM2p5bQ==",
      "https://www.linkedin.com/company/tetramanor-ltd-/?originalSubdomain=ng",
      "https://www.tiktok.com/@tetramanorltd?_t=ZS-90UKR9fGKXJ&_r=1",
    ],
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Real Estate Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Sales",
            description: "Buy premium residential and commercial properties",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Rentals",
            description: "Find your perfect rental property",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Investment",
            description: "Investment opportunities in real estate",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Management",
            description: "Comprehensive property management services",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tetramanor",
    url: "https://tetramanor.com",
    description:
      "Discover luxury properties, investment opportunities, and rental solutions with Tetramanor.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tetramanor.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
