import React from "react";
import millify from "millify";

const GlobalCryptoStats = ({ data }) => {
  // console.log(data);
  const {
    totalCoins,
    totalMarkets,
    totalExchanges,
    totalMarketCap,
    total24hVolume,
  } = data;
  return (
    <div className="flex flex-col m-4 md:m-10 pr-5 pl-5 pt-3 gap-4">
      <h1 className="text-3xl md:text-5xl font-medium text-[white]">
        Global Crypto Stats
      </h1>
      <div className="h-auto md:h-40 flex flex-col md:flex-wrap gap-3 md:gap-5">
        <div className="flex flex-col text-xl md:text-3xl">
          <p className="text-lg md:text-xl text-[#eebc1d]">
            Total Cryptocurrencies
          </p>
          <p>{millify(totalCoins)}</p>
        </div>
        <div className="flex flex-col text-xl md:text-3xl">
          <p className="text-lg md:text-xl text-[#facc15]">Total Market Cap</p>
          <p>{millify(totalMarketCap)}</p>
        </div>
        <div className="flex flex-col text-xl md:text-3xl">
          <p className="text-lg md:text-xl text-[#facc15]">Total Market</p>
          <p>{millify(totalMarkets)}</p>
        </div>
        <div className="flex flex-col text-xl md:text-3xl">
          <p className="text-lg md:text-xl text-[#facc15]">Total Exchange</p>
          <p>{millify(totalExchanges)}</p>
        </div>
        <div className="flex flex-col text-xl md:text-3xl">
          <p className="text-lg md:text-xl text-[#facc15]">Total 24H Volume</p>
          <p>{millify(total24hVolume)}</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalCryptoStats;
