import { FaGithub, FaLinkedin, FaTwitter, FaHandHoldingMedical } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-blue-900 via-cyan-800 to-blue-700 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Left: Branding + Your Identity */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <FaHandHoldingMedical className="text-cyan-300 text-2xl" />
            <h1 className="text-2xl font-extrabold text-cyan-300">OrganEase</h1>
          </div>
          <p className="text-sm text-blue-100">© {new Date().getFullYear()} OrganEase. All rights reserved.</p>
          <p className="text-sm mt-1 text-blue-200">Built with 💙 by <span className="font-semibold text-cyan-300">Vishal Sain</span></p>
        </div>

        {/* Center: Contact Info */}
        <div className="text-sm space-y-2">
          <h2 className="text-lg font-semibold text-white mb-1">Contact Me</h2>
          <p>📧 <a href="mailto:vishalsain.dev@gmail.com" className="text-cyan-300 hover:underline">vishalsain.dev@gmail.com</a></p>
          <p>📞 <a href="tel:+911234567890" className="text-cyan-300 hover:underline">+91 12345 67890</a></p>
        </div>

        {/* Right: Social Links */}
        <div className="flex flex-col items-center md:items-end space-y-2">
          <h2 className="text-lg font-semibold text-white">Connect With Me</h2>
          <div className="flex space-x-5 text-xl text-blue-100">
            <a
              href="https://github.com/Vishalsain08"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-transform transform hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/vishal-sain-733793290/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-transform transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/vishalsain_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-transform transform hover:scale-110"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
