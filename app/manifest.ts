import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kabadi Baba",
    short_name: "Kabadi Baba",
    description: "Gorakhpur's Trusted Scrap Dealer",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/icons/kabadi-baba-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/kabadi-baba-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/kabadi-baba-icon-1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
