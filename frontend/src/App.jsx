import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SparePart from './Sparepart';
import StockIn from './StockIn';
import StockOut from './StockOut';
import Dashboard from './Dashboard';
import Report from './Report';
import Login from './Login'; // Make sure Login component exists

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const tooltipTriggerList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')];
    tooltipTriggerList.forEach((t) => new bootstrap.Tooltip(t));
  }, [location]);

  const hideNavFooter = location.pathname === '/login';

  const handleLogout = () => {
    // Clear login tokens or any auth info here
    localStorage.removeItem('token'); // adjust key as needed
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavFooter && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <i className="bi bi-speedometer2 me-2 fs-4"></i> Inventory Manager
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto fs-5">
                <li className="nav-item">
                  <Link
                    to="/"
                    className={`nav-link${location.pathname === '/' ? ' active fw-bold text-warning' : ''}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Dashboard Overview"
                  >
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/sparepart"
                    className={`nav-link${location.pathname === '/sparepart' ? ' active fw-bold text-warning' : ''}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Manage Spare Parts"
                  >
                    <i className="bi bi-gear-fill me-1"></i> Spare Parts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/stockin"
                    className={`nav-link${location.pathname === '/stockin' ? ' active fw-bold text-warning' : ''}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Record Stock In"
                  >
                    <i className="bi bi-box-arrow-in-down me-1"></i> Stock In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/stockout"
                    className={`nav-link${location.pathname === '/stockout' ? ' active fw-bold text-warning' : ''}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Record Stock Out"
                  >
                    <i className="bi bi-box-arrow-up me-1"></i> Stock Out
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/report"
                    className={`nav-link${location.pathname === '/report' ? ' active fw-bold text-warning' : ''}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="View Reports"
                  >
                    <i className="bi bi-file-earmark-text me-1"></i> Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link btn btn-link text-danger"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Logout"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      <main
        className="flex-grow-1 container my-4 p-4 bg-white rounded shadow-sm"
        data-aos="fade-up"
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sparepart" element={<SparePart />} />
          <Route path="/stockin" element={<StockIn />} />
          <Route path="/stockout" element={<StockOut />} />
          <Route path="/report" element={<Report />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes if needed */}
        </Routes>
      </main>

      {!hideNavFooter && (
        <footer className="bg-primary text-white text-center py-3 mt-auto">
          <div className="container">
            <p className="mb-1">&copy; {new Date().getFullYear()} Inventory Manager</p>
            <p className="mb-0">
              <a
                href="#"
                className="text-white me-3"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="text-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Twitter"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
