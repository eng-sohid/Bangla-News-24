import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="container mx-auto px-4 py-4">
      <div className="flex flex-col gap-3 sm:relative sm:items-center">
        {/* সাইন ইন / সাইন আপ: মোবাইলে উপরে ডানে, ডেস্কটপে কোণায় */}
        <div className="flex items-center justify-end gap-2 text-sm sm:absolute sm:right-0 sm:top-0">
          <button className="rounded px-3 py-1.5 text-neutral-700 transition-colors hover:text-red-700">
            সাইন ইন
          </button>
          <button className="rounded bg-red-700 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-red-800">
            সাইন আপ
          </button>
        </div>

        {/* লোগো ও নাম */}
        <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-3">
          <Image
            className="h-10 w-10"
            height={50}
            width={50}
            src="/logo.webp"
            alt="Logo"
            priority
          />
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-2xl font-bold text-red-700 sm:text-3xl">
              Bangla News 24
            </span>
            <span className="text-xs text-neutral-500 sm:text-sm">{date}</span>
          </div>
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
