import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  layout: {
    width: string;
    height: string;
  };
}

const Chart: React.FC<ChartProps> = ({ data, layout }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Dataset",
        data: data.values,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
      tooltip: {
        bodyColor: "white",
        titleColor: "white",
      },
    },
    elements: {
      line: {
        borderColor: "rgba(75, 192, 192, 1)",
      },
      point: {
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <div
      className="rounded shadow-2xl justify-self-center bg-slate-700 p-5"
      style={{ width: layout.width, height: layout.height }}
    >
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
