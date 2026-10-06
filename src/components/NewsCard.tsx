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
      className="card-soft group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-line">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isLive && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-white shadow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            লাইভ
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-bold tracking-wide text-brand">
          {news.category}
        </p>
        <h3 className="font-serif text-lg leading-snug font-bold transition-colors group-hover:text-brand">
          {news.title}
        </h3>
        <p className="line-clamp-3 text-sm text-muted">{news.description}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
