import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartView = ({ chartData }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Fare Amount",
        data: chartData.data,
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Fare Amount Distribution" },
    },
    scales: {
      x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartView;
