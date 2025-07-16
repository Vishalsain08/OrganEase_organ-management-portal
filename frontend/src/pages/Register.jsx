import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaUserPlus, FaHeartbeat } from 'react-icons/fa';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'hospital',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/register', form);
      const { token, user } = res.data;
      login(token, user.role, user);
      navigate(`/${form.role}/dashboard`);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-blue-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-100">

        {/* 💙 CTA Section Above the Form */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <FaUserPlus className="text-2xl text-cyan-500 animate-bounce" />
            <h2 className="text-xl font-bold text-cyan-700">Join OrganEase Today</h2>
          </div>
          <p className="text-sm text-gray-600">
            Save lives, streamline transplants, and join a powerful network of healthcare heroes. 💙
          </p>
        </div>

        {/* 📝 Registration Form */}
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-600">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
              placeholder="Enter your Email"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Register as</label>
            <select
              name="role"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
              onChange={handleChange}
            >
              <option value="hospital">Hospital</option>
              <option value="center">Procurement Center</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-[1.02] focus:outline-none"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-600 font-medium hover:underline hover:text-cyan-700">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
