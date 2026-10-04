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
    <nav className="mt-5 flex flex-wrap justify-center gap-5">
      <NavLink href="/">হোম</NavLink>
      {filteredNavs.map((n) => (
        <NavLink key={n.slug} href={`/category/${n.slug}`}>
          {n.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks;
