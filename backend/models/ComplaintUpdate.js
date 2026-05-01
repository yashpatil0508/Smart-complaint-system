const mongoose = require('mongoose');

const complaintUpdateSchema = new mongoose.Schema({
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved', 'Assigned'],
    required: true 
  },
  remark: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('ComplaintUpdate', complaintUpdateSchema);
