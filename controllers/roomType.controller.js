import asyncHandler from 'express-async-handler';
import { saveNewRoomType, fetchAllRoomTypes, uptoDateRoomType } from '../services/roomType.service.js';
import { checkExistingRoom } from '../services/room.services.js';

// Create RoomType
export const createRoomType = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new Error("Fill all fields");
  }

  //checking number of charaters in name
  if (name < 3) {
    res.status(400);
    throw new Error("Name field must be atleaset 3 charaters")
  }

  //checking if roomType exist with same name field
  const existsRoomType = await checkExistingRoom({name})
  if(existsRoomType){
    throw new Error("Room Type already exist with same name")
  }

  
 //create roomType
  try {
    const newRoomType = await saveNewRoomType({ name });
    res.status(201).json(newRoomType);
  } catch (error) {
    res.status(500);
    throw new Error("Invalid data");
  }
});
// Update room
export const updatedRoomType = asyncHandler(async (req, res) => {
  try {
    const updatedRoomType = await uptoDateRoomType(req.params.roomTypeId, req.body);
    res.status(200).json(updatedRoomType);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Delete Room
export const deleteRoomTypeById = asyncHandler(async (req, res) => {
  try {
    const message = await deleteRoomTypeById(req.params.roomId);
    res.status(200).json(message);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Get All RoomTypes
export const getAllRoomsType = asyncHandler(async (req, res) => {
  try {
    const roomTypes = await fetchAllRoomTypes();
    res.status(200).json(roomTypes);
  } catch (error) {
    res.status(500);
    throw new Error("Room types not found");
  }
});
