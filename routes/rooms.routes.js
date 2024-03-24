import express from 'express'
import { createRoom, getRoom, getAllRooms, updatedRoom, deleteRoom } from '../controllers/room.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';
const router = express.Router();


router.post("/rooms",protect, adminOnly, createRoom);
router.get("/rooms",getAllRooms);
router.patch("/rooms/:roomId",protect, adminOnly, updatedRoom);
router.delete("/rooms/:roomId", protect, adminOnly, deleteRoom);
router.get("/rooms/:roomId",getRoom);

export default router 