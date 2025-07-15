import { useState } from 'react';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AddOrgan = () => {
  const [form, setForm] = useState({
    organType: '',
    bloodGroup: '',
    donorAge: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/organs/add', form);
      toast.success('Organ added successfully!');
      setForm({ organType: '', bloodGroup: '', donorAge: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add organ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-white flex items-center justify-center px-4 py-20 text-blue-950">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md border border-cyan-200 rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <FaPlusCircle className="text-2xl text-cyan-500" />
            <h2 className="text-2xl font-bold text-cyan-600">Add New Organ</h2>
          </div>
          <p className="text-sm text-gray-600">Submit a new organ entry from your center</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Organ Type</label>
            <input
              type="text"
              name="organType"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
              placeholder="e.g., Kidney, Liver"
              value={form.organType}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
              placeholder="e.g., A+, O-"
              value={form.bloodGroup}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Donor Age <span className="text-gray-400 text-sm">(Optional)</span></label>
            <input
              type="number"
              name="donorAge"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
              placeholder="e.g., 35"
              value={form.donorAge}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-[1.02] focus:outline-none"
          >
            {loading ? 'Adding Organ...' : 'Add Organ'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddOrgan;
