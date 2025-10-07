"use client";

import { AssetFields } from "contentful";
import Image from "next/image";
import { capitalizeFirstLetter, getAssetUrl } from "app/utils/utils";
import { FooterLink as FooterLinkType } from "app/lib/types/type";
import Link from "next/link";
import {
  localLogoUrl,
  whatsappDomain,
  instagramDefaultLink,
} from "app/utils/routes";
import { TypeFooterFields } from "app/lib/types/contentful";
import { useCallback, useMemo } from "react";

interface FooterProps {
  logo?: AssetFields;
  footerLinks: TypeFooterFields[];
}

export default function Footer({ logo, footerLinks }: FooterProps) {
  const logoUrl = logo ? getAssetUrl(logo) : localLogoUrl;

  const columns = useMemo(() => {
    return Array.from(new Set(footerLinks?.map((el) => el.column))).reverse();
  }, [footerLinks]);

  const getLinks = useCallback(
    (col: string) => {
      return (
        footerLinks?.filter((link) => link.column === col && link.show) ?? []
      );
    },
    [footerLinks]
  );

  const openWhatsApp = useCallback(() => {
    const whatsappLink = footerLinks.find(
      (link) => link.label.toLowerCase() === "whatsapp"
    )?.description;
    if (!whatsappLink) return;
    const url = `${whatsappDomain}${whatsappLink}`;
    window.open(url, "_blank");
  }, [footerLinks]);

  const openInstagram = useCallback(() => {
    const instagramLink = footerLinks.find(
      (link) => link.label.toLowerCase() === "instagram"
    )?.url;
    const url = instagramLink ?? instagramDefaultLink;
    window.open(url, "_blank");
  }, [footerLinks]);

  return (
    <div className="mt-10 grid grid-cols-4 gap-4 w-[90%] mx-auto mb-40">
      <div className="flex flex-col">
        <Image src={logoUrl} alt="Logo" width={200} height={200} />
        <div className="flex mt-4 gap-4">
          <Image
            src="/whatsapp.svg"
            alt="Logo"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={openWhatsApp}
          />
          <Image
            src="/instagram.svg"
            alt="Logo"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={openInstagram}
          />
        </div>
      </div>
      {columns.map((col: string) => {
        return (
          <div key={col} className="flex flex-col">
            <p className="mb-6 font-medium">{capitalizeFirstLetter(col)}</p>
            {getLinks(col).map((link: FooterLinkType) => (
              <Link
                href={link.url ?? "#"}
                className="mb-3 font-light"
                key={link.label}
              >
                {link.label}
                {link.description && `: ${link.description}`}
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}
