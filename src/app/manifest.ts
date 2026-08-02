import type { MetadataRoute } from "next";

import { getSiteSettingAction } from "@/app/actions/settings";
import { COMPANY_NAME, SHORT_DESC } from "@/lib/constants";

interface ManifestConfig {
  name?: string;
  shortName?: string;
  description?: string;
  backgroundColor?: string;
  themeColor?: string;
}

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // Fetch dynamic settings from database
  const res = await getSiteSettingAction("manifest_config");
  const config = (res.success && res.data ? res.data : {}) as ManifestConfig;

  const name = config.name || COMPANY_NAME;
  const shortName = config.shortName || COMPANY_NAME;
  const description = config.description || SHORT_DESC;
  const backgroundColor = config.backgroundColor || "#09090b";
  const themeColor = config.themeColor || "#3b82f6";

  return {
    name,
    short_name: shortName,
    description,
    start_url: "/",
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
