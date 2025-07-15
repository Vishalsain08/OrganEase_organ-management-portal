import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaRegSmile,
  FaNotesMedical,
  FaArrowRight,
  FaHeartbeat,
} from 'react-icons/fa';
import axiosInstance from '../../api/axios';

const HospitalDashboard = () => {
  const [recentRequests, setRecentRequests] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/requests/hospital');
        const sorted = res.data
          .slice()
          .sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));
        setRecentRequests(sorted.slice(0, 2));
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-white px-4 py-16 text-blue-950">
      {/* Welcome Section */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex justify-center items-center gap-3 mb-4">
          <FaHeartbeat className="text-4xl text-cyan-500 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to OrganEase</h1>
        </div>
        <h2 className="text-3xl font-semibold text-blue-900 mb-3">
          {user?.name ? `${user.name} Team` : 'Hospital Team'}
        </h2>
        <p className="text-blue-800 text-lg">
          Thank you for your tireless efforts in saving lives. Let OrganEase make your process smoother, smarter, and faster.
        </p>
      </div>

      {/* Recent Requests Section */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg max-w-6xl mx-auto border border-blue-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-blue-800 flex items-center gap-2">
            <FaNotesMedical /> Recent Requests
          </h3>
          <Link
            to="/hospital/my-requests"
            className="text-cyan-600 hover:text-cyan-800 text-sm font-medium transition"
          >
            View All &rarr;
          </Link>
        </div>

        {recentRequests.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {recentRequests.map((req) => (
              <div
                key={req._id}
                className="bg-gradient-to-tr from-blue-50 via-white to-cyan-50 p-6 rounded-xl border-2 border-blue-300 hover:shadow-xl hover:scale-[1.015] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  {/* Left side: Request Info */}
                  <div>
                    <p className="text-xl font-semibold text-blue-900">
                      {req.organ?.organType || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Blood Group: <span className="font-medium">{req.patientBloodGroup}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Requested on: {new Date(req.requestedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Right side: Status badge */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow text-center min-w-[120px] whitespace-nowrap
                      ${req.status === 'Accepted'
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : req.status === 'Rejected'
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                      }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm text-center">No recent requests found.</p>
        )}
      </div>

      {/* CTA Section */}
      <section className="mt-12 text-center bg-blue-950 text-white py-12 px-4 rounded-2xl shadow-inner max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-3">Find the Right Organ, Faster 💙</h2>
        <p className="max-w-xl mx-auto text-blue-100 mb-6">
          Browse available organs and send requests easily with our intelligent system.
        </p>
        <button
          onClick={() => navigate('/hospital/available-organs')}
          className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-blue-950 font-bold px-6 py-3 rounded-lg transition hover:scale-105"
        >
          Browse Organs <FaArrowRight />
        </button>
      </section>
    </div>
  );
};

export default HospitalDashboard;
