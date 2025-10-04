// database/index.js
const { Pool } = require("pg")
require("dotenv").config()

// Render provides DATABASE_URL automatically if linked to a PostgreSQL instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Optional: log connection success
pool.connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch(err => console.error("❌ Database connection error:", err))

module.exports = pool
