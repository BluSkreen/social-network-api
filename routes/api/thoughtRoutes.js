const router = require("express").Router();

const {
    createThought,
    getThoughts,
    getSingleThought,
    removeThought,
    updateThought,
    createReaction,
    removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
    .route("/:thoughtId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router
    .route("/thoughts/:thoughtId/reactions")
    .post(createReaction)
    .delete(removeReaction);

module.exports = router;
