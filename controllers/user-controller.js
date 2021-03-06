const res = require('express/lib/response');
const { User, Thought } = require('../models');


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
            path: "thoughts friends",
            select: "-__v",
        })
        .select("-__v")
        .then((dbUser) => {
            // if no user id found, send 404
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
        console.log(body);
        User.create(body) 
        .then((dbUser) => res.json(dbUser))
        .catch((err) => {
        console.log(err, 'not creating user');
        res.status(400).json(err)
        });
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
                console.log("deleted the user successfully", dbUser);
                return Thought.deleteMany({ _id: dbUser.thoughts })
                
                // res.json(dbUser);
            })
            .then((deletedThoughts)=> {
              res.json({ message: "deleted user and it's associated thoughts" })
                console.log(deletedThoughts);
            })
            .catch((err) => res.status(400).json(err));
    },

    // add new friend to user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $addToSet: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .populate({
            path: "friends",
            select: "-__v"
          })
          .select("-__v")
          .then(dbUser => {
            if (!dbUser) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUser);
          })
          .catch((err) => {
              console.log(err);
              res.json(err);
          });
    },

    // remove friend from user's friend list
    removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true,  runValidators: true }
    )
        .then((dbUser) => {
          if(!dbUser) {
              res.status(404).json({ message: "No friend found with this ID."});
              return;
            }
          console.log(dbUser)
          res.json(dbUser);
        })
        .catch(err => res.json(err));
    },

};

module.exports = userController;

