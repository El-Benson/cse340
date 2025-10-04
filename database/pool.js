// database/index.js

const { Pool } = require("pg")
require("dotenv").config()

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Verify database connection
pool.connect()
  .then(() => {
    console.log("✅ Connected to the PostgreSQL database successfully.")
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message)
  })

// Export the pool for queries
module.exports = pool
