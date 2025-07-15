import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';
import { FaHeartbeat, FaUser, FaTint, FaCommentMedical } from 'react-icons/fa';

const HospitalOrganRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const organId = new URLSearchParams(location.search).get('organId');

  const [organ, setOrgan] = useState(null);
  const [form, setForm] = useState({
    patientName: '',
    patientBloodGroup: '',
    reason: '',
  });

  useEffect(() => {
    const fetchOrgan = async () => {
      try {
        const res = await axiosInstance.get('/organs');
        const found = res.data.find((org) => org._id === organId);
        if (found) setOrgan(found);
      } catch (err) {
        console.error(err);
      }
    };
    if (organId) fetchOrgan();
  }, [organId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/requests', {
        organId,
        ...form,
      });
      toast.success('Organ request submitted!');
      navigate('/hospital/my-requests');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-xl border-l-4 border-cyan-500 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <FaHeartbeat className="text-3xl text-cyan-500 animate-pulse" />
          <h2 className="text-3xl font-bold text-blue-900">Organ Request Form</h2>
        </div>

        {/* Organ Info */}
        {organ && (
          <div className="bg-cyan-50 text-blue-900 text-sm p-4 mb-6 rounded-lg border border-cyan-200">
            <p><strong>Organ:</strong> {organ.organType}</p>
            <p><strong>Blood Group:</strong> {organ.bloodGroup}</p>
            <p><strong>Donor Age:</strong> {organ.donorAge || 'N/A'}</p>
            <p><strong>Center:</strong> {organ.center?.name}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-blue-800">
              <FaUser className="inline mr-2 text-cyan-600" />
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              placeholder="Patient's Full Name"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-blue-800">
              <FaTint className="inline mr-2 text-red-500" />
              Patient Blood Group
            </label>
            <input
              type="text"
              name="patientBloodGroup"
              value={form.patientBloodGroup}
              onChange={handleChange}
              placeholder="E.g. A+, O-"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-blue-800">
              <FaCommentMedical className="inline mr-2 text-blue-500" />
              Reason for Request
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Explain the medical urgency"
              rows={4}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-[1.02] focus:outline-none"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default HospitalOrganRequest;
