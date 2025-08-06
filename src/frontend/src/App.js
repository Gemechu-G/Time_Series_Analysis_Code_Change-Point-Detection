import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [priceData, setPriceData] = useState([]);
  const [changePointData, setChangePointData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // A function to fetch all data from the Flask backend
    const fetchData = async () => {
      try {
        const priceResponse = await fetch('http://localhost:5000/api/price_data');
        const priceJson = await priceResponse.json();
        if (priceResponse.ok) {
          setPriceData(priceJson);
        } else {
          throw new Error(priceJson.error);
        }

        const changePointResponse = await fetch('http://localhost:5000/api/change_point');
        const changePointJson = await changePointResponse.json();
        if (changePointResponse.ok) {
          setChangePointData(changePointJson);
        } else {
          throw new Error(changePointJson.error);
        }

      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500 text-lg">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Brent Oil Price Analysis Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Change Point Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-lg font-medium text-gray-600">Change Point Date:</p>
              <p className="text-xl font-bold text-indigo-600">
                {changePointData.change_point_date || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-lg font-medium text-gray-600">Confidence Interval:</p>
              <p className="text-xl font-bold text-green-600">
                [{changePointData.credible_interval_start || 'N/A'}, {changePointData.credible_interval_end || 'N/A'}]
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Brent Oil Price Data
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Log Returns
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {priceData.slice(0, 10).map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.Date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${row.Price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.Log_Returns.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic">
            Displaying the first 10 rows of the dataset.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
