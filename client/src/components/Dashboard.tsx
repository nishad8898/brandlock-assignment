import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart";
import Table from "./Table";

const BASE_API_URL = import.meta.env.VITE_BASE_URL;

interface ChartData {
  labels: string[];
  values: number[];
}

interface TableData {
  [index: number]: string | number;
}

interface Layout {
  width: string;
  height: string;
}

interface ComponentConfig {
  id: number;
  type: string;
  data: ChartData | TableData[];
  layout: Layout;
}

const Dashboard: React.FC = () => {
  const [components, setComponents] = useState<ComponentConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reloadDashboard, setReloadDashboard] = useState<number>(0);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/dashboard`);
        setComponents(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load component configurations.");
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, [reloadDashboard]);

  async function handleResetData() {
    try {
      await axios.post(`${BASE_API_URL}/dashboard/reset`);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Failed to reset the data.");
    } finally {
      setReloadDashboard((prev) => prev + 1);
    }
  }

  if (loading)
    return (
      <p className="text-center text-3xl font-bold p-4 text-white">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-3xl font-bold p-4 text-white">{error}</p>
    );

  return (
    <>
      <button
        className="bg-green-400 hover:bg-green-700 text-white font-bold py-1 px-2 rounded block mx-auto"
        onClick={() => {
          handleResetData();
        }}
      >
        Reset Data
      </button>
      <div className="flex justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl w-full items-center">
          {components.map((config, index) => {
            switch (config.type) {
              case "chart":
                return (
                  <Chart
                    key={index}
                    data={config.data as ChartData}
                    layout={config.layout}
                  />
                );
              case "table":
                return (
                  <Table
                    key={index}
                    id={config.id}
                    data={config.data as (string | number)[][]}
                    layout={config.layout}
                    setReloadDashboard={setReloadDashboard}
                  />
                );
              default:
                return (
                  <p key={index} className="text-white">
                    Unknown component type
                  </p>
                );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
