import { Link } from "react-router-dom";

const orders = [
  { id: "3215754", status: "IN PROGRESS", date: "Dec 30, 2024 07:52", type: "EXCHANGE", link: "/OrderHistoryDetails" },
  { id: "3215754", status: "COMPLETED", date: "Dec 30, 2024 07:52", type: "MONETARY", link: "/OrderHistoryDetails" },
  { id: "3215754", status: "COMPLETED", date: "Dec 30, 2024 07:52", type: "EXCHANGE", link: "/OrderHistoryDetails" },
  { id: "3215754", status: "CANCELED", date: "Dec 30, 2024 07:52", type: "EXCHANGE", link: "/OrderHistoryDetails" },
  { id: "3215754", status: "COMPLETED", date: "Dec 30, 2024 07:52", type: "MONETARY", link: "/OrderHistoryDetails" },
  { id: "3215754", status: "COMPLETED", date: "Dec 30, 2024 07:52", type: "EXCHANGE", link: "/OrderHistoryDetails" },
  { id: "3215754", status: "COMPLETED", date: "Dec 30, 2024 07:52", type: "MONETARY", link: "/OrderHistoryDetails" },
  { id: "3215754", status: "COMPLETED", date: "Dec 30, 2024 07:52", type: "EXCHANGE", link: "/OrderHistoryDetails" },
];

const OrderHistory = () => {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        <Link to="/order-history">ORDER HISTORY</Link>
      </h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6 w-full">
        <table className="w-full border-collapse text-lg">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-800 uppercase">
              <th className="p-4">ORDER ID</th>
              <th className="p-4">STATUS</th>
              <th className="p-4">DATE</th>
              <th className="p-4">TYPE</th>
              <th className="p-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition-all">
                <td className="p-4 text-gray-900 font-semibold">#{order.id}</td>
                <td className={`p-4 font-bold text-lg ${order.status === "IN PROGRESS" ? "text-orange-500" : order.status === "CANCELED" ? "text-red-500" : "text-green-500"}`}>{order.status}</td>
                <td className="p-4 text-gray-700">{order.date}</td>
                <td className="p-4 text-gray-800 font-medium">{order.type}</td>
                <td className="p-4 text-blue-600 hover:underline font-semibold">
                  <Link to={order.link}>View Details →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
