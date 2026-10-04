// import NewsCard from "@/src/components/NewsCard";
// import React from "react";
// interface News {
//   title: string;
//   id: string;
//   description: string;
//   category: string;
//   imageUrl: string;
//   imageAlt: string;
// }
// const CategoryNews = async ({ params }: { params: { categoryId: string } }) => {
//   const { categoryId } = await params;
//   console.log(categoryId);
//   const res = await fetch(
//     `https://news-api-v2.vercel.app/api/category/politics`,
//   );
//   const data = await res.json();
//   const categoryNews: News[] = data.data;
//   // console.log(categoryNews);
//   console.log(data);
//   return (
//     <div>
//       <h1 className="text-2xl font-bold border-b-2 border-red-700 mb-5">
//         {data.title}
//       </h1>

//       <div>
//         {categoryNews.map((news) => (
//           <NewsCard key={news.id} news={news} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryNews;
import React from "react";

const page = () => {
  return (
    <div>
      <h2>Category Details Page</h2>
    </div>
  );
};

export default page;
