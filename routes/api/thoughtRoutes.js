const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thought-id
router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;
