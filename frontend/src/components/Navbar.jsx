import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // ✅ Use Auth context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, userType, logout } = useAuth(); // ✅ Get from context

  const handleLogout = () => {
    logout();          // ✅ Clean logout using context
    setIsOpen(false);  // ✅ Close menu
    navigate('/');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-950 text-white shadow-md backdrop-blur-md border-b border-cyan-400/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FaHeartbeat className="text-2xl text-cyan-400 animate-pulse" />
          <span className="text-xl font-bold text-cyan-400">OrganEase</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          <Link to="/" className="hover:text-cyan-400 transition">Home</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-cyan-400 transition">Login</Link>
              <Link to="/register" className="hover:text-cyan-400 transition">Register</Link>
            </>
          ) : (
            <>
              <Link to={`/${userType}/dashboard`} className="hover:text-cyan-400 transition">
                {`${userType} Dashboard`}
              </Link>
              <button onClick={handleLogout} className="hover:text-red-400 transition">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-950 px-4 pb-4 space-y-3 font-medium">
          <Link to="/" onClick={toggleMenu} className="block hover:text-cyan-400">Home</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={toggleMenu} className="block hover:text-cyan-400">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="block hover:text-cyan-400">Register</Link>
            </>
          ) : (
            <>
              <Link
                to={`/${userType}/dashboard`}
                onClick={toggleMenu}
                className="block hover:text-cyan-400"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-left w-full hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
