import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [stockInCount, setStockInCount] = useState(0);
  const [stockOutCount, setStockOutCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    // Check login
    const savedUser = localStorage.getItem("username");
    if (!savedUser) {
      navigate("/login");
    } else {
      setUsername(savedUser);
    }

    // Fetch Stock In data
    const fetchStockIn = async () => {
      try {
        const res = await axios.get("http://localhost:3000/stockin");
        const totalIn = res.data.reduce(
          (sum, item) => sum + Number(item.StockInQuantity || 0),
          0
        );
        setStockInCount(totalIn);
      } catch (error) {
        console.error("Failed to fetch Stock In data:", error);
      }
    };

    // Fetch Stock Out data
    const fetchStockOut = async () => {
      try {
        const res = await axios.get("http://localhost:3000/stockout");
        const totalOut = res.data.reduce(
          (sum, item) => sum + Number(item.StockOutQuantity || 0),
          0
        );
        setStockOutCount(totalOut);

        const totalRevenue = res.data.reduce((sum, item) => {
          return (
            sum +
            Number(item.StockOutQuantity || 0) *
              Number(item.StockOutUnitPrice || 0)
          );
        }, 0);
        setRevenue(totalRevenue);
      } catch (error) {
        console.error("Failed to fetch Stock Out data:", error);
      }
    };

    fetchStockIn();
    fetchStockOut();
  }, [navigate]);

  const formattedRevenue = revenue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">
          <i className="bi bi-speedometer2 me-2"></i> SIMS
          {username && (
            <small className="ms-3 text-secondary">Welcome, {username}!</small>
          )}
        </h1>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row g-4">
        {/* Stock In */}
        <div className="col-md-4">
          <div className="card text-white bg-success h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="bi bi-box-seam display-4 me-3"></i>
                <div>
                  <h5 className="card-title">Stock In</h5>
                  <p className="card-text fs-4">{stockInCount}</p>
                  <small>Items added this month</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Out */}
        <div className="col-md-4">
          <div className="card text-white bg-danger h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="bi bi-box-arrow-up display-4 me-3"></i>
                <div>
                  <h5 className="card-title">Stock Out</h5>
                  <p className="card-text fs-4">{stockOutCount}</p>
                  <small>Items removed this month</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="col-md-4">
          <div className="card text-white bg-info h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="bi bi-currency-dollar display-4 me-3"></i>
                <div>
                  <h5 className="card-title">Revenue</h5>
                  <p className="card-text fs-4">${formattedRevenue}</p>
                  <small>Estimated this month</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-5 p-4 bg-light rounded shadow-sm">
        <h4>
          <i className="bi bi-bar-chart-line me-2"></i> Recent Activity
        </h4>
        <ul className="list-group mt-3">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Added {stockInCount} items to Stock In
            <span className="badge bg-success rounded-pill">
              +{stockInCount}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Removed {stockOutCount} items from Stock Out
            <span className="badge bg-danger rounded-pill">
              -{stockOutCount}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Revenue reached ${formattedRevenue} today
            <span className="badge bg-info rounded-pill">
              ${formattedRevenue}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
