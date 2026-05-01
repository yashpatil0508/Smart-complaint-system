const mongoose = require('mongoose');
const Complaint = require('./models/Complaint');

async function cleanup() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/smart_complaint');
    
    // Find missing location or undefined or null or empty string
    const result = await Complaint.deleteMany({ 
      $or: [
        { location: { $exists: false } }, 
        { location: null }, 
        { location: "" } // If strict checking triggered, old ones might just not have the field
      ] 
    });
    
    console.log(`Cleanup complete. Deleted ${result.deletedCount} legacy complaints missing location.`);
    
    process.exit(0);
  } catch (err) {
    console.error('Error during cleanup:', err);
    process.exit(1);
  }
}

cleanup();
