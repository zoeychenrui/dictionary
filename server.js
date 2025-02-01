import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const app = express();

// Use the dynamic port Render provides, or fallback to 5001 for local development
const port = process.env.PORT || 5001;  // Render will provide a dynamic port in production

app.use(cors());
app.use(express.json());

// Connect to PostgreSQL using the DATABASE_URL provided by Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // This should be set in Render's environment variables
  ssl: { rejectUnauthorized: false },  // Required for Render's PostgreSQL connection
});

pool.connect()
  .then(() => {
    console.log('Successfully connected to the database!');
  })
  .catch((err) => {
    console.error('Error connecting to the database: ', err.message);
  });

// API Route: Fetch all dictionary words
app.get("/api/dictionary", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dictionary ORDER BY term;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API Route: Fetch a single dictionary term by slug
app.get("/api/dictionary/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await pool.query("SELECT * FROM dictionary WHERE term = $1;", [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Word not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Listen on the dynamic port assigned by Render (or fallback to 5001 for local development)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
