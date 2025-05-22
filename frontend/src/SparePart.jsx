import React, { useState, useEffect } from "react";
import axios from "axios";
// Make sure you have Bootstrap and Bootstrap Icons CSS loaded in your project
// e.g., in index.html or via npm:
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

function SparePart() {
  const [spareParts, setSpareParts] = useState([]);
  const [form, setForm] = useState({
    Name: "",
    Category: "",
    Quantity: "",
    UnitPrice: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchSpareParts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/spareparts");
      setSpareParts(res.data);
    } catch (error) {
      console.error("Error fetching spare parts:", error);
    }
  };

  useEffect(() => {
    fetchSpareParts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Name: form.Name,
      Category: form.Category,
      Quantity: Number(form.Quantity),
      UnitPrice: parseFloat(form.UnitPrice),
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/spareparts/${editId}`, payload);
      } else {
        await axios.post("http://localhost:3000/spareparts", payload);
      }
      setForm({ Name: "", Category: "", Quantity: "", UnitPrice: "" });
      setEditId(null);
      fetchSpareParts();
    } catch (error) {
      console.error("Error saving spare part:", error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      Name: item.Name || "",
      Category: item.Category || "",
      Quantity: item.Quantity != null ? item.Quantity.toString() : "",
      UnitPrice: item.UnitPrice != null ? item.UnitPrice.toString() : "",
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this spare part?")) return;
    try {
      await axios.delete(`http://localhost:3000/spareparts/${id}`);
      if (editId === id) {
        setEditId(null);
        setForm({ Name: "", Category: "", Quantity: "", UnitPrice: "" });
      }
      fetchSpareParts();
    } catch (error) {
      console.error("Error deleting spare part:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ Name: "", Category: "", Quantity: "", UnitPrice: "" });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary">Spare Parts Management</h2>

      <form onSubmit={handleSubmit} className="mb-4 row g-3 align-items-end">
        <div className="col-md-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            id="Name"
            name="Name"
            type="text"
            className="form-control"
            placeholder="Enter part name"
            value={form.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="Category" className="form-label">
            Category
          </label>
          <input
            id="Category"
            name="Category"
            type="text"
            className="form-control"
            placeholder="Enter category"
            value={form.Category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="Quantity" className="form-label">
            Quantity
          </label>
          <input
            id="Quantity"
            name="Quantity"
            type="number"
            className="form-control"
            placeholder="0"
            min="0"
            value={form.Quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="UnitPrice" className="form-label">
            Unit Price
          </label>
          <input
            id="UnitPrice"
            name="UnitPrice"
            type="number"
            step="0.01"
            min="0"
            className="form-control"
            placeholder="0.00"
            value={form.UnitPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-2 d-flex gap-2">
          <button type="submit" className={`btn ${editId ? "btn-warning" : "btn-primary"} flex-grow-1`}>
            <i className={`bi ${editId ? "bi-pencil-square" : "bi-plus-lg"} me-2`}></i>
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn btn-secondary"
              title="Cancel editing"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          )}
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th style={{ minWidth: "130px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {spareParts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No spare parts found.
                </td>
              </tr>
            ) : (
              spareParts.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Category}</td>
                  <td>{item.Quantity}</td>
                  <td>{item.UnitPrice != null ? Number(item.UnitPrice).toFixed(2) : "-"}</td>
                  <td>{item.TotalPrice != null ? Number(item.TotalPrice).toFixed(2) : "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      title="Edit"
                      onClick={() => handleEdit(item)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      title="Delete"
                      onClick={() => handleDelete(item.id)}
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
    </div>
  );
}

export default SparePart;
