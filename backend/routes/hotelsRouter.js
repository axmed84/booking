import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotelController.js";
import { veriftAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", veriftAdmin, createHotel)
// UPDATE
router.put("/:id", veriftAdmin, updateHotel)
// DELETE
router.delete("/:id", veriftAdmin, deleteHotel)
// GET
router.get("/find/:id", getHotel)
// GET ALL
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)


export default router