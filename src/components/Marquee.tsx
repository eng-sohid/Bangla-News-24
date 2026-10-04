import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headline {
  id: string;
  title: string;
  isLive?: boolean;
  link?: string;
}

const Marquee = async () => {
  let headlines: Headline[] = [];
  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news?limit=10",
      {
        signal: AbortSignal.timeout(15000),
        next: { revalidate: 60 },
      },
    );
    headlines = (await res.json()).data ?? [];
  } catch (e) {
    console.error("Marquee fetch failed:", e);
  }

  if (!headlines.length) return null;

  return (
    <div className="sticky top-0 z-50 bg-red-700 text-white">
      <div className="container mx-auto flex">
        <div className="bg-red-800 px-5 py-1 font-bold">সর্বশেষ</div>
        <MarqueeText className="py-1" direction="right" duration={10}>
          {headlines.map((h) => (
            <Link
              key={h.id}
              href={h.isLive && h.link ? h.link : `/news/${h.id}`}
              target={h.isLive ? "_blank" : undefined}
              rel={h.isLive ? "noopener noreferrer" : undefined}
              className="hover:underline"
            >
              <span>{h.title}</span>
              <span className="mx-5 no-underline">ㆍ</span>
            </Link>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
