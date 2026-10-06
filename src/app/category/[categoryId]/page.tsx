import { notFound } from "next/navigation";
import NewsCard from "@/src/components/NewsCard";

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

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  let categoryNews: News[] | null = null;
  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/category/${categoryId}`,
      {
        signal: AbortSignal.timeout(15000),
        next: { revalidate: 60 },
      },
    );
    if (res.ok) {
      categoryNews = (await res.json()).data ?? [];
    }
  } catch (e) {
    console.error("Category fetch failed:", e);
  }

  if (!categoryNews) {
    notFound();
  }

  const bn = new Intl.NumberFormat("bn-BD");
  const title = categoryNews[0]?.category ?? categoryId;

  return (
    <div className="mt-8 mb-16 px-4">
      <header className="mb-8 rounded-2xl bg-ink px-6 py-8 text-white sm:px-10 sm:py-10">
        <p className="text-xs font-bold tracking-[0.25em] text-red-400 uppercase">
          ক্যাটাগরি
        </p>
        <h1 className="mt-2 font-serif text-3xl font-extrabold sm:text-5xl">
          {title}
        </h1>
        {categoryNews.length > 0 && (
          <p className="mt-3 text-sm text-white/60">
            {bn.format(categoryNews.length)}টি খবর
          </p>
        )}
      </header>

      {categoryNews.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-5xl">📭</span>
          <p className="font-serif text-xl font-bold">কোনো খবর পাওয়া যায়নি</p>
          <p className="text-muted">একটু পরে আবার চেষ্টা করুন।</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNews;
