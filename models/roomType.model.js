import mongoose from 'mongoose';

const {Schema, model} =mongoose;

//creating the schma

const RoomTypeSchema = new Schema({
    
    name: {
        type: String,
        required:[true,"Please add a name field"],
        trim:true,
        unique:true,
        minlength: [3, "Name must be atlease 3 charaters"],
        
    },
}, {
    timestamps: true
});

export default model('RoomType', RoomTypeSchema);



