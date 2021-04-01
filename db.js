import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection:${error}`);

//db 연결이 성공했을때
db.once("open", handleOpen);
//db 연결이 실패했을때
db.on("error", handleError);
