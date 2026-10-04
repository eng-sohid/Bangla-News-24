interface MostReadNews {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();
  const news: MostReadNews[] = data.data;
  return (
    <div className=" card p-2 bg-base-100 border border-gray-300">
      <h1 className="font-bold text-red-700 mb-5">সর্বাধিক পঠিত</h1>
      <div className="grid gap-3">
        {news.map((n, i) => (
          <div className="flex gap-2  " key={n.id}>
            <p className="text-red-700 font-bold text-1xl">{i + 1}</p>
            <h2 className="font-bold hover:text-red-700 ">{n.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
