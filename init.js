dotenv.config();

import app from "./app";
import "./db";
import dotenv from "dotenv";

//models
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 4001;

//server
const handleListening = () => {
    console.log(`✅ Listening server: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
