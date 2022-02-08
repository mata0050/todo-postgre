const asyncHandler = require('express-async-handler');

// @route    GET /api/goals
// @desc     Get all notes
// @access   Public
const getNotes = asyncHandler(async (req, res) => {
  res.status(200).json({ mes: 'hellooo' });
});

// @route    GET
// @desc     ALL lessons in the  school, admin only
// @access   Public
const createNotes = asyncHandler(async (req, res) => {
  if (!req.body.note) {
    res.status(400);
    throw new Error('Please add a note');
  }
  res.status(200).json({ mes: 'create' });
});

// @route    GET
// @desc     ALL lessons in the  school, admin only
// @access   Public
const updateNotes = asyncHandler(async (req, res) => {
  res.status(200).json({ mes: 'update' });
});

// @route    GET
// @desc     ALL lessons in the  school, admin only
// @access   Public
const deleteNotes = asyncHandler(async (req, res) => {
  res.status(200).json({ mes: 'delete' });
});

module.exports = {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
};
