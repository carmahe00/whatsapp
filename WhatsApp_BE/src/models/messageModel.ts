import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types

const messageSchema = new mongoose.Schema({
    sender:{
        type: ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        trim: true
    },
    conversation:{
        type: ObjectId,
        ref: "Conversation"
    },
    files: {
        type: Array,
        default: []
    }
},{
    collection: "messages",
    timestamps:true
})
export const MessageModel = mongoose.model('Message', messageSchema);