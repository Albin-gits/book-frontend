import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const DashboardChart = ({ userCount, reviewCount, bookCount }) => {
  const data = {
    labels: ["Books", "Reviews", "Users"],
    datasets: [
      {
        label: "Total Count",
        data: [bookCount, reviewCount, userCount],
        backgroundColor: ["#2196F3", "#F44336", "green"], // Blue, Red, Green colors for each category
        borderColor: ["#2196F3", "#F44336", "green"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default DashboardChart;
