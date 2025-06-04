"use client";

import Link from "next/link";
import Button from "app/components/Button";
import { TypeNavigationFields } from "app/lib/types/contentful";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import DropdownMenuComponent from "./DropdownMenu";
import cn from "classnames";
import { PRICING_COMPARE } from "app/utils/routes";
import Image from "next/image";
import { AssetFields } from "contentful";
import { getAssetUrl } from "app/utils/utils";

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

  const mainNavigationItems = navigations
    .filter((nav) => !nav.isChild)
    .sort((a, b) => a.order - b.order);

  const logoUrl = logo ? getAssetUrl(logo) : "/public/logo.png";

  return (
    <div className="flex justify-between w-full px-12 py-2 shadow z-50 bg-white">
      {logo && (
        <Link href="/" className="flex">
          <Image src={logoUrl} alt="Logo" width={200} height={200} />
        </Link>
      )}
      <div className="flex justify-between items-center">
        {mainNavigationItems.map((item) => (
          <NavigationItem key={item.id} item={item} pathName={pathname} />
        ))}
      </div>
    </div>
  );
}

const NavigationItem = ({ item, pathName }: NavigationItemProps) => {
  const router = useRouter();
  const additionalItems: DropdownItem[] = [
    {
      ...PRICING_COMPARE,
      isActive: pathName === PRICING_COMPARE.href,
    },
  ];

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

  if (item.children) {
    const childItems = item.children.map(
      (child) => child.fields
    ) as TypeNavigationFields[];

    return (
      <DropdownMenuComponent
        key={item.id}
        trigger={
          <Button
            variant="ghost"
            label={item.label}
            iconRight={<ChevronDownIcon className="size-4 -ml-1" />}
            className={
              pathName.startsWith(item.url) ? "bg-gray-100" : "bg-white"
            }
          />
        }
        items={createDropdownItems(childItems, pathName)}
        additionalItems={additionalItems}
        triggerClassName="hover:bg-gray-100 rounded-md bg-gray-100"
        menuClassName="w-[220px] h-[240px] py-4 px-4"
      />
    );
  }

  return (
    <Link
      key={item.id}
      href={item.url || "/"}
      className={cn("py-2 px-4 width-fit- hover:bg-gray-100 rounded-lg", {
        "bg-gray-100": pathName === item.url,
      })}
    >
      {item.label}
    </Link>
  );
};

const createDropdownItems = (
  children: TypeNavigationFields[],
  pathName: string
): DropdownItem[] => {
  return children.map((child) => ({
    label: child.label,
    href: child.url,
    isActive: pathName === child.url,
  }));
};
