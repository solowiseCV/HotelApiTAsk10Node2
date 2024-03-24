import mongoose from 'mongoose';
const {Schema,model}= mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please enter the name field"],
        trim:true,
        minlength:[5,"Name must be atleast 5 characters"],
    },
    email:{
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        trim: true,
        match: [(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )]
    },
    password: {
        type: String,
        required: [true,"please provide your password"],
    },
    role:{
        type: String,
        required: true,
        default: "guest",
        enum: ["guest","admin"]
    }

},{timestamps: true});


export default model('User', userSchema);
