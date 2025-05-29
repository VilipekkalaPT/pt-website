import Link from "next/link";
import {
  TypeFooterColumnFields,
  TypeFooterColumnLinkFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import Image from "next/image";
import { getAssetUrl } from "app/utils/utils";

interface FooterProps {
  footerColumns: TypeFooterColumnFields[];
  logo?: AssetFields;
}

export default function Footer({ footerColumns, logo }: FooterProps) {
  const sortedColumns = footerColumns.sort((a, b) => a.order - b.order);

  const logoUrl = logo ? getAssetUrl(logo) : "/public/logo.png";

  return (
    <div className="grid grid-cols-4 gap-4 w-full p-6">
      {logo && <Image src={logoUrl} alt="Logo" width={200} height={200} />}
      {sortedColumns.map((column) => (
        <FooterColumn key={column.id} column={column} />
      ))}
    </div>
  );
}

function FooterColumn({ column }: { column: TypeFooterColumnFields }) {
  const items = column.items.map(
    (item) => item.fields
  ) as unknown as TypeFooterColumnLinkFields[];

  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold mb-2">{column.columnTitle}</p>
      {items.map((item: TypeFooterColumnLinkFields) => (
        <FooterLink key={item.id} item={item} />
      ))}
    </div>
  );
}

function FooterLink({ item }: { item: TypeFooterColumnLinkFields }) {
  const { url, label, description } = item;

  return (
    <Link href={url ?? "#"} className="mb-1">
      {label}
      {description && `: ${description}`}
    </Link>
  );
}
