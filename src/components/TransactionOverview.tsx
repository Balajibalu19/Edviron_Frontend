import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCopy } from "react-icons/fa"; // Import copy icon

interface Transaction {
  collect_id: string;
  school_id: string;
  gateway: string;
  order_amount: number;
  transaction_amount: number;
  status: string;
  custom_order_id: string;
}

const TransactionOverview: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 10;
  const [copiedSchoolId, setCopiedSchoolId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>(
          `${process.env.REACT_APP_API_URL}/transactions`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleCopy = (schoolId: string) => {
    navigator.clipboard.writeText(schoolId).then(() => {
      setCopiedSchoolId(schoolId);
      setTimeout(() => setCopiedSchoolId(null), 2000); // Reset after 2 seconds
    });
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (!statusFilter || transaction.status === statusFilter) &&
      transaction.custom_order_id
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Transactions Overview
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Custom Order ID"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="FAILURE">Failed</option>
        </select>
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
          {currentTransactions.length > 0 ? (
            currentTransactions.map((transaction) => (
              <tr
                key={transaction.collect_id}
                className="hover:bg-gray-100 transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <td className="border-t px-9 py-3">{transaction.collect_id}</td>
                <td className="border-t px-6 py-3 flex items-center gap-2">
                  {transaction.school_id}
                  <button
                    onClick={() => handleCopy(transaction.school_id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Copy School ID"
                  >
                    <FaCopy />
                  </button>
                  {copiedSchoolId === transaction.school_id && (
                    <span className="text-green-600 text-sm ml-2">Copied!</span>
                  )}
                </td>
                <td className="border-t px-6 py-3">{transaction.gateway}</td>
                <td className="border-t px-6 py-3">
                  ${transaction.order_amount.toFixed(2)}
                </td>
                <td className="border-t px-6 py-3">
                  ${transaction.transaction_amount.toFixed(2)}
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
                  {transaction.custom_order_id}
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 border border-gray-300 rounded-lg bg-blue-500 text-white disabled:bg-gray-300"
        >
          Prev
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage * transactionsPerPage >= filteredTransactions.length
          }
          className="px-4 py-2 mx-1 border border-gray-300 rounded-lg bg-blue-500 text-white disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionOverview;
