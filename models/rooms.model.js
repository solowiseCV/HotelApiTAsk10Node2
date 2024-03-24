import mongoose  from 'mongoose';

const {Schema, model} = mongoose;



const RoomSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please fill the name field"],
        minlength: [3, "Name must be atlease 3 charaters"],
        trim: true,
        unique:true,
    },
    roomType: { 
        type: Schema.Types.ObjectId,
        ref: 'RoomType',
    },
    price: {
        type: Number,
        required: [true, "Please input the price"],
    },
}, {
    timestamps: true
});




export default model('Room', RoomSchema);


