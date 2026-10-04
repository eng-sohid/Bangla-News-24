import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Article {
  title: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
  text?: string;
  firstPublished?: string | null;
  source?: string;
}

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  let news: Article | null = null;
  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/article/${newsId}`,
      { signal: AbortSignal.timeout(15000) },
    );
    const data = await res.json();
    news = data.data ?? null;
  } catch (e) {
    console.error("Article fetch failed:", e);
  }

  if (!news) notFound();

  const date = news.firstPublished
    ? new Date(news.firstPublished).toLocaleDateString("bn-BD", {
        dateStyle: "long",
      })
    : null;

  // টেক্সটকে প্যারাগ্রাফে ভাগ করা
  const paragraphs = (news.text ?? "").split(/\n+/).filter(Boolean);

  return (
    <article className="container mx-auto mt-8 mb-16 max-w-3xl px-4">
      <Link href="/" className="text-sm text-red-700 hover:underline">
        ← হোমে ফিরে যান
      </Link>

      {news.category && (
        <p className="mt-4 text-sm font-semibold text-red-700">
          {news.category}
        </p>
      )}

      <h1 className="mt-2 text-3xl font-bold leading-snug sm:text-4xl">
        {news.title}
      </h1>

      <div className="mt-3 flex gap-3 text-sm text-neutral-500">
        {news.source && <span>{news.source}</span>}
        {date && <span>{date}</span>}
      </div>

      {news.imageUrl && (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src={news.imageUrl}
            alt={news.imageAlt ?? news.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      {news.imageAlt && (
        <p className="mt-2 text-xs text-neutral-500">{news.imageAlt}</p>
      )}

      <div className="mt-6 space-y-5 text-lg leading-9 text-neutral-800">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
};

export default NewsDetails;
