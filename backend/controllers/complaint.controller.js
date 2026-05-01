const Complaint = require('../models/Complaint');
const ComplaintUpdate = require('../models/ComplaintUpdate');
const Notification = require('../models/Notification');

exports.createComplaint = async (req, res) => {
  try {
    const {
      complaintType, title, description, complainerName, wardNo, location, email, phone
    } = req.body;

    let proofFile = '';
    if (req.file) {
      proofFile = `/uploads/${req.file.filename}`;
    }

    const complaint = new Complaint({
      complaintType,
      title,
      description,
      complainerName,
      wardNo,
      location,
      email,
      phone,
      userId: req.user.id,
      proofFile,
      status: 'Pending',
      priority: 'Low'
    });

    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const { role, id, department } = req.user; // department if set in auth middleware from db

    let filter = {};
    if (role === 'citizen') {
      filter.userId = id;
    } else if (role === 'authority') {
      // If user is authority, could filter by department or assigned
      // filter.assignedAuthority = id; // Or filter by complaintType === user.department
      filter.$or = [
        { assignedAuthority: id }
      ];
      // You can expand this logic based on how authority assignment fully works
    }

    const complaints = await Complaint.find(filter)
      .populate('assignedAuthority', 'name department')
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('assignedAuthority', 'name department');
      
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    
    const updates = await ComplaintUpdate.find({ complaintId: complaint._id }).sort({ createdAt: -1 });
    
    res.json({ complaint, updates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status, remark } = req.body;
    const complaintId = req.params.id;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    complaint.status = status;
    await complaint.save();

    const update = new ComplaintUpdate({
      complaintId,
      updatedBy: req.user.id,
      status,
      remark
    });
    await update.save();

    // Create Notification
    const notification = new Notification({
      userId: complaint.userId,
      message: `Your complaint "${complaint.title}" status has been updated to: ${status}. Remark: ${remark || 'None'}`
    });
    await notification.save();

    res.json({ message: 'Status updated successfully', complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin/Authority assigning worker or changing priority
exports.updateComplaintDetails = async (req, res) => {
  try {
    const { priority, assignedAuthority } = req.body;
    const complaintId = req.params.id;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    if (priority) complaint.priority = priority;
    if (assignedAuthority) complaint.assignedAuthority = assignedAuthority;

    await complaint.save();
    
    if (assignedAuthority) {
      const update = new ComplaintUpdate({
        complaintId,
        updatedBy: req.user.id,
        status: 'Assigned',
        remark: `Assigned to authority ID: ${assignedAuthority}`
      });
      await update.save();
    }

    res.json({ message: 'Complaint details updated', complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const complaintId = req.params.id;
    const complaint = await Complaint.findByIdAndDelete(complaintId);
    
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    
    await ComplaintUpdate.deleteMany({ complaintId });
    
    res.json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
