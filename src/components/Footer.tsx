import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear().toLocaleString("bn-BD", {
    useGrouping: false,
  });

  return (
    <footer className="mt-16 bg-ink text-neutral-300">
      <div className="h-1 bg-brand" />

      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-10 text-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="Bangla News 24"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="font-serif text-2xl font-extrabold text-white">
            Bangla News 24
          </span>
        </Link>

        <p className="max-w-md text-sm text-neutral-400">
          সত্য, নিরপেক্ষ ও সময়োপযোগী খবর পৌঁছে দেওয়াই আমাদের লক্ষ্য।
        </p>

        <div className="mt-2 w-full border-t border-white/10 pt-5 text-xs text-neutral-500">
          © {year} Bangla News 24। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
