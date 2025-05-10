"use client";

import Link from "next/link";
import Button from "app/components/Button";
import { TypeNavigationFields } from "app/lib/types/contentful";
import { useRouter } from "next/navigation";

export default function Header({
  navigations,
}: {
  navigations: TypeNavigationFields[];
}) {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 flex w-full p-6 shadow z-50 bg-white">
      <Link href={"/"} className="flex-[1.5] text-3xl font-bold">
        SlayFitVili
      </Link>
      <div className="flex flex-[1] justify-between items-center">
        {navigations
          .toSorted((a, b) => a.order - b.order)
          .map((nav: TypeNavigationFields) => (
            <Link key={nav.id} href={nav.url}>
              {nav.label}
            </Link>
          ))}
        <Button
          label="Book a meeting"
          variant="primary"
          onClick={() => router.push("/contact")}
        />
      </div>
    </div>
  );
}
