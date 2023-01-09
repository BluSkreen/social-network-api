const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
    //    /api/thoughts

    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            if (thoughts) {
                return res.status(200).json(thoughts);
            } else {
                return res.status(404);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            if (thought) {
                return res.status(200).json(thought);
            } else {
                return res.status(404);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //    /api/thoughts/:thoughtId

    // get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId,
            }).select("-__v");
            return !thought
                ? res.status(404).json({ message: "Id not found" })
                : res.status(200).json(thought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // delete a thought
    async removeThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.thoughtId,
            });
            if (thought) {
                return res.status(200).json({ message: "Thought deleted" });
            } else {
                return res.status(404).json({ message: "Id not found" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (thought) {
                return res.status(200).json(thought);
            } else {
                return res.status(404).json({ message: "Id not found" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //    /api/thoughts/:thoughtId/reactions

    // add a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (thought) {
                return res.status(200).json(thought);
            } else {
                return res.status(404).json({ message: "Id not found" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //    /api/thoughts/:thoughtId/reactions/:reactionId

    // remove a reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (thought) {
                return res.status(200).json(thought);
            } else {
                return res.status(404).json({ message: "Id not found" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};
