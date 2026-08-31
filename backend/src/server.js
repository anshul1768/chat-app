import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import path from "path";
const app=express();


const __dirname=path.resolve();
const PORT=process.env.PORT;

app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);


//make ready for deployement
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})