const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} = require('../controllers/noteController');



router.route('/').get(getNotes).post(createNotes);
router.route('/:id').put(updateNotes).delete(deleteNotes);

// the top part is much cleaner than the bottom part
// does the same thing

// router.get('/', getNotes);
// router.post('/', createNotes);
// router.put('/:id', updateNotes);
// router.delete('/:id', deleteNotes);

module.exports = router;
