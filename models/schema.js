import mongoose from 'mongoose';
// Define the schema for storing URLs
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    clickCount: {
        type: Number,
        default: 0,
    },
});

const Url = mongoose.model('Url', urlSchema);

export default Url;