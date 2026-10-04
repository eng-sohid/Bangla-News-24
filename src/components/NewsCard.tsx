import Image from "next/image";
import React from "react";
interface News {
  title: string;
  id: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const NewsCard = ({ news }: { news: News }) => {
  return (
    <div>
      <div className="card bg-base-100  shadow-sm">
        <figure>
          <Image
            height={600}
            width={600}
            src={news.imageUrl}
            alt={news.imageAlt}
          />
        </figure>
        <div className="card-body">
          <p className="text-red-600 font-semibold">{news.category}</p>
          <h2 className="card-title text-1xl font-bold hover:text-red-700">
            {news.title}
          </h2>
          <p>{news.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
