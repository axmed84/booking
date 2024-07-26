import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/roomController.js";
import { veriftAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", veriftAdmin, createRoom)
// UPDATE
router.put("/:id", veriftAdmin, updateRoom)
// DELETE
router.delete("/:id/:hotelid", veriftAdmin, deleteRoom)
// GET
router.get("/:id", getRoom)
// GET ALL
router.get("/", getRooms)


export default router