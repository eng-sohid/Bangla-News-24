import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className=" relative container mx-auto  py-4">
      <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2 ">
        <Image
          className="w-10 h-10"
          height={50}
          width={50}
          src="/logo.webp"
          alt="Logo"
        />
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-red-700 font-bold text-2xl">
            Bangla News 24
          </span>
          <span className="text-x5 text-neutral-500">{date}</span>
        </div>
      </div>
      <div className="flex gap-3 text-sm items-center top-4 right-4 absolute">
        <button className="btn btn-ghost text-neutral-700 transition-colors hover:text-red-700">
          সাইন ইন{" "}
        </button>
        <button className="btn bg-red-700 px-3 py-1.5 font-semibold text-white transform-colors hover:bg-red-700">
          সাইন আপ{" "}
        </button>
      </div>
      <NavLinks />
    </div>
  );
};

export default Header;
