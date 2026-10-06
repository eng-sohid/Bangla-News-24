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

  if (!news) {
    notFound();
  }

  const date = news.firstPublished
    ? new Date(news.firstPublished).toLocaleDateString("bn-BD", {
        dateStyle: "long",
      })
    : null;

  // টেক্সটকে প্যারাগ্রাফে ভাগ করা
  const paragraphs = (news.text ?? "").split(/\n+/).filter(Boolean);

  return (
    <article className="mx-auto mt-8 mb-16 max-w-3xl px-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted transition-colors hover:text-brand"
      >
        <span aria-hidden="true">←</span> হোমে ফিরে যান
      </Link>

      <header className="mt-6">
        {news.category && (
          <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
            {news.category}
          </span>
        )}

        <h1 className="mt-4 font-serif text-3xl leading-snug font-extrabold sm:text-5xl sm:leading-tight">
          {news.title}
        </h1>

        {(news.source || date) && (
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-line py-3 text-sm text-muted">
            {news.source && (
              <span className="font-semibold text-ink">{news.source}</span>
            )}
            {news.source && date && <span aria-hidden="true">•</span>}
            {date && <time>{date}</time>}
          </div>
        )}
      </header>

      {news.imageUrl && (
        <figure className="mt-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-line">
            <Image
              src={news.imageUrl}
              alt={news.imageAlt ?? news.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {news.imageAlt && (
            <figcaption className="mt-2 border-l-2 border-brand pl-3 text-xs text-muted">
              {news.imageAlt}
            </figcaption>
          )}
        </figure>
      )}

      <div className="mt-10 space-y-6 text-[19px] leading-[2] text-ink/90">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.9] first-letter:font-extrabold first-letter:text-brand"
                : undefined
            }
          >
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 flex justify-center border-t border-line pt-8">
        <Link
          href="/"
          className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
        >
          আরও খবর পড়ুন
        </Link>
      </div>
    </article>
  );
};

export default NewsDetails;
