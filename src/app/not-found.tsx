import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center px-4 py-20 text-center sm:py-28">
      <p className="text-xs font-bold tracking-[0.3em] text-muted uppercase">
        এরর
      </p>

      <h1 className="mt-2 font-serif text-[110px] leading-none font-extrabold text-brand sm:text-[180px]">
        ৪০৪
      </h1>

      <div className="my-6 h-1 w-16 rounded bg-ink" />

      <h2 className="font-serif text-2xl font-extrabold sm:text-4xl">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="mt-3 max-w-md text-muted">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে, অথবা লিংকটি ভুল।
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-brand"
      >
        <span aria-hidden="true">←</span> হোমে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFoundPage;
