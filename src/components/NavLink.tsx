"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-colors hover:text-red-700 ${
        isActive ? "font-bold text-red-700" : "text-neutral-700"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
