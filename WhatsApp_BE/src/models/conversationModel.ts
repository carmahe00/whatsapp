import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Conversation name is required"],
    },
    isGroup: {
        type: Boolean,
        required: true,
        default: false
    },
    users:[
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    latestMessage:{
        type: mongoose.Types.ObjectId,
        ref: "MessageModel"
    },
    admin:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},{
    collection: "conversation",
    timestamps: true,
    
})

export const ConversationModel = mongoose.model('Conversation', conversationSchema);