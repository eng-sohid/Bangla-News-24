import NavLink from "./NavLink";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  let navs: Navs[] = [];
  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
      signal: AbortSignal.timeout(15000),
      next: { revalidate: 300 },
    });
    navs = (await res.json()).data ?? [];
  } catch (e) {
    console.error("NavLinks fetch failed:", e);
  }

  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <nav className="sticky top-0 z-40 border-y border-line bg-white/90 backdrop-blur">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
          <li>
            <NavLink href="/">হোম</NavLink>
          </li>
          {filteredNavs.map((n) => (
            <li key={n.slug}>
              <NavLink href={`/category/${n.slug}`}>{n.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
