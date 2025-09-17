import { AssetFields } from "contentful";
import Image from "next/image";
import { getAssetUrl } from "app/utils/utils";
import { FOOTER } from "app/lib/data/footer";
import { FooterColumn, FooterLink as FooterLinkType } from "app/lib/types/type";
import Link from "next/link";
import { localLogoUrl } from "app/utils/routes";

interface FooterProps {
  logo?: AssetFields;
}

export default function Footer({ logo }: FooterProps) {
  const logoUrl = logo ? getAssetUrl(logo) : localLogoUrl;
  const footerColumns = FOOTER.columns;

  return (
    <div className="grid grid-cols-4 gap-4 w-full p-6">
      <Image src={logoUrl} alt="Logo" width={200} height={200} />
      {footerColumns.map((col: FooterColumn) => (
        <div className="flex flex-col" key={col.title}>
          <p className="text-lg font-semibold mb-2">{col.title}</p>
          {col.links.map((link: FooterLinkType) => (
            <Link href={link.url ?? "#"} className="mb-1" key={link.label}>
              {link.label}
              {link.description && `: ${link.description}`}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
