import Link from "next/link";

interface MostReadNews {
  id: string;
  title: string;
}

const MostRead = async () => {
  let news: MostReadNews[] = [];
  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news/most-read",
      {
        signal: AbortSignal.timeout(15000),
        next: { revalidate: 300 },
      },
    );
    news = (await res.json()).data ?? [];
  } catch (e) {
    console.error("MostRead fetch failed:", e);
  }

  const bn = new Intl.NumberFormat("bn-BD");

  return (
    <aside className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center gap-2 bg-ink px-5 py-3 text-white">
        <span className="text-lg">🔥</span>
        <h2 className="font-serif text-lg font-extrabold">সর্বাধিক পঠিত</h2>
      </div>

      <ol className="divide-y divide-line">
        {news.map((n, i) => (
          <li key={n.id}>
            <Link
              href={`/news/${n.id}`}
              className="group flex items-start gap-4 px-5 py-4 transition-colors hover:bg-paper"
            >
              <span className="w-8 shrink-0 text-center font-serif text-3xl leading-none font-extrabold text-brand">
                {bn.format(i + 1)}
              </span>

              <span className="font-serif text-[15px] leading-snug font-semibold transition-colors group-hover:text-brand">
                {n.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
};

export default MostRead;
