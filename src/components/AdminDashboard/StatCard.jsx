const StatCard = ({ title, value, change, icon, bgColor }) => {
  return (
    <div className={`${bgColor} p-6 rounded-xl`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          <p className="text-green-600 text-sm">{change}</p>
        </div>
        <div className="p-3 rounded-lg bg-white">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard; 