export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",

    name: "Kabadi Baba",

    image: "https://www.kabadibaba.com/og-image.jpg",

    "@id": "https://www.kabadibaba.com",

    url: "https://www.kabadibaba.com",

    telephone: "+91-7377788810",

    priceRange: "INR",

    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Ram Janki Nagar, Kaushalpuram, Bashratpur, Behind Haven Palace, Behind Saraswati Lawan",
      addressLocality: "Gorakhpur",
      addressRegion: "Uttar Pradesh",
      postalCode: "273004",
      addressCountry: "IN",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.7606,
      longitude: 83.3732,
    },

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],

    sameAs: [
      "https://www.facebook.com/profile.php?id=61591946377023",
      "https://www.instagram.com/_kabadibaba/",
    ],

    areaServed: {
      "@type": "City",
      name: "Gorakhpur",
    },

    description:
      "Kabadi Baba - Gorakhpur ka trusted scrap dealer, offering doorstep scrap pickup for recyclable materials.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
