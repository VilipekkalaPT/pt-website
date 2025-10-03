import { ROUTES } from "app/utils/routes";
import { Footer } from "../types/type";

export const FOOTER: Footer = {
  columns: [
    {
      title: "Contact",
      links: [
        { label: "Email", description: "vili.pekkala3011@gmail.com" },
        { label: "Hotline", description: "044 9764986" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Solo packages", url: `${ROUTES.PRICING}/solo-packages` },
        { label: "Duo packages", url: `${ROUTES.PRICING}/duo-packages` },
        { label: "Client spotlights", url: ROUTES.CLIENT_SPOTLIGHTS },
        { label: "About", url: ROUTES.ABOUT },
        { label: "FAQs", url: ROUTES.FAQs },
      ],
    },
    {
      title: "Conditions & Policies",
      links: [
        { label: "Terms & Conditions", url: ROUTES.TERMS_AND_CONDITIONS },
      ],
    },
  ],
};
