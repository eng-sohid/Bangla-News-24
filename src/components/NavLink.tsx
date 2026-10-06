"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`relative block px-3 py-3 text-[15px] font-semibold transition-colors sm:px-4 ${
        isActive ? "text-brand" : "text-ink/80 hover:text-brand"
      }`}
    >
      {children}
      <span
        className={`absolute inset-x-3 bottom-0 h-0.5 origin-left bg-brand transition-transform duration-300 sm:inset-x-4 ${
          isActive ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </Link>
  );
};

export default NavLink;
