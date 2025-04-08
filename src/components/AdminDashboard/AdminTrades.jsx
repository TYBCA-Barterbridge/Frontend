import { useState, useEffect } from "react";
import { FaSearch, FaEye } from "react-icons/fa";
import { useGetAllTradesQuery } from "../../features/admin/adminApiSlice";
import { format } from "date-fns";

const AdminTrades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { data: trades, isLoading, error } = useGetAllTradesQuery();

  const handleViewTradeDetails = (trade) => {
    setSelectedTrade(trade);
    setShowDetails(true);
  };
  console.log(trades);

  const filteredTrades =
    trades?.filter((trade) => {
      const matchesSearch = trade.exchange_id.toString().includes(searchTerm);

      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "pending" && trade.pending) ||
        (selectedStatus === "completed" && !trade.pending);

      return matchesSearch && matchesStatus;
    }) || [];

  const TradeDetailsModal = ({ trade, onClose }) => {
    if (!trade) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Trade Details</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Trade ID</h4>
              <p>{trade.exchange_id}</p>
            </div>

            <div>
              <h4 className="font-medium">Type</h4>
              <p className="capitalize">{trade.type}</p>
            </div>

            <div>
              <h4 className="font-medium">Status</h4>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  trade.pending
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {trade.pending ? "Pending" : "Completed"}
              </span>
            </div>

            <div>
              <h4 className="font-medium">Date</h4>
              <p>{format(new Date(trade.exchange_date), "PPP")}</p>
            </div>

            <div>
              <h4 className="font-medium">Seller</h4>
              <p>{trade.seller}</p>
            </div>

            <div>
              <h4 className="font-medium">Buyer</h4>
              <p>{trade.buyer}</p>
            </div>

            <div>
              <h4 className="font-medium">Items</h4>
              {trade.type === "good" ? (
                <div className="space-y-2">
                  <p>Good A: {trade.goodA?.good_name}</p>
                  <p>Good B: {trade.goodB?.good_name}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>Skill A: {trade.skillA?.skill_name}</p>
                  <p>Skill B: {trade.skillB?.skill_name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error)
    return <div className="p-6 text-red-600">Error loading trades</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Trade Management</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="Search trades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trade ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrades.map((trade, index) => (
                <tr key={`${trade.exchange_id}-${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {trade.exchange_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {trade.seller}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {trade.buyer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {trade.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        !trade.pending
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {trade.pending ? "Pending" : "Completed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(trade.exchange_date), "PPP")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleViewTradeDetails(trade)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetails && (
        <TradeDetailsModal
          trade={selectedTrade}
          onClose={() => {
            setShowDetails(false);
            setSelectedTrade(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminTrades;
