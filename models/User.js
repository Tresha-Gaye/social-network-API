const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is Required',
        trim: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
            }
        ],
    friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ],
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + users.friends.length + 1, 0);
  });

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;