import app from "./app";

const PORT = 4001;

//server
const handleListening = () => {
    console.log(`✅ Listening server: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
