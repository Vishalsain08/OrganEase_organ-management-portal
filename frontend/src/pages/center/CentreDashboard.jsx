// src/pages/center/CenterDashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaHandHoldingMedical,
  FaDatabase,
  FaRegSmile,
  FaArrowRight,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const CenterDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-100 via-cyan-100 to-white text-blue-950 px-4 py-16">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <FaHandHoldingMedical className="text-4xl text-red-500 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950">
            Welcome to OrganEase
          </h1>
        </div>
        <h2 className="text-3xl font-semibold text-blue-900 mb-3">
          {user?.name ? `${user.name}` : 'Center'}
        </h2>
        <p className="text-blue-800 text-lg">
          Your dedication helps save lives. Thank you for being the backbone of hope and healing. 💙
        </p>
      </motion.div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* View My Organs */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-8 bg-white border border-cyan-200 rounded-2xl shadow-xl transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaDatabase className="text-3xl text-cyan-500" />
            <h2 className="text-2xl font-bold">Manage Organs</h2>
          </div>
          <p className="text-blue-800 mb-6">
            View and manage all donated organs in your center's database.
          </p>
          <button
            onClick={() => navigate('/center/my-organs')}
            className="flex items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 hover:scale-105 transition"
          >
            View Organs <FaArrowRight />
          </button>
        </motion.div>

        {/* View Requests */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-8 bg-white border border-cyan-200 rounded-2xl shadow-xl transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaRegSmile className="text-3xl text-cyan-500" />
            <h2 className="text-2xl font-bold">Handle Requests</h2>
          </div>
          <p className="text-blue-800 mb-6">
            Check incoming organ requests and respond with approvals or rejections.
          </p>
          <button
            onClick={() => navigate('/center/requests')}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:scale-105 transition"
          >
            View Requests <FaArrowRight />
          </button>
        </motion.div>
      </div>

      {/* CTA Section */}
      <section className="mt-24 text-center bg-blue-950 text-white py-12 px-4 rounded-2xl shadow-inner">
        <h2 className="text-3xl font-bold mb-3">Every Match is a Miracle 💖</h2>
        <p className="max-w-xl mx-auto text-blue-100 mb-6">
          Keep updating your organ records and responding to requests to maximize lives saved through OrganEase.
        </p>
        <button
          onClick={() => navigate('/center/add-organ')}
          className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-blue-950 font-bold px-6 py-3 rounded-lg transition hover:scale-105"
        >
          Add New Organ <FaArrowRight />
        </button>
      </section>
    </div>
  );
};

export default CenterDashboard;
