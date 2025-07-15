import { Link } from 'react-router-dom';
import {
  FaHeartbeat,
  FaHospital,
  FaSearch,
  FaHandHoldingMedical,
  FaArrowRight,
} from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="bg-white text-blue-950">
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center px-4 py-24 bg-no-repeat bg-cover bg-center md:bg-center md:bg-cover"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1588776814546-cfe86f6c28e9?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-blue-950/70 backdrop-blur-sm"></div>

        <div className="relative z-10 text-center max-w-3xl px-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaHeartbeat className="text-4xl text-cyan-400 animate-pulse" />
            <h1 className="text-4xl font-bold text-cyan-400">OrganEase</h1>
          </div>

          <p className="text-blue-100 text-lg mb-6">Seamless. Secure. Life-saving.</p>

          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
            Revolutionizing Organ Request and Distribution
          </h2>

          <p className="text-blue-100 max-w-xl mx-auto mb-8">
            OrganEase connects procurement centers and hospitals instantly, matching compatible organs with those in need—faster than ever before.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-cyan-400 hover:bg-cyan-300 text-blue-950 font-bold px-6 py-2 rounded-lg transition duration-300 hover:scale-105 shadow"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-950 px-6 py-2 rounded-lg transition duration-300 hover:scale-105 shadow"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-blue-50">
        <h3 className="text-2xl font-bold text-center text-blue-950 mb-10">How It Works</h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center px-4">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <FaHospital className="text-4xl mx-auto text-cyan-500 mb-4" />
            <h4 className="text-xl font-semibold text-blue-900 mb-2">Hospitals Login</h4>
            <p className="text-blue-800 text-sm">
              Hospitals securely log in and request organs based on blood group and type.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <FaSearch className="text-4xl mx-auto text-cyan-500 mb-4" />
            <h4 className="text-xl font-semibold text-blue-900 mb-2">Auto Matching</h4>
            <p className="text-blue-800 text-sm">
              Our system auto-matches hospital requests with available organs nearby.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <FaHandHoldingMedical className="text-4xl mx-auto text-cyan-500 mb-4" />
            <h4 className="text-xl font-semibold text-blue-900 mb-2">Procurement Confirms</h4>
            <p className="text-blue-800 text-sm">
              Procurement centers review requests and confirm delivery in real time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-950 text-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Save Lives Smarter?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-100">
          Join OrganEase today and streamline organ requests and matches across hospitals and centers.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-cyan-400 text-blue-950 px-6 py-3 rounded-lg font-bold hover:bg-cyan-300 transition hover:scale-105"
        >
          Get Started <FaArrowRight />
        </Link>
      </section>
    </div>
  );
};

export default Landing;
