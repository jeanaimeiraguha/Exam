import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sims',
});

db.connect((err) => {
  if (err) {
    console.log('Connection failed:', err);
  } else {
    console.log('Connected to SIMS database');
  }
});

/////////////////////////// SPARE PART /////////////////////////////

// Create Spare Part (do NOT insert TotalPrice)
app.post('/spareparts', (req, res) => {
  const { Name, Category, Quantity, UnitPrice } = req.body;

  if (!Name || !Category || Quantity == null || UnitPrice == null) {
    return res
      .status(400)
      .json({ error: 'Please provide Name, Category, Quantity and UnitPrice' });
  }

  const sql = `INSERT INTO Spare_Part (Name, Category, Quantity, UnitPrice) VALUES (?, ?, ?, ?)`;
  db.query(sql, [Name, Category, Quantity, UnitPrice], (err, result) => {
    if (err) {
      console.error('Error inserting spare part:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Spare part created', id: result.insertId });
  });
});

// Get All Spare Parts
app.get('/spareparts', (req, res) => {
  db.query('SELECT * FROM Spare_Part', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get Spare Part by ID
app.get('/spareparts/:id', (req, res) => {
  db.query('SELECT * FROM Spare_Part WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(result[0]);
  });
});

// Update Spare Part (do NOT update TotalPrice)
app.put('/spareparts/:id', (req, res) => {
  const { Name, Category, Quantity, UnitPrice } = req.body;

  if (!Name || !Category || Quantity == null || UnitPrice == null) {
    return res
      .status(400)
      .json({ error: 'Please provide Name, Category, Quantity and UnitPrice' });
  }

  const sql = `UPDATE Spare_Part SET Name=?, Category=?, Quantity=?, UnitPrice=? WHERE id=?`;
  db.query(sql, [Name, Category, Quantity, UnitPrice, req.params.id], (err) => {
    if (err) {
      console.error('Error updating spare part:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Spare part updated' });
  });
});

// Delete Spare Part
app.delete('/spareparts/:id', (req, res) => {
  db.query('DELETE FROM Spare_Part WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Spare part deleted' });
  });
});

/////////////////////////// STOCK IN /////////////////////////////

// Create Stock In Record
app.post('/stockin', (req, res) => {
  const { StockInQuantity, StockInPrice } = req.body;

  if (StockInQuantity == null || StockInPrice == null) {
    return res.status(400).json({ error: 'Please provide StockInQuantity and StockInPrice' });
  }

  const sql = 'INSERT INTO Stock_in (StockInQuantity, StockInPrice) VALUES (?, ?)';
  db.query(sql, [StockInQuantity, StockInPrice], (err, result) => {
    if (err) {
      console.error('Error inserting stock in:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Stock In recorded', id: result.insertId });
  });
});

// Get All Stock In
app.get('/stockin', (req, res) => {
  db.query('SELECT * FROM Stock_in', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get Stock In by ID
app.get('/stockin/:id', (req, res) => {
  db.query('SELECT * FROM Stock_in WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(result[0]);
  });
});

// Update Stock In
app.put('/stockin/:id', (req, res) => {
  const { StockInQuantity, StockInPrice } = req.body;

  if (StockInQuantity == null || StockInPrice == null) {
    return res.status(400).json({ error: 'Please provide StockInQuantity and StockInPrice' });
  }

  const sql = 'UPDATE Stock_in SET StockInQuantity=?, StockInPrice=? WHERE id=?';
  db.query(sql, [StockInQuantity, StockInPrice, req.params.id], (err) => {
    if (err) {
      console.error('Error updating stock in:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Stock In updated' });
  });
});

// Delete Stock In
app.delete('/stockin/:id', (req, res) => {
  db.query('DELETE FROM Stock_in WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Stock In record deleted' });
  });
});

/////////////////////////// STOCK OUT /////////////////////////////

// Create Stock Out Record
app.post('/stockout', (req, res) => {
  const { StockOutQuantity, StockOutUnitPrice, StockOutDate } = req.body;

  if (StockOutQuantity == null || StockOutUnitPrice == null || !StockOutDate) {
    return res
      .status(400)
      .json({ error: 'Please provide StockOutQuantity, StockOutUnitPrice, and StockOutDate' });
  }

  const sql =
    'INSERT INTO Stock_out (StockOutQuantity, StockOutUnitPrice, StockOutDate) VALUES (?, ?, ?)';
  db.query(sql, [StockOutQuantity, StockOutUnitPrice, StockOutDate], (err, result) => {
    if (err) {
      console.error('Error inserting stock out:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Stock Out recorded', id: result.insertId });
  });
});

// Get All Stock Out
app.get('/stockout', (req, res) => {
  db.query('SELECT * FROM Stock_out', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get Stock Out by ID
app.get('/stockout/:id', (req, res) => {
  db.query('SELECT * FROM Stock_out WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(result[0]);
  });
});

// Update Stock Out
app.put('/stockout/:id', (req, res) => {
  const { StockOutQuantity, StockOutUnitPrice, StockOutDate } = req.body;

  if (StockOutQuantity == null || StockOutUnitPrice == null || !StockOutDate) {
    return res
      .status(400)
      .json({ error: 'Please provide StockOutQuantity, StockOutUnitPrice, and StockOutDate' });
  }

  const sql =
    'UPDATE Stock_out SET StockOutQuantity=?, StockOutUnitPrice=?, StockOutDate=? WHERE id=?';
  db.query(
    sql,
    [StockOutQuantity, StockOutUnitPrice, StockOutDate, req.params.id],
    (err) => {
      if (err) {
        console.error('Error updating stock out:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Stock Out updated' });
    }
  );
});

// Delete Stock Out
app.delete('/stockout/:id', (req, res) => {
  db.query('DELETE FROM Stock_out WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Stock out record deleted' });
  });
});



////////////////login and register 




app.post('/login', (req, res) => {
    const sql = "SELECT * FROM admin WHERE name = ? AND password = ?";
    const { name, password } = req.body;

    db.query(sql, [name, password], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json(result);
    });
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO admin (name,password)  VALUES(?,?)";
    const { name, password } = req.body;

    db.query(sql, [name, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        return res.status(200).json(result);
    });
});

/////////////////////////// SERVER /////////////////////////////
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
