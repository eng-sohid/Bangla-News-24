import MainNews from "../components/MainNews";
import MostRead from "../components/MostRead";
import NewsCard from "../components/NewsCard";

interface Article {
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

interface Section {
  curationId: string;
  title: string;
  articles: Article[];
}

export default async function Home() {
  let sections: Section[] = [];
  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news/sections",
      {
        signal: AbortSignal.timeout(15000),
        next: { revalidate: 60 },
      },
    );
    sections = (await res.json()).data ?? [];
  } catch (e) {
    console.error("Home fetch failed:", e);
  }

  if (!sections.length) {
    return (
      <p className="py-32 text-center text-neutral-500">
        খবর লোড হচ্ছে না, একটু পরে আবার চেষ্টা করুন।
      </p>
    );
  }

  const mainNews = sections[0].articles;
  const otherSections = sections.slice(1);

  return (
    <div className="container mx-auto mt-8 mb-16 grid grid-cols-1 gap-6 px-4 lg:grid-cols-3">
      {/* বাম: খবরের অংশ */}
      <div className="space-y-10 lg:col-span-2">
        <MainNews news={mainNews} />

        {otherSections.map((os) => (
          <section key={os.curationId}>
            <h2 className="mb-4 border-b-2 border-red-700 pb-1 text-xl font-bold text-red-700">
              {os.title}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {os.articles.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ডান: সর্বাধিক পঠিত (স্ক্রলে আটকে থাকবে) */}
      <div>
        <div>
          <MostRead />
        </div>
      </div>
    </div>
  );
}
