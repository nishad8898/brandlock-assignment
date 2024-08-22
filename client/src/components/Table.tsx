import axios from "axios";
import React, { useState } from "react";

const BASE_API_URL = import.meta.env.VITE_BASE_URL;
interface TableProps {
  id: number;
  data: (string | number)[][];
  layout: {
    width: string;
    height: string;
  };
  setReloadDashboard: React.Dispatch<React.SetStateAction<number>>;
}

const TableComponent: React.FC<TableProps> = ({
  id,
  data,
  layout,
  setReloadDashboard,
}) => {
  const [editRow, setEditRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<(string | number)[]>([]);

  async function handleUpdateRow(
    id: number,
    index: number,
    value: (string | number)[]
  ) {
    try {
      await axios.put(`${BASE_API_URL}/dashboard/table/${id}`, {
        index,
        value,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Failed to update the row.");
    } finally {
      setReloadDashboard((prev) => prev + 1);
    }
  }

  async function handleDeleteRow(id: number, index: number) {
    try {
      await axios.delete(`${BASE_API_URL}/dashboard/table/${id}`, {
        data: { index },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Failed to delete the row.");
    } finally {
      setReloadDashboard((prev) => prev + 1);
    }
  }

  return (
    <div
      className="rounded shadow-2xl overflow-y-auto bg-slate-700 justify-self-center"
      style={{ width: layout.width, height: layout.height }}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-white">
          <tr>
            {data[0].map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600 text-white">
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                  {editRow === rowIndex ? (
                    <input
                      type="text"
                      className="px-2 py-1 bg-gray-200 text-black rounded w-[90px]"
                      value={editedData?.[cellIndex]}
                      onChange={(e) => {
                        if (editedData) {
                          const newData = [...editedData];
                          newData[cellIndex] = e.target.value;
                          setEditedData(newData);
                        }
                      }}
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                {editRow === rowIndex ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => {
                      setEditedData([]);
                      setEditRow(null);
                      handleUpdateRow(id, editRow + 1, editedData);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => {
                      setEditedData(row);
                      setEditRow(rowIndex);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => {
                    handleDeleteRow(id, rowIndex + 1);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
