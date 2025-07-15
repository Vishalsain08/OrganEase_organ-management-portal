import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaTint, FaHospitalUser } from 'react-icons/fa';

const AvailableOrgans = () => {
  const [organs, setOrgans] = useState([]);

  useEffect(() => {
    const fetchOrgans = async () => {
      try {
        const res = await axiosInstance.get('/organs');
        setOrgans(res.data);
      } catch (err) {
        console.error('Error fetching organs:', err);
      }
    };

    fetchOrgans();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white py-12 px-4 text-blue-950">
      <div className="max-w-7xl mx-auto">
        {/* Welcome / Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 flex justify-center items-center gap-3">
            <FaHeartbeat className="text-cyan-500 animate-pulse" />
            Available Organs
          </h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Browse through life-saving organ listings from various transplant centers and make a request with a single click.
          </p>
        </div>

        {/* Organ Cards */}
        {organs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No organs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {organs.map((organ) => (
              <div
                key={organ._id}
                className="bg-white p-6 rounded-2xl shadow-md border-l-8 border-cyan-500 transition hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaHeartbeat className="text-2xl text-red-500" />
                    <h2 className="text-xl font-bold text-blue-800">{organ.organType}</h2>
                  </div>
                  <p className="text-gray-700 flex items-center gap-2 text-sm mb-1">
                    <FaTint className="text-red-500" />
                    <span className="font-medium">Blood Group:</span> {organ.bloodGroup}
                  </p>
                  <p className="text-gray-700 text-sm mb-1">
                    <span className="font-medium">Donor Age:</span> {organ.donorAge || 'N/A'}
                  </p>
                  <p className="text-gray-700 text-sm mb-1 flex items-center gap-2">
                    <FaHospitalUser className="text-cyan-600" />
                    <span className="font-medium">Center:</span> {organ.center?.name || 'N/A'}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Added on: {new Date(organ.addedAt).toLocaleDateString()}
                  </p>
                </div>

                <Link
                  to={`/hospital/request-organ?organId=${organ._id}`}
                  className="block text-center bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 mt-4 rounded-lg transition"
                >
                  Request This Organ
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableOrgans;
