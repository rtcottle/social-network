const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#008080',
    },
    createdAt: Date,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

reactionSchema
  .virtual('getTagCss')
  // Getter
  .get(function () {
    return `color: ${this.color}`;
  });

const Reaction = model('reactions', reactionSchema);

module.exports = Reaction;
