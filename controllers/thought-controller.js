const { Thought, User } = require('../models');

const thoughtController = {

    //  get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThought) => res.json(dbThought))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get a thought by id
    getThoughtById({ params }, res) {
        // we destructure the `params` out of the Express.js `req` object since that's all we need
        Thought.findOne({ _id: params.id })
        .populate({
            path: "users",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThought) => {
            // if no thoughts id found, send 404
            if (!dbThought) {
            res.status(404).json({ message: "No thoughts found with this id! " });
            return;
            }
            res.json(dbThought);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // add thought to user
    addThought({ params, body }, res) {
    console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },  //the $push method adds data to an array (similar to js)
                { new: true }
            );
            })
            .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUser);
            })
            .catch(err => res.json(err));
    },

    // add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $addToSet: { reactions: body } },
                { new: true, runValidators: true }
    )
      .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => res.json(err));
    },

    // remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndDelete(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err));
    },

    // update thought
    // update user by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true }) 
            .then((dbThought) => {
                if (!dbThought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
                }
                res.json(dbThought);
            })
            .catch((err) => res.status(400).json(err));
    },


    // remove thought
    removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId }) // deletes the document then returns it's data
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },   
          { new: true }    
        );
      })
      .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUser);    //  & return the updated pizza to the user (witout comment)
      })
      .catch(err => res.json(err));
  }


}



module.exports = thoughtController;