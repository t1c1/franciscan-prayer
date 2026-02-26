import type { Metadata } from "next";

const BASE_URL = "https://franciscanprayer.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export function createPageMetadata(overrides: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const title = overrides.title || "Franciscan Prayer";
  const ogTitle = overrides.title
    ? `${overrides.title} | Franciscan Prayer`
    : "Franciscan Prayer — The Hours. The Rule. The Gospel.";
  const description =
    overrides.description ||
    "A simple companion for daily Franciscan prayer. The Liturgy of the Hours, the Franciscan Crown, Stations of the Cross, and the Rule of St. Francis.";
  const url = overrides.path ? `${BASE_URL}${overrides.path}` : BASE_URL;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: "Franciscan Prayer",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Franciscan Prayer — The Hours. The Rule. The Gospel.",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE],
      creator: "@franciscanprayer",
    },
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": "Franciscan Prayer",
    },
  };
}
