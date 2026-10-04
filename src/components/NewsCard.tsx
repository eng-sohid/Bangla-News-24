import Image from "next/image";
import Link from "next/link";

interface News {
  title: string;
  id: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  isLive?: boolean;
  link?: string;
}

const NewsCard = ({ news }: { news: News }) => {
  const isLive = news.isLive && news.link;

  return (
    <Link
      href={isLive ? news.link! : `/news/${news.id}`}
      target={isLive ? "_blank" : undefined}
      rel={isLive ? "noopener noreferrer" : undefined}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-sm font-semibold text-red-700">
          {isLive && <span className="mr-1">● লাইভ</span>}
          {news.category}
        </p>
        <h2 className="text-lg font-bold leading-snug group-hover:text-red-700">
          {news.title}
        </h2>
        <p className="line-clamp-3 text-sm text-neutral-600">
          {news.description}
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
