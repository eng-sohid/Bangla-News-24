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
    <aside className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="mb-4 border-b-2 border-red-700 pb-2 text-xl font-bold">
        সর্বাধিক পঠিত
      </h2>
      <ol className="divide-y divide-gray-100">
        {news.map((n, i) => (
          <li key={n.id}>
            <Link href={`/news/${n.id}`} className="group flex gap-3 py-3">
              <span className="w-6 shrink-0 text-2xl font-bold leading-none text-red-700">
                {bn.format(i + 1)}
              </span>
              <span className="font-medium leading-snug group-hover:text-red-700">
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
