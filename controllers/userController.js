const { User, Thought } = require("../models");

module.exports = {
    //    /api/users

    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            if (users) {
                return res.status(200).json(users);
            } else {
                return res.status(404);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // create a User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //    /api/users/:userId

    // get a user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({
                _id: req.params.userId,
            }).select("-__v");
            return !user
                ? res.status(404).json({ message: "Id not found" })
                : res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({
                _id: req.params.userId,
            });
            if (user) {
                // User.deleteMany({ _id: { $in: user.thoughts }});
                return res.status(200).json({ message: "User deleted" });
            } else {
                return res.status(404).json({ message: "Id not found" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ message: "Id not found" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //    /api/users/:userId/friends/:friendId

    // add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ message: "not valid" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // remove a friend
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ message: "not valid" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};
