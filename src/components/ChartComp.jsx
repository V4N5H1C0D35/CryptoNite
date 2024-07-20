"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Title,
  Legend
);

const ChartComp = ({ data }) => {
  const chartRef = useRef(null);
  const [labelNew, setLabelNew] = useState([]);
  const [priceDataNew, setPriceDataNew] = useState([]);

  useEffect(() => {
    if (data?.history) {
      const labels = data.history.slice(0, 50).map((item) => {
        const date = new Date(item.timestamp * 1000);
        return date.toLocaleString("en-US");
      });
      const prices = data.history
        .slice(0, 50)
        .map((item) => parseFloat(item.price).toFixed(2));
      setLabelNew(labels);
      setPriceDataNew(prices);
    }
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "This Graph Shows Variation of Price VS Time",
        color: "white",
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "gray",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "gray",
        },
      },
    },
  };

  const chartData = {
    labels: labelNew,
    datasets: [
      {
        label: "Price",
        data: priceDataNew,
        borderColor: "#facc15",
        fill: false,
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d");
      const chartInstance = new ChartJS(context, {
        type: "line",
        data: chartData,
        options: options,
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartData, options]);

  return (
    <div className="md:h-[400px] h-[350px]">
      <canvas ref={chartRef} className="h-full" />
    </div>
  );
};

export default ChartComp;
