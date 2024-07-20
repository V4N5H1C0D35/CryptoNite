import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinData } from "@/redux/slices/apiSlice";
import Banner from "@/components/Banner/Banner";
import GlobalStats from "@/components/GlobalStats";
import Image from "next/image";
import Link from "next/link";
import millify from "millify";
import NewsComp from "@/components/NewsComp";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  const dispatch = useDispatch();
  const data = useSelector((state) => state.coindata.data);
  const error = useSelector((state) => state.coindata.error);
  const loading = useSelector((state) => state.coindata.loading);

  const [coinData, setCoinData] = useState([]);
  const [globalStats, setGlobalStats] = useState({});

  useEffect(() => {
    dispatch(fetchCoinData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setCoinData(data?.data?.coins || []);
      setGlobalStats(data?.data?.stats || {});
    }
  }, [data]);

  const totalPages = Math.ceil(coinData.length / coinsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * coinsPerPage;
  const currentCoins = coinData.slice(startIndex, startIndex + coinsPerPage);

  if (loading)
    return <div className="text-center text-3xl font-bold">Loading...</div>;
  if (error)
    return <div className="text-center text-3xl font-bold">Error: {error}</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      <Banner />
      <GlobalStats data={globalStats} />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-2 sm:px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                Rank
              </th>
              <th className="px-2 sm:px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                Name
              </th>
              <th className="px-2 sm:px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                Price
              </th>
              <th className="px-2 sm:px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-2 sm:px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                Icon
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCoins.map((coin) => (
              <tr
                key={coin.uuid}
                className="bg-black h-24 text- hover:bg-gray-50 hover:text-black"
              >
                <td className="px-2 sm:px-6 h-24 py-4 border-b border-gray-200 text-lg">
                  {coin.rank}
                </td>
                <td className="px-2 sm:px-6 h-24 py-4 font-semibold border-b border-gray-200 text-lg  text-[#eebc1d]">
                  <Link
                    href={`/coins/${coin?.uuid}/${coin.name}/${coin.symbol}`}
                  >
                    {coin.name}
                  </Link>
                </td>
                <td className="px-2 sm:px-6 h-24 py-4 border-b border-gray-200 text-lg">
                  {millify(coin?.price)}
                </td>
                <td className="px-2 sm:px-6 h-24 py-4 border-b border-gray-200 text-lg">
                  {coin.marketCap}
                </td>
                <td className="px-2 sm:px-6 py-4 border-b border-gray-200 text-lg">
                  <Image
                    src={coin.iconUrl}
                    alt={coin.name}
                    width={48}
                    height={48}
                    className="h-16 w-16"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col sm:flex-row justify-center items-center m-4 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 border border-gray-300 rounded ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border border-gray-300 rounded ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
        <NewsComp />
      </div>
    </div>
  );
}
