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
    <div className="bg-ink text-white">
      <div className="container mx-auto flex items-stretch">
        <div className="flex shrink-0 items-center gap-2 bg-brand px-4 py-2 text-sm font-bold sm:px-6">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          সর্বশেষ
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText className="py-2 text-sm" direction="right" duration={10}>
            {headlines.map((h) => (
              <Link
                key={h.id}
                href={h.isLive && h.link ? h.link : `/news/${h.id}`}
                target={h.isLive ? "_blank" : undefined}
                rel={h.isLive ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-red-300"
              >
                <span>{h.title}</span>
                <span className="mx-5 text-brand">◆</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
