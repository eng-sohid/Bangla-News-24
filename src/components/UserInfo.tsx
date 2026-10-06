"use client";

import Link from "next/link";
import { authClient } from "../lib/auth-client";

const FALLBACK_AVATAR =
  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  // লোড হওয়ার সময় লেআউট যেন লাফিয়ে না ওঠে
  if (isPending) {
    return <div className="h-8 w-28 animate-pulse rounded-full bg-line" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1 text-sm">
        <Link
          href="/sign-in"
          className="rounded-full px-4 py-1.5 font-medium text-ink/80 transition-colors hover:text-brand"
        >
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="rounded-full bg-brand px-4 py-1.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        type="button"
        className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pr-3 pl-1 transition-shadow hover:shadow-md"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={user.name || "User avatar"}
          src={user.image || FALLBACK_AVATAR}
          className="h-7 w-7 rounded-full object-cover ring-2 ring-brand/30"
        />
        <span className="max-w-28 truncate text-sm font-medium">
          {user.name}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 text-muted"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-56 rounded-xl border border-line bg-white p-2 shadow-xl"
      >
        <li className="px-3 py-2">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-muted">{user.email}</p>
        </li>
        <li className="my-1 border-t border-line" />
        <li>
          <Link
            href="/profile"
            className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-paper hover:text-brand"
          >
            আমার প্রোফাইল
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-brand transition-colors hover:bg-red-50"
          >
            সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;
