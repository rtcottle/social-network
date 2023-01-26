const router = require('express').Router();
const {
  getReactions,
  getSingleReaction,
  createReaction,
} = require('../../controllers/reactionController');

// /api/users
router.route('/').get(getReactions).post(createReaction);

// /api/users/:userId
router.route('/:userId').get(getSingleReaction);

module.exports = router;
