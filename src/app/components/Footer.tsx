import { AssetFields } from "contentful";
import Image from "next/image";
import { getAssetUrl } from "app/utils/utils";

interface FooterProps {
  logo?: AssetFields;
}

export default function Footer({ logo }: FooterProps) {
  const logoUrl = logo ? getAssetUrl(logo) : "/public/logo.png";

  return (
    <div className="grid grid-cols-4 gap-4 w-full p-6">
      {logo && <Image src={logoUrl} alt="Logo" width={200} height={200} />}
    </div>
  );
}

// function FooterColumn({ column }: { column }) {

//   return (
//     <div className="flex flex-col">
//       <p className="text-lg font-semibold mb-2">{column.columnTitle}</p>
//       {items.map((item: TypeFooterColumnLinkFields) => (
//         <FooterLink key={item.id} item={item} />
//       ))}
//     </div>
//   );
// }

// function FooterLink({ item }: { item: TypeFooterColumnLinkFields }) {
//   const { url, label, description } = item;

//   return (
//     <Link href={url ?? "#"} className="mb-1">
//       {label}
//       {description && `: ${description}`}
//     </Link>
//   );
// }
