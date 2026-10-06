import Image from "next/image";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string | null;
  isLive: boolean;
  link: string;
}

const hrefOf = (n: News) => (n.isLive ? n.link : `/news/${n.id}`);

const linkProps = (n: News) =>
  n.isLive ? { target: "_blank", rel: "noopener noreferrer" } : {};

const LiveBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-white">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
    লাইভ
  </span>
);

const MainNews = ({ news }: { news: News[] }) => {
  if (!news?.length) return null;
  const [firstNews, ...otherNews] = news;

  return (
    <div className="space-y-5">
      {/* হিরো কার্ড: ছবির ওপরেই লেখা */}
      <Link
        href={hrefOf(firstNews)}
        {...linkProps(firstNews)}
        className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-line sm:aspect-[16/9]"
      >
        <Image
          src={firstNews.imageUrl}
          alt={firstNews.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-8">
          <div className="flex items-center gap-2">
            {firstNews.isLive && <LiveBadge />}
            <span className="rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur">
              {firstNews.category}
            </span>
          </div>

          <h2 className="font-serif text-2xl leading-snug font-extrabold text-white sm:text-4xl">
            {firstNews.title}
          </h2>

          <p className="line-clamp-2 hidden max-w-2xl text-white/80 sm:block">
            {firstNews.description}
          </p>

          {firstNews.firstPublished && (
            <span className="text-xs text-white/60">
              {new Date(firstNews.firstPublished).toLocaleDateString("bn-BD", {
                dateStyle: "long",
              })}
            </span>
          )}
        </div>
      </Link>

      {/* ছোট কার্ড: থাম্বনেইল + শিরোনাম */}
      <div className="grid gap-4 sm:grid-cols-2">
        {otherNews.slice(0, 4).map((on) => (
          <Link
            key={on.id}
            href={hrefOf(on)}
            {...linkProps(on)}
            className="card-soft group flex gap-3 p-3"
          >
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-line sm:h-24 sm:w-28">
              <Image
                src={on.imageUrl}
                alt={on.imageAlt}
                fill
                sizes="112px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center gap-1">
              <p className="flex items-center gap-2 text-xs font-bold text-brand">
                {on.isLive && <LiveBadge />}
                {on.category}
              </p>
              <h3 className="line-clamp-3 font-serif text-[15px] leading-snug font-bold transition-colors group-hover:text-brand">
                {on.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
