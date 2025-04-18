"use client";

import Link from "next/link";
import { NavigationSkeleton } from "app/lib/types";
import Button from "app/components/Button";

type Navigation = NavigationSkeleton["fields"];

export default function Header({ navigations }: { navigations: Navigation[] }) {
  return (
    <div className="flex w-full p-6">
      <p className="flex-[1.5] text-3xl font-bold">SlayFitVili</p>
      <div className="flex flex-[1] justify-between items-center">
        {navigations
          .toSorted((a, b) => a.order - b.order)
          .map((nav: Navigation) => (
            <Link key={nav.id} href={nav.url}>
              {nav.label}
            </Link>
          ))}
        <Button label="Book a meeting" type="primary" onClick={() => {}} />
      </div>
    </div>
  );
}
