import React, { useState, useEffect } from "react";
import axios from "axios";

function StockIn() {
  const [stockIns, setStockIns] = useState([]);
  const [form, setForm] = useState({
    StockInQuantity: "",
    StockInPrice: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchStockIns = async () => {
    try {
      const res = await axios.get("http://localhost:3000/stockin");
      setStockIns(res.data);
    } catch (error) {
      console.error("Error fetching stock-in records:", error);
    }
  };

  useEffect(() => {
    fetchStockIns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quantity = Number(form.StockInQuantity);
    const price = Number(form.StockInPrice);

    if (!quantity || !price) {
      alert("Please enter valid quantity and price.");
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/stockin/${editId}`, {
          StockInQuantity: quantity,
          StockInPrice: price,
        });
        alert("Stock In record updated.");
      } else {
        await axios.post("http://localhost:3000/stockin", {
          StockInQuantity: quantity,
          StockInPrice: price,
        });
        alert("Stock In record added.");
      }
      setForm({ StockInQuantity: "", StockInPrice: "" });
      setEditId(null);
      fetchStockIns();
    } catch (error) {
      console.error("Error saving stock-in record:", error.response?.data || error.message);
      alert("Failed to save stock-in record.");
    }
  };

  const handleEdit = (item) => {
    setForm({
      StockInQuantity: item.StockInQuantity.toString(),
      StockInPrice: item.StockInPrice.toString(),
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:3000/stockin/${id}`);
      if (editId === id) {
        setEditId(null);
        setForm({ StockInQuantity: "", StockInPrice: "" });
      }
      fetchStockIns();
    } catch (error) {
      console.error("Error deleting stock-in record:", error);
      alert("Failed to delete record.");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ StockInQuantity: "", StockInPrice: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Stock In Management</h2>

      <form onSubmit={handleSubmit} className="row g-3 align-items-center mb-4">
        <div className="col-auto">
          <input
            name="StockInQuantity"
            type="number"
            placeholder="Quantity"
            value={form.StockInQuantity}
            onChange={handleChange}
            min="1"
            required
            className="form-control"
          />
        </div>

        <div className="col-auto">
          <input
            name="StockInPrice"
            type="number"
            placeholder="Price"
            value={form.StockInPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
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
            <th>Price</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stockIns.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No stock-in records found.
              </td>
            </tr>
          ) : (
            stockIns.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.StockInQuantity}</td>
                <td>{item.StockInPrice.toFixed(2)}</td>
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

export default StockIn;
