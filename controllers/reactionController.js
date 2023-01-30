const { Reactions, Thoughts } = require('../models');

module.exports = {
  // create a new reaction
  createReaction(req, res) {
    Reactions.create(req.body)
      .then((reaction) => {
        return Thoughts.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $addToSet: { reactions: reaction._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Reaction created, but found no thought with that ID',
            })
          : res.json('Created the reaction!')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // updateReaction(req, res) {
  //   Reactions.findOneAndUpdate(
  //     { _id: req.params.reactionId },
  //     { $set: req.body },
  //     { runValidators: true, new: true }
  //   )
  //     .then((reaction) =>
  //       !reaction
  //         ? res.status(404).json({ message: 'No reaction with this id!' })
  //         : res.json(reaction)
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },
  deleteReaction(req, res) {
    Reactions.findOneAndRemove({ _id: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : User.findOneAndUpdate(
              { reactions: req.params.reactionId },
              { $pull: { reactions: req.params.reactionId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Reaction created but no user with this id!',
            })
          : res.json({ message: 'Reaction successfully deleted! ' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
