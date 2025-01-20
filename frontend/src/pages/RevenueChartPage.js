import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLifetimeRevenue,
  fetchRevenueByPeriod,
} from "../redux/Slices/revenueSlice";
import { Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import Loader from "../utils/Loader";

const RevenueChartPage = () => {
  const dispatch = useDispatch();
  const [period, setPeriod] = useState("daily");

  const { lifetimeRevenue, revenueByPeriod, status, error } = useSelector(
    (state) => state.revenue
  );
  console.log(lifetimeRevenue);
  console.log(revenueByPeriod);
  useEffect(() => {
    dispatch(fetchLifetimeRevenue());
    dispatch(fetchRevenueByPeriod(period));
  }, [dispatch, period]);

  const lifetimeChartData = {
    labels: ["Lifetime Revenue"],
    datasets: [
      {
        data: [lifetimeRevenue || 0, 1000000 - lifetimeRevenue],
        backgroundColor: ["#36A2EB", "#E0E0E0"],
        hoverBackgroundColor: ["#36A2EB", "#CCCCCC"],
      },
    ],
  };

  const lineChartData = {
    labels: revenueByPeriod ? revenueByPeriod.map((data) => data.date) : [],
    datasets: [
      {
        label: "Revenue",
        data: revenueByPeriod
          ? revenueByPeriod.map((data) => data.revenue)
          : [],
        fill: true,
        borderColor: "green",
        backgroundColor: "#90ee90",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Revenue Dashboard</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setPeriod("daily")}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Daily
        </button>
        <button
          onClick={() => setPeriod("monthly")}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Monthly
        </button>
        <button
          onClick={() => setPeriod("yearly")}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Yearly
        </button>
      </div>

      {status.lifetime === "loading" || status.periods === "loading" ? (
        <p>
          <Loader />
        </p>
      ) : error.lifetime || error.periods ? (
        <p className="text-red-500">Error: {error.lifetime || error.periods}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Lifetime Revenue
            </h3>
            <div className="transition-all duration-500 transform hover:scale-105 w-full max-w-md">
              <Doughnut data={lifetimeChartData} />
              <p className="font-extrabold flex justify-center mt-5">
                Life Time revenue: {lifetimeRevenue}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Revenue by Period (
              {period.charAt(0).toUpperCase() + period.slice(1)})
            </h3>
            <div className="transition-all duration-500 transform hover:scale-105 w-full max-w-3xl">
              <Line data={lineChartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueChartPage;
