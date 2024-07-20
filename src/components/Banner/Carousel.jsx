import React, { useState, useEffect } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import millify from "millify";
import Link from "next/link";

const Carousel = () => {
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState([]);

  const fetchData = async () => {
    const url =
      "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9754f6f96bmsh2181d919483eb34p16cbd9jsn65404904955c",
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.get(url, options);
      setCoinData(response.data.data.coins);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const items = coinData.map((coin) => (
    <Link href={`/coins/${coin?.uuid}/${coin.name}/${coin.symbol}`}>
      <div key={coin.uuid} className="flex flex-col items-center">
        <img
          src={coin.iconUrl}
          alt={coin.name}
          className="w-16 h-16 md:w-20 md:h-20"
        />
        <p className="text-sm md:text-xl">{coin.name}</p>
        <p className="text-sm md:text-xl">${millify(coin.price)}</p>
      </div>
    </Link>
  ));

  const responsive = {
    0: { items: 1 },
    512: { items: 2 },
    1024: { items: 4 },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-1/2 flex items-center pl-4 md:pl-16">
      <AliceCarousel
        items={items}
        responsive={responsive}
        autoPlay
        autoPlayInterval={1000}
        animationDuration={2500}
        infinite
        disableDotsControls
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
