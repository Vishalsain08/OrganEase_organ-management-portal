import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'hospital' });
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
      const res = await axiosInstance.post('/auth/login', form);
      const { token,user } = res.data;
      login(token, form.role,user);
      navigate(`/${form.role}/dashboard`);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-blue-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-600">OrganEase Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Login as</label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 outline-none transition duration-300 hover:border-cyan-400 shadow-sm"
            >
              <option value="hospital">Hospital</option>
              <option value="center">Center</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-[1.02] focus:outline-none"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-cyan-600 font-medium hover:underline hover:text-cyan-700">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
