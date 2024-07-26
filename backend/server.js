import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/authRouter.js"
import usersRoute from "./routes/usersRouter.js"
import hotelsRoute from "./routes/hotelsRouter.js"
import roomsRoute from "./routes/roomsRouter.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB")
  } catch (error) {
    throw error
  }
}

mongoose.connection.on("Disconnected", ()=>{
  console.log("MongoDB Disconnected");
})
mongoose.connection.on("Connected", ()=>{
  console.log("MongoDB Connected");
})

// Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err,req,res,next)=>{
  const errorStatus = err.status ||  500
  const errorMessage = err.status ||  "Something Wrong"
  return res.status(500).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack: err.stack,
  })
})

app.listen(8000, ()=>{
    connect()
    console.log("connented to backend")
})