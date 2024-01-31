import mongoose from 'mongoose';
import validator from 'validator'
import { Password } from '../services/password.service';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        lowercase: [true],
        trim: [true],
        type: String,
        required: [true, "Please provide your email address"],
        unique: [true, "This email address already exist"],
        validate: [validator.isEmail, "Email invalid"]
    },
    picture:{
        type: String,
        default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
    },
    status: {
        type: String,
        default: "Hey there ! I'm using whatsapp."
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [6, "Please make your password is atleast 6 characters long"]
    }
},{
    collection: "users",
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.password
        },
        versionKey: false
    }
})

// Middleware to save hash password
userSchema.pre('save',async function (done) {
    if(this.isModified('password') && this.get('password')){
        const hashed = await Password.toHash(this.get('password')!)
        this.set('password', hashed)
    }
    done()
})

export const UserModel = mongoose.model('User', userSchema);
