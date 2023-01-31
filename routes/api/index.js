const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/thoughts/:thoughtId', reactionRoutes);
router.use('/users', userRoutes);
router.use('/users/:userId', friendRoutes);

module.exports = router;
