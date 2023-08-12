import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js";
import usersRoute from "./api/routes/users.js";
import hotelsRoute from "./api/routes/hotels.js";
import roomsRoute from "./api/routes/rooms.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB.")
    }
    catch (error){
        throw error; 
    }
};

mongoose.connection.on("disconnected" , ()=> {
    console.log("MongoDB Disconnected!");
})

mongoose.connection.on("connected" , ()=> {
    console.log("MongoDB Connected!");
})

// middleware 
app.use(express.json());

app.use("/api/auth" , authRoute);
app.use("/api/users" , usersRoute);
app.use("/api/hotels" , hotelsRoute);
app.use("/api/rooms" , roomsRoute);

// Best Practices to handle errors 
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500; 
    const errorMessage = err.message || "Something went wrong"; 
    return res.status(errorStatus).json({
        success: false, 
        status: errorStatus, 
        message: errorMessage, 
        stack: err.stack,
    });
});

app.listen(8800, ()=>{
    connect();
    console.log("Connected to backend")
});