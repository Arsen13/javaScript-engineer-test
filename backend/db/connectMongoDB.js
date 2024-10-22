const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI);

        if (connection) {
            console.log("MongoDB connected");
        }
        
    } catch (error){
        console.error(`Error connection to mongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectMongoDB;