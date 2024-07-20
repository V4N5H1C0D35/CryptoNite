"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import millify from "millify";
import Link from "next/link";
import ChartComp from "../../../components/ChartComp";
import { FaArrowLeftLong } from "react-icons/fa6";

const CurrencyDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const coinID = id ? id[0] : null;

  // console.log(id);

  const [coinData, setCoinData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [time, setTime] = useState("24h");

  const fetchCoinData = async () => {
    const url = `https://coinranking1.p.rapidapi.com/coin/${coinID}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1877116e40msh88bb5596f4361b1p1720adjsned9fd0f3e117",
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setCoinData(result);
      // console.log("coin data -> ", result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPriceData = async () => {
    const url = `https://coinranking1.p.rapidapi.com/coin/${coinID}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${time}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1877116e40msh88bb5596f4361b1p1720adjsned9fd0f3e117",
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setPriceData(result?.data);
      // console.log("price ->", result?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    if (coinID) {
      fetchCoinData();
      fetchPriceData();
    }
  }, [coinID]);

  useEffect(() => {
    if (coinID) {
      fetchPriceData();
    }
  }, [time]);

  if (!coinData || !priceData) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 md:p-7 border-b-2 md:border-b-0 md:border-r-2 gap-2">
        <div className="md:absolute top-14 text-[#facc15]">
          <Link href={"/"} className="flex items-center gap-2 text-2xl">
            <FaArrowLeftLong />
            <p>Go To Home</p>
          </Link>
        </div>
        <img
          className="w-1/3"
          src={coinData?.data?.coin?.iconUrl}
          alt={coinData?.data?.coin?.name}
        />
        <h1 className="font-semibold text-2xl md:text-4xl my-3 text-center">
          {coinData?.data?.coin?.name}
        </h1>
        <p className="text-sm md:text-lg text-center">
          {coinData?.data?.coin?.description}
        </p>
        <p className="text-xl md:text-2xl font-medium mt-3 text-center">
          Price : {millify(coinData?.data?.coin?.price)}
        </p>
        <p className="text-xl md:text-2xl font-medium text-center">
          Market Cap : {millify(coinData?.data?.coin?.marketCap)}
        </p>
      </div>
      <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-4 md:p-8 text-black gap-24">
        <div className="w-full h-64 md:h-96">
          <ChartComp data={priceData} />
        </div>
        <div className="flex mt-4 md:mt-8 w-full md:w-96">
          <select className="w-full p-2 md:p-1 rounded" onChange={handleChange}>
            <option value="24h">24 Hours</option>
            <option value="30d">30 Days</option>
            <option value="1y">1 Year</option>
            <option value="3y">3 Years</option>
            <option value="5y">5 Years</option>
            <option value="3h">3 Hours</option>
            <option value="7d">7 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDetail;
