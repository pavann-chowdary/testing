
import mongoose from 'mongoose';
import config from './config.js';

const MONGODB_URI = config.MONGODB_URI;

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        console.log('Using cached database connection');
        return cachedDb;
    }

    console.log('Attempting to connect to MongoDB with URI:', MONGODB_URI); // Log the URI

    const startTime = Date.now(); // Log start time

    try {
        const connection = await mongoose.connect(MONGODB_URI);

        const endTime = Date.now(); // Log end time
        console.log('MongoDB connected successfully in', (endTime - startTime), 'ms');

        cachedDb = connection;
        return connection;
    } catch (error) {
        const endTime = Date.now(); // Log end time
        console.error('MongoDB connection error after', (endTime - startTime), 'ms:', error);
        throw error; // Rethrow the error
    }
}

export default connectToDatabase;