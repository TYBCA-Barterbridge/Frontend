import { Link } from "react-router-dom";
import { useGetGoodExchangeHistoryQuery as GoodHistory } from "../../../features/good/goodApiSlice";
import { useGetExchangeHistoryQuery as SkillHistory } from "../../../features/skill/skillApiSlice";
import { FaExchangeAlt , FaUser} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../hooks/useAuth";

// Animation Variants
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const sectionVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

const buttonVariant = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

// Card Component
const ExchangeCard = ({ exchange, userId }) => {
  const isUser = exchange.UserA.user_id === userId;

  const otherUser = isUser ? exchange.UserB : exchange.UserA;
  const yourItem = isUser ? exchange.itemA : exchange.itemB;
  const theirItem = isUser ? exchange.itemB : exchange.itemA;

  return (
    <motion.div
      key={exchange.id}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={cardVariant}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            exchange.pending
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {exchange.pending ? "Pending" : "Approved"}
        </span>
        <div className="flex items-center">
          {otherUser.profile ? (
            <img
            src={otherUser.profile}
            alt="User"
            className="w-14 h-14 rounded-full mr-3"
          />
          ):(
            <div className="w-14 h-14 rounded-full mr-3 bg-gray-100 items-center relative">
              <FaUser className="w-10 h-10 justify-self-center pt-2 "/>
            </div>
          )

          }
          <div>
            <p className="font-medium">{otherUser.username}</p>
            <p className="text-sm text-gray-600">{otherUser.email}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center mb-4 md:mb-0">
          <motion.img
            src={yourItem.images?.[0]}
            alt="Your Item"
            className="mx-auto mb-2 w-40 h-40 rounded-lg object-cover"
            whileHover={{ scale: 1.05 }}
          />
          <p className="text-sm font-medium">{yourItem.name}</p>
          <p className="text-sm text-gray-600">₹{yourItem.amount}</p>
        </div>

        <div className="flex-shrink-0 mx-6 my-4 md:my-0">
          <motion.div
            className="w-12 h-12 rounded-full border-2 border-orange-400 flex items-center justify-center"
            whileHover={{ rotate: 90 }}
          >
            <FaExchangeAlt className="h-6 w-6 text-orange-500" />
          </motion.div>
        </div>

        <div className="text-center">
          <motion.img
            src={theirItem.images?.[0]}
            alt="Their Item"
            className="mx-auto mb-2 w-40 h-40 rounded-lg object-cover"
            whileHover={{ scale: 1.05 }}
          />
          <p className="text-sm font-medium">{theirItem.name}</p>
          <p className="text-sm text-gray-600">₹{theirItem.amount}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center text-lg font-medium">
          <span className="text-gray-600">
            {new Date(exchange.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <motion.div variants={buttonVariant} whileHover="hover">
            <Link
              to={`/dashboard/exchanges/${exchange.id}/${exchange.type}`}
              className="text-orange-500 hover:text-orange-600 text-base flex items-center"
            >
              View Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Section Component
const ExchangeSection = ({ title, exchanges, userId }) => (
  <motion.div variants={sectionVariant} className="mb-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <AnimatePresence>
      {exchanges?.length > 0 ? (
        exchanges.map((exchange) => (
          <ExchangeCard key={exchange.id} exchange={exchange} userId={userId} />
        ))
      ) : (
        <motion.div className="text-center py-8 text-gray-500">
          No {title.toLowerCase()}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// Main Component
export default function Exchanges() {
  const { user_id } = useAuth();

  const { data: goodData, isLoading: goodLoading } = GoodHistory();
  const { data: skillData, isLoading: skillLoading } = SkillHistory();

  if (goodLoading || skillLoading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  const extractExchanges = (data = []) => ({
    pending: data.filter(
      (e) => e.pending && (e.UserA.user_id === user_id || e.UserB.user_id === user_id)
    ),
    approved: data.filter(
      (e) => !e.pending && (e.UserA.user_id === user_id || e.UserB.user_id === user_id)
    ),
  });

  const goodExchanges = extractExchanges(goodData?.exchanges);
  const skillExchanges = extractExchanges(skillData?.exchanges);

  return (
    <motion.div
      className="container mx-auto px-4 md:px-6 py-8"
      initial="hidden"
      animate="visible"
      variants={sectionVariant}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">My Exchanges</h1>

      {/* Good Exchanges */}
      <div className="mb-12 rounded-xl p-6 bg-gray-100 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-600">Good Exchanges</h2>
        <div className="bg-white p-4 rounded-lg mb-8">
          <ExchangeSection
            title="Pending Exchanges"
            exchanges={goodExchanges.pending}
            userId={user_id}
          />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <ExchangeSection
            title="Approved Exchanges"
            exchanges={goodExchanges.approved}
            userId={user_id}
          />
        </div>
      </div>

      {/* Skill Exchanges */}
      <div className="rounded-xl p-6 bg-gray-100 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-600">Skill Exchanges</h2>
        <div className="bg-white p-4 rounded-lg mb-8">
          <ExchangeSection
            title="Pending Exchanges"
            exchanges={skillExchanges.pending}
            userId={user_id}
          />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <ExchangeSection
            title="Approved Exchanges"
            exchanges={skillExchanges.approved}
            userId={user_id}
          />
        </div>
      </div>
    </motion.div>
  );
}