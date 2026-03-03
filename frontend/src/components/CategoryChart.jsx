import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ summary }) => {
  const chartData = {
    labels: summary.map((item) => item._id),
    datasets: [
      {
        data: summary.map((item) => item.totalAmount),
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
          "#10b981",
          "#f59e0b",
          "#8b5cf6",
          "#06b6d4",
        ],
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default CategoryChart;