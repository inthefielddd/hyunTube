import dotenv from "dotenv";

import "./db";
import app from "./app";

import "./passport";

//models
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT || 4001;

//server
const handleListening = () => {
    console.log(`✅ Listening server: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
