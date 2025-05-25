import { DropdownMenu } from "radix-ui";
import Link from "next/link";
import cn from "classnames";
import { DropdownItem } from "./Header";

interface DropdownMenuComponentProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  triggerClassName?: string;
  menuClassName?: string;
}

export default function DropdownMenuComponent({
  trigger,
  items,
  triggerClassName,
  menuClassName,
}: DropdownMenuComponentProps) {
  return (
    <DropdownMenu.Root>
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
            <DropdownMenu.Item
              key={item.href}
              className={cn(
                "outline-none hover:bg-gray-100 py-2 px-4 rounded-md",
                {
                  "bg-gray-100": item.isActive,
                }
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
