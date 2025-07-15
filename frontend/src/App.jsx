import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import HospitalOrganRequest from './pages/hospital/HospitalOrganRequest';
import AvailableOrgans from './pages/hospital/AvailableOrgans';
import MyRequests from './pages/hospital/MyRequests';
import CentreDashboard from './pages/center/CentreDashboard';
import CentreRequests from './pages/center/CentreRequests';
import CentreMyOrgans from './pages/center/CentreMyOrgans';
import AddOrgan from './pages/center/AddOrgan';
import ScrollToTop from './components/ScrollToTop';

// ✅ New Protected Route components
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Hospital Protected Routes */}
          <Route
            path="/hospital/dashboard"
            element={
              <RoleProtectedRoute role="hospital">
                <HospitalDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/hospital/request-organ"
            element={
              <RoleProtectedRoute role="hospital">
                <HospitalOrganRequest />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/hospital/available-organs"
            element={
              <RoleProtectedRoute role="hospital">
                <AvailableOrgans />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/hospital/my-requests"
            element={
              <RoleProtectedRoute role="hospital">
                <MyRequests />
              </RoleProtectedRoute>
            }
          />

          {/* Center Protected Routes */}
          <Route
            path="/center/dashboard"
            element={
              <RoleProtectedRoute role="center">
                <CentreDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/center/requests"
            element={
              <RoleProtectedRoute role="center">
                <CentreRequests />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/center/my-organs"
            element={
              <RoleProtectedRoute role="center">
                <CentreMyOrgans />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/center/add-organ"
            element={
              <RoleProtectedRoute role="center">
                <AddOrgan />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
