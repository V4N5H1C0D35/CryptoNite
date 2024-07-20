import React from "react";
import moment from "moment";
import Link from "next/link";

const NewsCard = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const formattedDate = moment(data.createdAt).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  const fullDescription = data?.description;

  return (
    <div className="bg-white w-full md:w-[48%] flex flex-col md:flex-row shadow-md p-4">
      <div className="w-full md:w-1/2 h-48 md:h-auto flex-shrink-0 overflow-hidden">
        <img
          src={data?.thumbnail}
          className="w-full h-full object-cover"
          alt="Thumbnail"
        />
      </div>
      <div className="mt-4 md:mt-0 md:ml-4 text-black flex flex-col justify-center">
        <p className="text-gray-500">{formattedDate}</p>
        <h2 className="text-lg md:text-xl font-bold">
          <Link className="text-[#0b1bac]" href={`${data?.url}`}>
            {data?.title}
          </Link>
        </h2>
        <p className="text-sm md:text-base">{fullDescription}</p>
      </div>
    </div>
  );
};

export default NewsCard;
