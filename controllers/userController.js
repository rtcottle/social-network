const { Users, Thoughts } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    Users.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update existing user
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete a user and associated thoughts
  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: 'Users and associated thoughts deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // add a friend
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Friend created, but no user with that id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete a friend
  deleteFriend(req, res) {
    Users.findOne({ _id: req.params.friendId })
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
