const router = require('express').Router();
const {
  addFriend,
  deleteFriend,
} = require('../../controllers/friendController');

// /api/users/:userId/friends/:friend-id
router.route('/friends/:friend-id').post(addFriend).delete(deleteFriend);

module.exports = router;
