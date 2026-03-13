import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import router from './routes/AuthRoute.js'
const app = express();
const port = 4000;
import 'dotenv/config'
<<<<<<< HEAD
// req pars to json
app.use(express.json());
// to connect backend to different ports 
=======
app.use(express.json());
>>>>>>> e42d79988e62b3095ca61cf83306c309bfbe131a
app.use(cors());

app.use(bodyParser.json());
// db connection importing the database file
connectDB();
// API endpoints
app.use('/auth',router);
<<<<<<< HEAD
// for now we have just mounted the folder uploads at /images end point.
=======
>>>>>>> e42d79988e62b3095ca61cf83306c309bfbe131a
app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Listening at the port ${port}`);
<<<<<<< HEAD
})
=======
})
>>>>>>> e42d79988e62b3095ca61cf83306c309bfbe131a
