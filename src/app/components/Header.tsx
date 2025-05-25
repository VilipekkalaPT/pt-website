"use client";

import Link from "next/link";
import Button from "app/components/Button";
import { TypeNavigationFields } from "app/lib/types/contentful";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import DropdownMenuComponent from "./DropdownMenu";
import cn from "classnames";

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
}

export default function Header({ navigations }: HeaderProps) {
  const pathname = usePathname();

  const mainNavigationItems = navigations
    .filter((nav) => !nav.isChild)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="fixed top-0 left-0 flex justify-between w-full px-12 py-6 shadow z-50 bg-white">
      <Link href="/" className="text-3xl font-bold">
        SlayFitVili
      </Link>
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
    console.log(item);
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
        triggerClassName="hover:bg-gray-100 rounded-md bg-gray-100"
        menuClassName="w-[220px] h-[200px] ml-3 py-4 px-2"
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
