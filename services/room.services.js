
import Room from '../models/rooms.model.js';


export const checkExistingRoom = async ({name})=>{
   const existingRoom = await Room.findOne({name});
   return existingRoom
}

export const saveNewRoom = async ({name,roomType,price }) => {
   
  //create room
    const newRoom = await Room.create({ name,roomType,price });
    return newRoom;
  
};

export const fetchAllRooms = async (filters) => {
     const rooms = await Room.find(filters);
    return rooms;
  
};

export const uptoDateRoom = async (roomId, updateData) => {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, updateData, { new: true });
    return updatedRoom;
};

export const deleteRoomById = async (roomId) => {
  
    await Room.findByIdAndDelete(roomId);
    return "Deleted successfully";
};

export const getRoomById = async (roomId) => {
    const room = await Room.findById(roomId).populate('roomType').exec();
    return room;
 
};
