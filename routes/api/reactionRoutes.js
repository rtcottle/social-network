const router = require('express').Router();
// TODO: update controller to be add and delete reaction
const {
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

// /api/thoughts/:thought-id/reactions
router.route('/reactions').post(createReaction);

// /api/thoughts/:thought-id/reactions/:reaction-id
router.route('/reactions/:reaction-id').delete(deleteReaction);

module.exports = router;
