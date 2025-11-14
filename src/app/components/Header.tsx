"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "app/components/Button";
import { TypeNavigationFields } from "app/lib/types/contentful";
import { useRouter, usePathname } from "next/navigation";
import cn from "classnames";
import Image from "next/image";
import { AssetFields } from "contentful";
import { getAssetUrl } from "app/utils/utils";
import { localLogoUrl } from "app/utils/routes";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";

export interface DropdownItem {
  label: string;
  href: string;
  isActive: boolean;
}

interface NavigationItemProps {
  item: TypeNavigationFields;
  pathName: string;
  onToggle?: (isOpen: boolean) => void;
}

interface HeaderProps {
  navigations: TypeNavigationFields[];
  logo?: AssetFields;
}

export default function Header({ navigations, logo }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = navigations.sort((a, b) => a.order - b.order);

  const logoUrl = logo ? getAssetUrl(logo) : localLogoUrl;

  return (
    <div className="flex items-center justify-between mx-4 md:mx-8 py-6 shadow z-50 font-normal">
      <Link href="/" className="flex items-center">
        <Image src={logoUrl} alt="Logo" width={200} height={200} />
      </Link>
      <MobileMenuToggle
        isOpen={isOpen}
        onToggle={(openValue) => setIsOpen(openValue)}
      />
      <DesktopNavigation
        navigationItems={navigationItems}
        pathName={pathname}
      />
      <MobileNavigation
        navigationItems={navigationItems}
        pathName={pathname}
        isOpen={isOpen}
        onToggle={(openValue) => setIsOpen(openValue)}
      />
    </div>
  );
}

const DesktopNavigation = ({
  navigationItems,
  pathName,
}: {
  navigationItems: TypeNavigationFields[];
  pathName: string;
}) => (
  <nav className="hidden md:flex justify-between items-center space-x-2">
    {navigationItems.map((item) => (
      <NavigationItem key={item.id} item={item} pathName={pathName} />
    ))}
  </nav>
);

const MobileNavigation = ({
  navigationItems,
  pathName,
  isOpen,
  onToggle,
}: {
  navigationItems: TypeNavigationFields[];
  pathName: string;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}) => {
  const drawerStyle = cn(
    "md:hidden fixed top-0 bottom-0 right-0 w-80 max-w-[80vw]",
    "bg-primary/80 backdrop-blur-lg border-l border-border-default-primary",
    "z-30 flex flex-col p-4",
    "transform transition-transform duration-300 ease-out",
    {
      "translate-x-full": !isOpen,
      "translate-x-0": isOpen,
    }
  );
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => onToggle(false)}
          aria-label="Close navigation menu"
        />
      )}
      <nav className={drawerStyle} role="dialog" aria-modal="true">
        <MobileMenuToggle isOpen={isOpen} onToggle={onToggle} />
        <div className="flex flex-col gap-4 items-start">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              pathName={pathName}
              onToggle={onToggle}
            />
          ))}
        </div>
      </nav>
    </>
  );
};

const NavigationItem = ({ item, pathName, onToggle }: NavigationItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onToggle) {
      onToggle(false);
    }
    router.push(item.url || "/");
  };

  if (item.isButton) {
    return (
      <Button
        key={item.id}
        label={item.label}
        variant="primary"
        onClick={handleClick}
      />
    );
  }

  return (
    <Link
      key={item.id}
      href={item.url || "/"}
      className={cn("py-2 px-4 rounded-lg hover:bg-blue-hover", {
        "bg-blue text-text-black-30": pathName.includes(item.url),
      })}
      onClick={onToggle ? () => onToggle(false) : undefined}
    >
      {item.label}
    </Link>
  );
};

const MobileMenuToggle = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}) => {
  const iconStyle = "size-8 stroke-[1.6]";

  const handleClick = () => {
    if (isOpen) {
      onToggle(false);
    } else {
      onToggle(true);
    }
  };

  return (
    <IconButton
      className={cn("md:hidden transition-transform", {
        "self-end": isOpen,
      })}
      variant="ghost"
      onClick={handleClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      icon={
        isOpen ? (
          <XMarkIcon className={iconStyle} />
        ) : (
          <Bars3Icon className={iconStyle} />
        )
      }
    />
  );
};
