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

  let categoryNews: News[] = [];
  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/category/${categoryId}`,
      {
        signal: AbortSignal.timeout(15000),
        next: { revalidate: 60 },
      },
    );
    categoryNews = (await res.json()).data ?? [];
  } catch (e) {
    console.error("Category fetch failed:", e);
  }

  return (
    <div className="container mx-auto mt-8 mb-16 px-4">
      <h1 className="mb-6 border-b-2 border-red-700 pb-2 text-2xl font-bold text-red-700">
        {categoryNews[0]?.category ?? categoryId}
      </h1>

      {categoryNews.length === 0 ? (
        <p className="py-20 text-center text-neutral-500">
          কোনো খবর পাওয়া যায়নি। একটু পরে আবার চেষ্টা করুন।
        </p>
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
