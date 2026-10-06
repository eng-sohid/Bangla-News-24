import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <>
      {/* উপরের পাতলা বার: তারিখ + ইউজার */}
      <div className="border-b border-line bg-white">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-2">
          <span className="text-xs text-muted sm:text-sm">{date}</span>
          <UserInfo />
        </div>
      </div>

      {/* লোগো */}
      <header className="bg-paper">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <Link
            href="/"
            className="mx-auto flex w-fit items-center justify-center gap-3"
          >
            <Image
              className="h-11 w-11 sm:h-14 sm:w-14"
              height={56}
              width={56}
              src="/logo.webp"
              alt="Bangla News 24 লোগো"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-3xl font-extrabold tracking-tight text-brand sm:text-5xl">
                Bangla News 24
              </span>
              <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">
                সত্য • নিরপেক্ষ • সময়োপযোগী
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* স্টিকি ন্যাভিগেশন */}
      <NavLinks />
    </>
  );
};

export default Header;
