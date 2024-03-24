
import asyncHandler from 'express-async-handler';
import { saveNewRoom, fetchAllRooms, uptoDateRoom, deleteRoomById, getRoomById, checkExistingRoom,  } from '../services/room.services.js';

// Create room
export const createRoom = asyncHandler(async (req, res) => {
  const { name, roomType, price } = req.body;

  //checking 
  if (!name || !price) {
    res.status(400);
    throw new Error("Fill all the fields");
  }

  //checking for number of charaters in name

  if(name.length < 3) {
    res.status(400);
    throw new Error("Name field must be atleast 3 charaters")
  }

  //Check if room already exist with same name field
  const existsRoom = await checkExistingRoom({name})
  if(existsRoom){
    res.status(409);
    throw new Error("Room already exist with same name")
  }

  //create room
  try {
    const newRoom = await saveNewRoom({ 
      name,
       roomType,
       price });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500);
    throw new Error("Invalid Room data");
  }

});

;

// GET endpoint for fetching all rooms with optional filters
export const getAllRooms = asyncHandler(async (req, res) => {
  const q = req.query;

  try {
    const filters = {
      ...(q.name && { name: q.name }),
      ...(q.roomType && { roomType: q.roomType }),
      ...((q.minPrice || q.maxPrice) && { price: { ...(q.minPrice && { $gt: q.minPrice }), ...(q.maxPrice && { $lt: q.maxPrice }) } }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } })
    };
    const rooms = await fetchAllRooms(filters);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Update room
export const updatedRoom = asyncHandler(async (req, res) => {
  try {
    const updatedRoom = await uptoDateRoom(req.params.roomId, req.body);
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Delete Room
export const deleteRoom = asyncHandler(async (req, res) => {
  try {
    const message = await deleteRoomById(req.params.roomId);
    res.status(200).json(message);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Get a single room using its id
export const getRoom = asyncHandler(async (req, res) => {
  try {
    const room = await getRoomById(req.params.roomId);
    if(!room){
      res.status(404);
      throw new Error("Room not found");
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});
