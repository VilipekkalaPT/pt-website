"use client";

import { DropdownMenu } from "radix-ui";
import Link from "next/link";
import cn from "classnames";
import { DropdownItem } from "./Header";
import { useState } from "react";
import Divider from "./Divider";

interface DropdownMenuComponentProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  additionalItems?: DropdownItem[];
  triggerClassName?: string;
  menuClassName?: string;
}

export default function DropdownMenuComponent({
  trigger,
  items,
  additionalItems,
  triggerClassName,
  menuClassName,
}: DropdownMenuComponentProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild className={triggerClassName}>
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            "flex flex-col justify-between rounded-md bg-white shadow-lg z-99 border border-gray-200",
            menuClassName
          )}
          align="start"
        >
          {items.map((item) => (
            <DropdownItemComponent
              key={item.label}
              item={item}
              onClick={() => setOpen(false)}
            />
          ))}
          {additionalItems && additionalItems.length > 0 && (
            <>
              <Divider className="my-0" />
              {additionalItems.map((item) => (
                <DropdownItemComponent
                  key={item.label}
                  item={item}
                  onClick={() => setOpen(false)}
                />
              ))}
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const DropdownItemComponent = ({
  item,
  onClick,
}: {
  item: DropdownItem;
  onClick: () => void;
}) => {
  return (
    <DropdownMenu.Item
      key={item.href}
      className={cn("outline-none hover:bg-gray-100 py-2 px-4 rounded-md", {
        "bg-gray-100": item.isActive,
      })}
      onClick={onClick}
    >
      <Link href={item.href}>{item.label}</Link>
    </DropdownMenu.Item>
  );
};
