// TODO: add friend controller here.
const { Friend, User } = require('../models');

module.exports = {
  // Get all users
  // NOT SURE THIS IS NEEDED -->
  // getUsers(req, res) {
  //   User.find()
  //     .then((users) => res.json(users))
  //     .catch((err) => res.status(500).json(err));
  // },
  // Get a single user
  addFriend(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No friend with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new friend
  // TODO: steps: create friend, tie to user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a friend
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No friend with that ID' })
          : Thoughts.deleteMany({ _id: { $in: user.applications } })
      )
      .then(() => res.json({ message: 'Friend removed!' }))
      .catch((err) => res.status(500).json(err));
  },
};
