const asyncHandler = require('express-async-handler');

// connect DB
const pool = require('../config/db');

// @route    GET /api/goals
// @desc     Get all notes
// @access   Public
const getNotes = asyncHandler(async (req, res) => {
  const queryString = 'SELECT * FROM notes';
  const { rows } = await pool.query(queryString);
  res.status(200).json(rows);
});

// @route    GET
// @desc     ALL lessons in the  school, admin only
// @access   Public
const createNotes = asyncHandler(async (req, res) => {
  const { note } = req.body;
  if (!note) {
    res.status(400);
    throw new Error('Please add a note');
  }
  const queryString = 'INSERT INTO notes (note) VALUES ($1) RETURNING *';
  const { rows } = await pool.query(queryString, [note]);
  res.status(200).json(rows);
});

// @route    GET
// @desc     ALL lessons in the  school, admin only
// @access   Public
const updateNotes = asyncHandler(async (req, res) => {
  const { note } = req.body;
  const { id } = req.params;

  if (!note) {
    res.status(400);
    throw new Error('Please add a note');
  }
  const queryString = 'UPDATE notes SET note = $1 WHERE id = $2 RETURNING *';
  const { rows } = await pool.query(queryString, [note, id]);
  res.status(200).json(rows);
});

// @route    GET
// @desc     ALL lessons in the  school, admin only
// @access   Public
const deleteNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const queryString = 'DELETE FROM notes WHERE id = $1 RETURNING *';
  const { rows } = await pool.query(queryString, [id]);
  res.status(200).json({ msg: 'Delete was successful' });
});

module.exports = {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
};
