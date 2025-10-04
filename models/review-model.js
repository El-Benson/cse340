const pool = require("../database/")

/* Insert new review */
async function addReview(review_text, inv_id, account_id) {
  try {
    const sql = `
      INSERT INTO review (review_text, inv_id, account_id)
      VALUES ($1, $2, $3) RETURNING *`
    const result = await pool.query(sql, [review_text, inv_id, account_id])
    return result.rows[0]
  } catch (error) {
    console.error("addReview error:", error.message)
    throw error
  }
}

/* Get reviews for one vehicle */
async function getReviewsByVehicle(inv_id) {
  try {
    const sql = `
      SELECT r.review_text, r.review_date, a.account_firstname, a.account_lastname
      FROM review AS r
      JOIN account AS a ON r.account_id = a.account_id
      WHERE r.inv_id = $1
      ORDER BY r.review_date DESC`
    const result = await pool.query(sql, [inv_id])
    return result.rows
  } catch (error) {
    console.error("getReviewsByVehicle error:", error.message)
    throw error
  }
}

module.exports = { addReview, getReviewsByVehicle }
