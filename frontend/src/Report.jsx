import React, { useEffect, useState } from 'react';

const Report = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/report/stock')
      .then(res => res.json())
      .then(data => {
        setReport(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch report:', err);
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-file-earmark-text me-2"></i>
          Spare Parts Stock Report
        </h2>
        <button onClick={handlePrint} className="btn btn-outline-secondary">
          <i className="bi bi-printer me-1"></i>
          Print Report
        </button>
      </div>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Stock In</th>
                <th>Stock Out</th>
                <th>Available Stock</th>
                <th>Unit Price</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {report.map((item) => {
                const availableStock = Math.max(0, item.AvailableStock);
                const totalStockValue = Math.max(0, parseFloat(item.TotalStockValue));

                return (
                  <tr key={item.SparePartID} className={availableStock === 0 ? 'table-danger' : ''}>
                    <td>{item.SparePartID}</td>
                    <td>{item.Name}</td>
                    <td>{item.Category}</td>
                    <td>{item.TotalStockIn}</td>
                    <td>{item.TotalStockOut}</td>
                    <td>{availableStock}</td>
                    <td>${parseFloat(item.UnitPrice).toFixed(2)}</td>
                    <td>${totalStockValue.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Report;
