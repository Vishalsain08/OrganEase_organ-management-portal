import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';
import { FaBoxes, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CentreMyOrgans = () => {
  const [organs, setOrgans] = useState([]);

  const fetchOrgans = async () => {
    try {
      const res = await axiosInstance.get('/organs/my');
      setOrgans(res.data);
    } catch (err) {
      toast.error('Failed to fetch your organs');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this organ?')) return;

    try {
      await axiosInstance.delete(`/organs/${id}`);
      toast.success('Organ deleted successfully');
      fetchOrgans(); // refresh after deletion
    } catch (err) {
      toast.error('Failed to delete organ');
    }
  };

  useEffect(() => {
    fetchOrgans();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-white px-4 py-16 text-blue-950">
      <div className="max-w-6xl mx-auto">
        {/* Heading + Add Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <FaBoxes className="text-3xl text-cyan-500" />
            <h2 className="text-3xl font-bold text-cyan-600">Organs You’ve Listed</h2>
          </div>
          <Link
            to="/center/add-organ"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition hover:scale-105"
          >
            <FaPlusCircle className="text-lg" />
            Add New Organ
          </Link>
        </div>

        <p className="text-blue-800 text-lg mb-8 text-center sm:text-left">
          Here's a list of all organs currently registered by your center.
        </p>

        {/* Organs List */}
        {organs.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg">🚫 You haven't listed any organs yet.</p>
            <p className="text-sm mt-2 text-gray-500">Start saving lives by adding one!</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {organs.map((organ) => (
              <motion.div
                key={organ._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white border border-cyan-200 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {organ.organType}
                </h3>

                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <p>
                    <span className="font-semibold">Donor Age:</span>{' '}
                    {organ.donorAge || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Blood Group:</span>{' '}
                    {organ.bloodGroup}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{' '}
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                        organ.isReserved
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : 'bg-green-100 text-green-700 border border-green-300'
                      }`}
                    >
                      {organ.isReserved ? 'Reserved' : 'Available'}
                    </span>
                  </p>
                </div>

                {/* Delete Button */}
                {!organ.isReserved && (
                  <button
                    onClick={() => handleDelete(organ._id)}
                    className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition"
                  >
                    <FaTrash className="text-base" />
                    Delete
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CentreMyOrgans;
