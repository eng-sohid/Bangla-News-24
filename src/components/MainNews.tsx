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

const MainNews = ({ news }: { news: News[] }) => {
  if (!news?.length) return null;
  const [firstNews, ...otherNews] = news;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* বড় কার্ড */}
      <Link
        href={hrefOf(firstNews)}
        target={firstNews.isLive ? "_blank" : undefined}
        rel={firstNews.isLive ? "noopener noreferrer" : undefined}
        className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <Image
            src={firstNews.imageUrl}
            alt={firstNews.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 30vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-sm font-semibold text-red-700">
            {firstNews.isLive && <span className="mr-1">● লাইভ</span>}
            {firstNews.category}
          </p>
          <h2 className="text-2xl font-bold leading-snug group-hover:text-red-700">
            {firstNews.title}
          </h2>
          <p className="line-clamp-3 text-neutral-600">
            {firstNews.description}
          </p>
          {firstNews.firstPublished && (
            <span className="mt-auto text-xs text-neutral-400">
              {new Date(firstNews.firstPublished).toLocaleDateString("bn-BD", {
                dateStyle: "long",
              })}
            </span>
          )}
        </div>
      </Link>

      {/* ছোট কার্ডের তালিকা */}
      <div className="flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white">
        {otherNews.slice(0, 4).map((on) => (
          <Link
            key={on.id}
            href={hrefOf(on)}
            target={on.isLive ? "_blank" : undefined}
            rel={on.isLive ? "noopener noreferrer" : undefined}
            className="group flex flex-1 flex-col justify-center gap-1 p-4"
          >
            <p className="text-xs font-semibold text-red-700">
              {on.isLive && <span className="mr-1">● লাইভ</span>}
              {on.category}
            </p>
            <h3 className="font-medium leading-snug group-hover:text-red-700">
              {on.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
