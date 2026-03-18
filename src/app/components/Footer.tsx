"use client";

import Image from "next/image";
import { capitalizeFirstLetter } from "app/utils/utils";
import { FooterLink as FooterLinkType } from "app/lib/types/type";
import Link from "next/link";
import {
  logoUrl,
  whatsappDomain,
  instagramDefaultLink,
} from "app/utils/routes";
import { TypeFooterFields } from "app/lib/types/contentful";
import { useCallback } from "react";
import cn from "classnames";
import { DIFFERENT_SERVICES_SLAYFITVILI } from "../utils/variables";

interface FooterProps {
  footerLinks: TypeFooterFields[];
}

const COLUMNS = ["contact", "explore", "condition & policy"];

export default function Footer({ footerLinks }: FooterProps) {
  const year = new Date().getFullYear();

  const getLinks = useCallback(
    (col: string) => {
      return (
        footerLinks?.filter((link) => link.column === col && link.show) ?? []
      );
    },
    [footerLinks],
  );

  const openWhatsApp = useCallback(() => {
    const whatsappLink = footerLinks.find(
      (link) => link.label.toLowerCase() === "whatsapp",
    )?.url;
    if (!whatsappLink) return;
    const url = `${whatsappDomain}${whatsappLink}`;
    window.open(url, "_blank");
  }, [footerLinks]);

  const openInstagram = useCallback(() => {
    const instagramLink = footerLinks.find(
      (link) => link.label.toLowerCase() === "instagram",
    )?.url;
    const url = instagramLink ?? instagramDefaultLink;
    window.open(url, "_blank");
  }, [footerLinks]);

  const desktopStyle = "md:grid-cols-4 md:gap-4 md:mx-16 md:text-left";
  const mobileStyle = "grid-cols-1 gap-16 text-center";

  return (
    <div className={cn("mt-8 grid pb-6", desktopStyle, mobileStyle)}>
      <div className="flex flex-col items-center md:items-start">
        <Image
          src={logoUrl}
          alt="Logo"
          width={230}
          height={41}
          className="w-48 h-auto"
        />
        <div className="flex mt-4 gap-4">
          <Image
            src="/whatsapp.svg"
            alt="Whatsapp logo"
            width={24}
            height={25}
            className="cursor-pointer w-auto h-auto"
            onClick={openWhatsApp}
          />
          <Image
            src="/instagram.svg"
            alt="Instagram logo"
            width={25}
            height={25}
            className="cursor-pointer w-auto h-auto"
            onClick={openInstagram}
          />
        </div>
      </div>
      {COLUMNS.map((col: string) => {
        return (
          <div key={col} className="flex flex-col">
            <p className="mb-3 md:mb-6 body-strong">
              {capitalizeFirstLetter(col)}
            </p>
            {getLinks(col).map((link: FooterLinkType) => (
              <Link
                href={link.url ?? "#"}
                className="mb-3 leading-[1.4]"
                key={link.label}
              >
                {link.label}
                {link.description && `: ${link.description}`}
              </Link>
            ))}
          </div>
        );
      })}
      <div className="text-sm pt-20">
        © {year}, <Link href="/">{DIFFERENT_SERVICES_SLAYFITVILI}</Link>
      </div>
    </div>
  );
}
