import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: [true, 'First name is require.'],
        trim: true,
        text: true
    },
    middle_name: {
        type: String,
        trim: true,
        text: true
    },
    last_name: {
        type: String,
        require: [true, 'Last name is require.'],
        trim: true,
        text: true
    },
    username: {
        type: String,
        require: [true, 'Username name is require.'],
        trim: true,
        text: true,
        unique: true,
    },
    email: {
        type: String,
        require: [true, 'Email is require.'],
        trim: true,
    },
    password: {
        type: String,
        require: [true, 'Password require.']
    },
    picture: {
        type: String,
        default: 'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png'
    },
    cover: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        require: [true, 'Gender is require.'],
        trim: true,
        enum: ['Male', 'Female', 'Other'],
    },
    bYear: {
        type: Number,
        require: true,
        trim: true,
    },
    bMonth: {
        type: Number,
        require: true,
        trim: true,
    },
    bDay: {
        type: Number,
        require: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    friends: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    followers: {
        type: Array,
        default: [],
    },
    requests: {
        type: Array,
        default: [],
    },
    search: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        }
    ],
    details: {
        bio: {
            type: String,
        },
        otherName: {
            type: String,
        },
        job: {
            type: String,
        },
        workplace: {
            type: String,
        },
        highSchool: {
            type: String,
        },
        college: {
            type: String,
        },
        currentCity: {
            type: String,
        },
        hometown: {
            type: String,
        },
        relationship: {
            type: String,
            enum: ['Single', 'In a relationship', 'Married', 'Divorced']
        },
        instagram: {
            type: String,
        },
    },
    savedPosts: [
        {
            post: {
                type: ObjectId,
                ref: 'Post'
            }
        },
        {
            savedAt: {
                type: Date,
                default: new Date(),
            }
        }
    ],
},
{
    timestamps: true,
});

export default mongoose.model('User', userSchema);