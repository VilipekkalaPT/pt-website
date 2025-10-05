"use client";

import Link from "next/link";
import Button from "app/components/Button";
import { TypeNavigationFields } from "app/lib/types/contentful";
import { useRouter, usePathname } from "next/navigation";
import cn from "classnames";
import Image from "next/image";
import { AssetFields } from "contentful";
import { getAssetUrl } from "app/utils/utils";
import { localLogoUrl } from "app/utils/routes";

export interface DropdownItem {
  label: string;
  href: string;
  isActive: boolean;
}

interface NavigationItemProps {
  item: TypeNavigationFields;
  pathName: string;
}

interface HeaderProps {
  navigations: TypeNavigationFields[];
  logo?: AssetFields;
}

export default function Header({ navigations, logo }: HeaderProps) {
  const pathname = usePathname();

  const navigationItems = navigations.sort((a, b) => a.order - b.order);

  const logoUrl = logo ? getAssetUrl(logo) : localLogoUrl;

  return (
    <div className="flex justify-between w-[90%] mx-auto py-6 shadow z-50">
      <Link href="/" className="flex">
        <Image src={logoUrl} alt="Logo" width={200} height={200} />
      </Link>
      <div className="flex justify-between items-center">
        {navigationItems.map((item) => (
          <NavigationItem key={item.id} item={item} pathName={pathname} />
        ))}
      </div>
    </div>
  );
}

const NavigationItem = ({ item, pathName }: NavigationItemProps) => {
  const router = useRouter();

  if (item.isButton) {
    return (
      <Button
        key={item.id}
        label={item.label}
        variant="primary"
        onClick={() => router.push(item.url)}
      />
    );
  }

  return (
    <Link
      key={item.id}
      href={item.url || "/"}
      className={cn("py-2 px-4 rounded-lg", {
        "bg-blue text-text-black-30": pathName === item.url,
      })}
    >
      {item.label}
    </Link>
  );
};
