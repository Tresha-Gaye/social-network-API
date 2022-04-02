const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent Thought _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: 'Username is required'
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }  
    },
    {
    toJSON: {
      getters: true
      },
      id: false
    }
);

const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
      username: {
        type: String,
        required: 'Username is required'
    },
      reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
        },
        id: false
});
    

// get total count of reactions on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;