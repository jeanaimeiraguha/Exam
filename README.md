# 🛠️ Stock Inventory Management System (SIMS)

A simple and efficient backend system built with **Node.js** and **MySQL** to manage spare parts inventory including stock-in, stock-out operations, and reports.

## 📂 Project Structure


---

## 📦 Features

### 🔧 Spare Parts Management
- Add new spare parts
- View all spare parts
- Update spare part details
- Delete spare parts

### 📥 Stock In
- Record stock in for spare parts
- Track quantity, date, and supplier
- View all stock-in entries

### 📤 Stock Out
- Record stock out for spare parts
- Track usage, receiver, and date
- View all stock-out records

### 📊 Reports
- Generate reports on:
  - Current stock levels
  - Stock-in and stock-out history
  - Most used spare parts

---

## 🗃️ Database Tables

### 1. `Spare_Part`
| Column         | Type        | Description               |
|----------------|-------------|---------------------------|
| id             | INT         | Primary Key               |
| name           | VARCHAR     | Name of the spare part    |
| description    | TEXT        | Details about the part    |
| quantity       | INT         | Current stock quantity    |

### 2. `Stock_in`
| Column         | Type        | Description                |
|----------------|-------------|----------------------------|
| id             | INT         | Primary Key                |
| part_id        | INT         | Foreign Key to Spare_Part  |
| quantity       | INT         | Quantity received          |
| supplier       | VARCHAR     | Supplier name              |
| date           | DATE        | Date of stock in           |

### 3. `Stock_out`
| Column         | Type        | Description                |
|----------------|-------------|----------------------------|
| id             | INT         | Primary Key                |
| part_id        | INT         | Foreign Key to Spare_Part  |
| quantity       | INT         | Quantity used              |
| receiver       | VARCHAR     | Person or department       |
| date           | DATE        | Date of stock out          |

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MySQL

👨‍💻 Author
Iraguha Jean Aime

### Installation

```bash
git clone https://github.com/jeanaimeiraguha/Exam
cd inventory-system
npm install
