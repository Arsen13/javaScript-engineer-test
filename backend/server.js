const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectMongoDB = require('./db/connectMongoDB');
const heroRoutes = require('./routes/hero.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", heroRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});