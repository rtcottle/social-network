const router = require('express').Router();
const {
  createFriend,
  deleteFriend,
} = require('../../controllers/fiendsController');

// /api/users/:userId/friends/:friend-id
router.route('/friends/:friend-id').post(createFriend).delete(deleteFriend);

module.exports = router;
