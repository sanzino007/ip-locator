import mongoose from 'mongoose';

// Define the schema
const ipSchema = new mongoose.Schema({
    ip: String,
    city: String,
    region: String,
    country: String,
    latitude: Number,
    longitude: Number,
});

// Export the model
const IpLocation = mongoose.model('IpLocation', ipSchema);
export default IpLocation;
