import Link from "next/link";

import styles from "./Header.module.css";
import { getEntries } from "app/lib/contentful";
import { Navigation, NavigationSkeleton } from "app/lib/types";

export default async function Header() {
  const navigations = await getEntries<NavigationSkeleton>("navigation");

  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>Vili.</h1>
      <div className={styles.navigation}>
        {navigations
          .toSorted((a, b) => a.order - b.order)
          .map((nav: Navigation) => (
            <Link key={nav.id} href={nav.url}>
              {nav.label}
            </Link>
          ))}
        <button className={styles.button}>Book a meeting</button>
      </div>
    </div>
  );
}
