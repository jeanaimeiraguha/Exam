import React, { useState, useEffect } from "react";
import axios from "axios";

function StockOut() {
  const [stockOuts, setStockOuts] = useState([]);
  const [form, setForm] = useState({
    StockOutQuantity: "",
    StockOutUnitPrice: "",
    StockOutDate: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchStockOuts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/stockout");
      setStockOuts(res.data);
    } catch (error) {
      console.error("Error fetching stock out records:", error);
    }
  };

  useEffect(() => {
    fetchStockOuts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quantity = Number(form.StockOutQuantity);
    const unitPrice = Number(form.StockOutUnitPrice);
    const date = form.StockOutDate;

    if (!quantity || !unitPrice || !date) {
      alert("Please provide valid quantity, unit price, and date.");
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/stockout/${editId}`, {
          StockOutQuantity: quantity,
          StockOutUnitPrice: unitPrice,
          StockOutDate: date,
        });
        alert("Stock Out record updated.");
      } else {
        await axios.post("http://localhost:3000/stockout", {
          StockOutQuantity: quantity,
          StockOutUnitPrice: unitPrice,
          StockOutDate: date,
        });
        alert("Stock Out record added.");
      }

      setForm({ StockOutQuantity: "", StockOutUnitPrice: "", StockOutDate: "" });
      setEditId(null);
      fetchStockOuts();
    } catch (error) {
      console.error("Error saving stock out record:", error.response?.data || error.message);
      alert("Failed to save stock out record.");
    }
  };

  const handleEdit = (item) => {
    setForm({
      StockOutQuantity: item.StockOutQuantity.toString(),
      StockOutUnitPrice: item.StockOutUnitPrice.toString(),
      StockOutDate: item.StockOutDate.slice(0, 10),
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:3000/stockout/${id}`);
      if (editId === id) {
        setEditId(null);
        setForm({ StockOutQuantity: "", StockOutUnitPrice: "", StockOutDate: "" });
      }
      fetchStockOuts();
    } catch (error) {
      console.error("Error deleting stock out record:", error);
      alert("Failed to delete record.");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ StockOutQuantity: "", StockOutUnitPrice: "", StockOutDate: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Stock Out Management</h2>

      <form onSubmit={handleSubmit} className="row g-3 align-items-center mb-4">
        <div className="col-auto">
          <input
            name="StockOutQuantity"
            type="number"
            placeholder="Quantity"
            value={form.StockOutQuantity}
            onChange={handleChange}
            min="1"
            required
            className="form-control"
          />
        </div>

        <div className="col-auto">
          <input
            name="StockOutUnitPrice"
            type="number"
            placeholder="Unit Price"
            value={form.StockOutUnitPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="form-control"
          />
        </div>

        <div className="col-auto">
          <input
            name="StockOutDate"
            type="date"
            value={form.StockOutDate}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-auto">
          <button type="submit" className={`btn ${editId ? "btn-warning" : "btn-success"}`}>
            {editId ? (
              <>
                <i className="bi bi-pencil-square me-1"></i> Update
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-1"></i> Add
              </>
            )}
          </button>

          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn btn-secondary ms-2"
            >
              <i className="bi bi-x-circle me-1"></i> Cancel
            </button>
          )}
        </div>
      </form>

      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Date</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stockOuts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No stock out records found.
              </td>
            </tr>
          ) : (
            stockOuts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.StockOutQuantity}</td>
                <td>{item.StockOutUnitPrice.toFixed(2)}</td>
                <td>{item.StockOutDate.slice(0, 10)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(item)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockOut;
