import MainNews from "../components/MainNews";
import Marquee from "../components/Marquee";
import MostRead from "../components/MostRead";
import NewsCard from "../components/NewsCard";
interface IOtherSections {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;

  const otherSections: IOtherSections[] = sections.slice(1);
  return (
    <div>
      <Marquee />
      <div className="grid grid-cols-3 container mx-auto mt-5 gap-5">
        {/*News Section*/}
        <div className=" col-span-2">
          <div className="grid gap-5 mt-5">
            <MainNews news={mainNews} />
            {otherSections.map((os) => (
              <div className="" key={os.curationId}>
                <h1 className="font-bold border-b-2 mt-3 border-red-700 pb-1">
                  {os.title}
                </h1>
                <div className="grid grid-cols-3 gap-2">
                  {os.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/**Mos read Section */}
        <div className=" ">
          <MostRead />
        </div>
      </div>
    </div>
  );
}
