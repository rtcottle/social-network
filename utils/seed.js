const connection = require('../config/connection');
const { Thoughts, Reactions } = require('../models');
// Import functions for seed data
const { getRandomColor, getRandomThought, genRandomIndex } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await Thoughts.deleteMany({});
  await Reactions.deleteMany({});

  // Empty arrays for randomly generated thoughts and reactions
  const reactions = [];
  const thoughts = [];

  // Function to make a thought object and push it into the thoughts array
  const makeThought = (text) => {
    thoughts.push({
      published: Math.random() < 0.5,
      text,
      reactions: [reactions[genRandomIndex(reactions)]._id],
    });
  };

  // Create 20 random reactions and push them into the reactions array
  for (let i = 0; i < 20; i++) {
    const reactionname = getRandomColor();

    reactions.push({
      reactionname,
      color: reactionname,
    });
  }

  // Wait for the reactions to be inserted into the database
  await Reactions.collection.insertMany(reactions);

  // For each of the reactions that exist, make a random thought of length 50
  reactions.forEach(() => makeThought(getRandomThought(50)));

  // Wait for the thoughts array to be inserted into the database
  await Thoughts.collection.insertMany(thoughts);

  // Log out a pretty table for reactions and thoughts, excluding the excessively long text property
  console.table(reactions);
  console.table(thoughts, ['published', 'reactions', '_id']);
  console.timeEnd('seeding');
  process.exit(0);
});
