const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
    //    /api/thoughts

    // get all thoughts
    async getThoughts(req, res) {
        
        try { 
            const users = await User.find()
            return res.status(500).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
    // create a thought
    async createThought(req, res) {
        
        try { 
            const users = await User.find()
            return res.status(500).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //    /api/thoughts/:thoughtId
    
    // get single thought
    async getSingleThought(req, res) {
        
        try { 
            const users = await User.find()
            return res.status(500).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
    // delete a thought
    async removeThought(req, res) {
        
        try { 
            const users = await User.find()
            return res.status(500).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // update a thought
    async updateThought(req, res) {
        
        try { 
            const users = await User.find()
            return res.status(500).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //    /api/thoughts/:thoughtId/reactions

    // add a reaction
    async createReaction(req, res) {
        
        try { 
            const users = await User.find()
            return res.status(500).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // remove a reaction
    async removeReaction(req, res) {
        
        try { 
            const users = await User.find()
            return res.status(500).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

};