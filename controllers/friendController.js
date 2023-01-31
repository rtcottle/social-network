const { Friends, Users } = require('../models');

module.exports = {
  // add a friend
  addFriend(req, res) {
    Friends.create(req.body)
      .then((friend) => {
        return Users.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: friend._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Friend created, but no user with that id' })
          : res.json('Friend added!')
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete a friend
  deleteFriend(req, res) {
    Friends.findOneAndDelete({ _id: req.params.friendId })
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No friend with that id' })
          : Users.findOneAndUpdate(
              { friends: req.params.friendId },
              { $pull: { friends: req.params.friendId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Friend removed but no user with this id!' })
          : res.json({ message: 'Friend removed!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
