require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connection pool (reuses connections, better than opening one each request)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "know_your_heroes",
  waitForConnections: true,
  connectionLimit: 10,
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

// GET all approved stories (public-facing, for the memorial page)
app.get("/api/stories", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, soldier_name, rank_or_role, conflict_or_war, date_of_loss, submitted_by, relation_to_soldier, story_text, photo_url, created_at FROM stories WHERE is_approved = TRUE ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

// GET a single story by id
app.get("/api/stories/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM stories WHERE id = ? AND is_approved = TRUE",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch story" });
  }
});

// POST a new story submission (goes in as unapproved, pending review)
app.post("/api/stories", async (req, res) => {
  const {
    soldier_name,
    rank_or_role,
    conflict_or_war,
    date_of_loss,
    submitted_by,
    relation_to_soldier,
    contact_email,
    story_text,
    photo_url,
  } = req.body;

  if (!soldier_name || !submitted_by || !story_text) {
    return res.status(400).json({
      error: "soldier_name, submitted_by, and story_text are required",
    });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO stories
        (soldier_name, rank_or_role, conflict_or_war, date_of_loss, submitted_by, relation_to_soldier, contact_email, story_text, photo_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        soldier_name,
        rank_or_role || null,
        conflict_or_war || null,
        date_of_loss || null,
        submitted_by,
        relation_to_soldier || null,
        contact_email || null,
        story_text,
        photo_url || null,
      ]
    );
    res.status(201).json({
      message: "Story submitted. It will appear after review.",
      id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit story" });
  }
});

// ADMIN: approve a story (you'd protect this route with auth in a real deployment)
app.patch("/api/stories/:id/approve", async (req, res) => {
  try {
    await pool.query("UPDATE stories SET is_approved = TRUE WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ message: "Story approved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to approve story" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});