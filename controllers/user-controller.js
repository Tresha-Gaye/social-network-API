const { User } = require('../models');


const userController = {
    //  get all user
    getAllUsers(req, res) {
        User.find({})
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUser) => res.json(dbUser))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one user by id
    getUserById({ params }, res) {
        // we destructure the `params` out of the Express.js `req` object since that's all we need
        User.findOne({ _id: params.id })
        .populate({
            path: "thoughts, friends",
            select: "-__v",
        })
        .select("-__v")
        .then((dbUser) => {
            // if no pizza id found, send 404
            if (!dbUser) {
            res.status(404).json({ message: "No user found with this id! " });
            return;
            }
            res.json(dbUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create new user - adds a user to the database
    createUser({ body }, res) {
        // we destructure the `body` out of the Express.js `req` object since that's all we need
        User.create(body) 
        .then((dbUser) => res.json(dbUser))
        .catch((err) => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }) 
        .then((dbUser) => {
            if (!dbUser) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
            }
            res.json(dbUser);
        })
        .catch((err) => res.status(400).json(err));
  },

    // delete user
    deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id }) 
        .then((dbUser) => {
            if (!dbUser) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
            }
            res.json(dbUser);
        })
        .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;

