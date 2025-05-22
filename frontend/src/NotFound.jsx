import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <div className="animated-box">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h3 className="mb-3 text-white">Oops! Page Not Found</h3>
        <p className="text-light mb-4">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          className="btn btn-outline-light btn-lg animated-btn"
          onClick={() => navigate("/")}
        >
          🔙 Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
