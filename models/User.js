const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const FriendSchema = new Schema ({
    friendsId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: () => new Types.ObjectId(),
        required: true
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
          }
});

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is Required',
        trim: true
    },
    email: {
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
    friends: [ FriendSchema ],
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;