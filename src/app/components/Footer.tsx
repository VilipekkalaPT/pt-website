import Link from "next/link";
import {
  TypeFooterColumnFields,
  TypeFooterColumnLinkFields,
} from "app/lib/types/contentful";

interface FooterProps {
  footerColumns: TypeFooterColumnFields[];
}

export default function Footer({ footerColumns }: FooterProps) {
  const sortedColumns = footerColumns.sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-4 gap-4 w-full p-6">
      <div className="text-3xl font-bold">SlayFitVili</div>
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
