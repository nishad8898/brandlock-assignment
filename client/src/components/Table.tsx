// import React from "react";

// interface TableProps {
//   data: (string | number)[][];
//   layout: {
//     width: string;
//     height: string;
//   };
// }

// const Table: React.FC<TableProps> = ({ data, layout }) => {
//   return (
//     <div
//       className="rounded-lg shadow-2xl justify-self-center text-white p-10 bg-slate-700"
//       style={{ width: layout.width, height: layout.height }}
//     >
//       <h3 className="text-lg font-semibold p-2 text-center">Table</h3>
//       <table className="min-w-full table-auto border-collapse">
//         <thead>
//           <tr>
//             {data[0].map((header, index) => (
//               <th key={index} className="p-2 border">
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.slice(1).map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <td key={cellIndex} className="p-2 border">
//                   {cell}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
import React from "react";

interface TableProps {
  data: (string | number)[][];
  layout: {
    width: string;
    height: string;
  };
}

const TableComponent: React.FC<TableProps> = ({ data, layout }) => {
  return (
    <div
      className="rounded shadow-2xl overflow-y-auto bg-slate-700"
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600 text-white">
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
