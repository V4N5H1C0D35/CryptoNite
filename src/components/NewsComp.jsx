import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const NewsComp = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const url = "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f474414e84mshc5f5d0841cb97c6p14e796jsn8344cdf59680",
      "x-rapidapi-host": "cryptocurrency-news2.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchNews();
  }, []);

  const newsArray = data?.data;

  return (
    <div className="flex flex-col m-4 md:m-10 pr-2 md:pr-5 pl-2 md:pl-5 pt-3 gap-4 md:gap-6">
      <h1 className="text-3xl md:text-5xl font-medium text-[white]">
        Latest Crypto News
      </h1>
      {isFetching ? (
        "Loading..."
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="w-full flex flex-col md:flex-wrap md:flex-row justify-between gap-4 md:gap-10">
          {newsArray?.slice(0, 6).map((news, index) => (
            <NewsCard data={news} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsComp;
