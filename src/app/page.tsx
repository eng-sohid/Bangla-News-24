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
      <div className="flex flex-col items-center gap-3 px-4 py-32 text-center">
        <span className="text-5xl">📰</span>
        <p className="font-serif text-xl font-bold">খবর লোড হচ্ছে না</p>
        <p className="text-muted">একটু পরে আবার চেষ্টা করুন।</p>
      </div>
    );
  }

  const mainNews = sections[0].articles;
  const otherSections = sections.slice(1);

  return (
    <div className="mt-8 mb-16 grid grid-cols-1 gap-8 px-4 lg:grid-cols-3">
      {/* বাম: খবরের অংশ */}
      <div className="space-y-12 lg:col-span-2">
        <MainNews news={mainNews} />

        {otherSections.map((os) => (
          <section key={os.curationId}>
            <h2 className="section-title">{os.title}</h2>
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
        <div className=" lg:top-16">
          <MostRead />
        </div>
      </div>
    </div>
  );
}
