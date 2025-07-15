import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';
import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from 'react-icons/fa';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, accepted: 0, rejected: 0, pending: 0 });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get('/requests/hospital');
        setRequests(res.data);

        const accepted = res.data.filter(r => r.status === 'Accepted').length;
        const rejected = res.data.filter(r => r.status === 'Rejected').length;
        const pending = res.data.filter(r => r.status === 'Pending').length;

        setStats({
          total: res.data.length,
          accepted,
          rejected,
          pending,
        });
      } catch (err) {
        toast.error('Failed to load your requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-50 px-4 py-12 text-blue-950">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-800">📝 My Organ Requests</h2>
          <p className="text-blue-700 mt-2">Track and manage all your organ requests efficiently.</p>
        </div>

        {/* Stats Cards */}
        {/* Stats Cards with Stylish Left Borders */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
  {[
    {
      label: 'Total Requests',
      value: stats.total,
      color: 'blue',
      icon: <FaClipboardList className="text-blue-500" />,
      border: 'border-l-8 border-blue-400',
    },
    {
      label: 'Accepted',
      value: stats.accepted,
      color: 'green',
      icon: <FaCheckCircle className="text-green-500" />,
      border: 'border-l-8 border-green-400',
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      color: 'red',
      icon: <FaTimesCircle className="text-red-500" />,
      border: 'border-l-8 border-red-400',
    },
    {
      label: 'Pending',
      value: stats.pending,
      color: 'yellow',
      icon: <FaClock className="text-yellow-500" />,
      border: 'border-l-8 border-yellow-400',
    },
  ].map((item, index) => (
    <div
      key={index}
      className={`bg-white ${item.border} rounded-xl shadow-md p-5 pl-6 flex flex-col justify-center transition-all hover:shadow-lg hover:scale-[1.03]`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{item.icon}</div>
        <div className="text-left">
          <h4 className="text-md font-semibold text-gray-700">{item.label}</h4>
          <p className={`text-2xl font-bold text-${item.color}-600`}>{item.value}</p>
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Loader / Empty / Table */}
        {loading ? (
          <div className="text-center text-blue-600 font-semibold text-lg">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">No requests made yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-blue-200 bg-white shadow-xl">
            <table className="min-w-full text-gray-800 text-base">
              <thead className="bg-blue-700 text-white text-left text-sm sm:text-base">
                <tr>
                  <th className="px-6 py-4">Organ Type</th>
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Blood Group</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-blue-50 transition duration-200 border-b border-gray-100"
                  >
                    <td className="px-6 py-4">{req.organ?.organType || '-'}</td>
                    <td className="px-6 py-4">{req.patientName}</td>
                    <td className="px-6 py-4">{req.patientBloodGroup}</td>
                    <td className="px-6 py-4">{req.reason}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wide shadow-md inline-block
                          ${
                            req.status === 'Accepted'
                              ? 'bg-green-100 text-green-700 border border-green-300'
                              : req.status === 'Rejected'
                              ? 'bg-red-100 text-red-700 border border-red-300'
                              : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                          }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
