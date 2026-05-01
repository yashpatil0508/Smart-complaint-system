const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintType: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },

  // Citizen info
  complainerName: { type: String, required: true },
  wardNo: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Status & Management
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved'], 
    default: 'Pending' 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Low' 
  },
  assignedAuthority: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Proof
  proofFile: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);
