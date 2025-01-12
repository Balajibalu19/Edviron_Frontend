// Transaction Status Check Page
import axios from 'axios';
import React, { useState } from 'react';

const TransactionStatusCheck = () => {
  const [customOrderId, setCustomOrderId] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStatus = async () => {
    setLoading(true);
    setError('');
    setStatus(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/transactions/check-status`,
        { params: { custom_order_id: customOrderId } }
      );
      setStatus(response.data);
    } catch (err) {
      setError('Failed to fetch transaction status. Please try again.');
      console.error('Error checking transaction status:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Transaction Status Check
        </h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Custom Order ID"
            value={customOrderId}
            onChange={(e) => setCustomOrderId(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
            onClick={fetchStatus}
            disabled={!customOrderId || loading}
          >
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </div>
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {status && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Transaction Details
            </h2>
            <pre className="bg-gray-100 p-4 rounded text-sm text-gray-600 overflow-x-auto">
              {JSON.stringify(status, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionStatusCheck;
