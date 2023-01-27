const { Reactions, Thoughts } = require('../models');

module.exports = {
  getReactions(req, res) {
    Reactions.find({})
      .select('-__v')
      .then((reactions) => res.json(reactions))
      .catch((err) => res.status(500).json(err));
  },
  getSingleReaction(req, res) {
    Reactions.findOne({ _id: req.params.reactionId })
      .select('-__v')
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
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
  updateReaction(req, res) {
    Reactions.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(reaction)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
