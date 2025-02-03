import axios from "axios";
import React, { useState } from "react";

interface Transaction {
  _id: string;
  collect_id?: string;
  school_id?: string;
  gateway?: string;
  order_amount?: number;
  transaction_amount?: number;
  status: string;
  custom_order_id?: string;
}

const TransactionDetailsBySchool: React.FC = () => {
  const [schoolId, setSchoolId] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get<Transaction[]>(
        `${process.env.REACT_APP_API_URL}/transactions/school/${schoolId}`
      );
      setTransactions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching transactions by school:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Transaction Details by School
      </h1>
      <div className="flex items-center mb-6">
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter School ID"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 ml-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={fetchTransactions}
        >
          Fetch Transactions
        </button>
      </div>

      <table className="table-auto w-full bg-white rounded-lg shadow-md border-collapse overflow-hidden">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="px-9 py-3 text-left">Collect ID</th>
            <th className="px-6 py-3 text-left">School ID</th>
            <th className="px-6 py-3 text-left">Gateway</th>
            <th className="px-6 py-3 text-left">Order Amount</th>
            <th className="px-6 py-3 text-left">Transaction Amount</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Custom Order ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="hover:bg-gray-100 transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <td className="border-t px-9 py-3">
                  {transaction.collect_id ?? "N/A"}
                </td>
                <td className="border-t px-6 py-3">
                  {transaction.school_id ?? "N/A"}
                </td>
                <td className="border-t px-6 py-3">
                  {transaction.gateway ?? "N/A"}
                </td>
                <td className="border-t px-6 py-3">
                  ${(transaction.order_amount ?? 0).toFixed(2)}
                </td>
                <td className="border-t px-6 py-3">
                  ${(transaction.transaction_amount ?? 0).toFixed(2)}
                </td>
                <td className="border-t px-6 py-3">
                  <span
                    className={`px-3 py-2 text-sm font-medium rounded ${
                      transaction.status === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : transaction.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="border-t px-6 py-3">
                  {transaction.custom_order_id ?? "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetailsBySchool;
