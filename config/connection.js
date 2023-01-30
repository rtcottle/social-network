const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social-network', {
  // old: reactionThoughts
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
