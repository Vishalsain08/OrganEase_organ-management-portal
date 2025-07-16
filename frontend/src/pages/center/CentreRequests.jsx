import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';
import { FaClipboardList } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Loader from '../../components/Loader';

const CentreRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get('/requests/center');
      setRequests(res.data);
    } catch (err) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await axiosInstance.put(`/requests/${id}`, { status });
      toast.success(`Request ${status}`);
      fetchRequests(); // refresh list
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <Loader />; // ✅ show loader while loading

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-100 px-4 py-16 text-blue-950">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-3">
            <FaClipboardList className="text-3xl text-cyan-500" />
            <h2 className="text-4xl font-bold text-cyan-600">Organ Requests Received</h2>
          </div>
          <p className="text-blue-800 text-lg">
            Review and respond to incoming organ requests from hospitals.
          </p>
        </div>

        {/* Requests Grid */}
        {requests.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            🚫 No requests found at the moment.
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {requests.map((req) => (
              <motion.div
                key={req._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-cyan-200 rounded-2xl shadow-md p-6 transition-all hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {req.organ?.organType || 'Organ'} Request
                </h3>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Hospital:</span>{' '}
                    {req.hospital?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Blood Group:</span>{' '}
                    {req.patientBloodGroup}
                  </p>
                  <p>
                    <span className="font-semibold">Reason:</span>{' '}
                    {req.reason}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full shadow border min-w-[100px] text-center
                      ${
                        req.status === 'Accepted'
                          ? 'bg-green-100 text-green-700 border-green-300'
                          : req.status === 'Rejected'
                          ? 'bg-red-100 text-red-700 border-red-300'
                          : 'bg-yellow-100 text-yellow-700 border-yellow-300'
                      }`}
                  >
                    {req.status}
                  </span>

                  {req.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(req._id, 'Accepted')}
                        className="px-3 py-1 text-sm font-semibold bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(req._id, 'Rejected')}
                        className="px-3 py-1 text-sm font-semibold bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CentreRequests;
