const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['citizen', 'authority', 'admin'], 
    default: 'citizen' 
  },
  
  // Citizen specific
  address: { type: String },
  city: { type: String },
  ward: { type: String },
  idProof: { type: String },
  
  // Authority specific
  department: { type: String },
  employeeId: { type: String },

  // Admin specific
  adminCode: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
