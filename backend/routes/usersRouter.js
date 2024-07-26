import express from "express"
import { updateUser, deleteUser, getUser, getUsers} from "../controllers/userController.js";
import { veriftAdmin, veriftUser, verifyToken } from "../utils/verifyToken.js";


const router = express.Router();

// router.get("/checkauthenticatication", verifyToken, (req,res,next)=>{
//     res.send("hello user, you are loged in")
// })
// router.get("/checkuser/:id", veriftUser, (req,res,next)=>{
//     res.send("hello user, you are loged in and you can delete your account")
// })
// router.get("/checkadmin/:id", veriftAdmin, (req,res,next)=>{
//     res.send("hello admin, you are loged in and you can all delete accounts")
// })
// UPDATE 
router.put("/:id", veriftUser, updateUser)
// DELETE
router.delete("/:id", veriftUser, deleteUser)
// GET
router.get("/:id", veriftUser, getUser)
// GET ALL
router.get("/", veriftAdmin, getUsers)


export default router