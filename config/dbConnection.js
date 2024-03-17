const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connectionString = process.env.DB_CONNECTION_STRING;
        const connect = await mongoose.connect(connectionString);
        console.log(`MongoDB Connected: ${connect.connection.host}, ${connect.connection.name}`);
    }
    catch (error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;