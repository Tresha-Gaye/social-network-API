const router = require('express').Router();
const { 
    getAllThoughts, 
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// Set up GET at /api/thoughts
router
  .route('/')
  .get(getAllThoughts);

// add new thought to user
router
  .route('/:userId')
  .post(addThought);

// remove a user's associated thoughts when deleted
router
  .route('/:userId/:thoughtId')
  .delete(removeThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought);

// add reactions to existing thoughts /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)

// delete reactions /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions/:reactionsId')
  .delete(removeReaction);

module.exports = router;