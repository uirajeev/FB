import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const codeSchema = mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Code', codeSchema);