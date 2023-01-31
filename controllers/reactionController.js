const { reactionSchema, Thoughts } = require('../models');

module.exports = {
  // create a new reaction
  createReaction(req, res) {
    reactionSchema
      .create(req.body)
      .then((reaction) => {
        return Thoughts.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $addToSet: { reactions: reactionId } },
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
    reactionSchema
      .findOneAndRemove({ _id: req.params.reactionId })
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
