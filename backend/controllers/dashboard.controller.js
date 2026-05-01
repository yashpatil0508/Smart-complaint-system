const Complaint = require('../models/Complaint');

exports.getStats = async (req, res) => {
  try {
    const { role, id } = req.user;
    
    let matchCondition = {};
    if (role === 'authority') {
      // Could filter by dept or assignment. Here, we just filter by assigned to this authority
      matchCondition.assignedAuthority = id;
    } // Admin gets all. Citizen logic might not call dashboard stats but let's assume they don't or we handle differently.

    const total = await Complaint.countDocuments(matchCondition);
    const pending = await Complaint.countDocuments({ ...matchCondition, status: 'Pending' });
    const inProgress = await Complaint.countDocuments({ ...matchCondition, status: 'In Progress' });
    const resolved = await Complaint.countDocuments({ ...matchCondition, status: 'Resolved' });
    const highPriority = await Complaint.countDocuments({ ...matchCondition, priority: 'High' });

    // Try to aggregate by category
    const byCategory = await Complaint.aggregate([
      { $match: matchCondition },
      { $group: { _id: '$complaintType', count: { $sum: 1 } } }
    ]);

    // Try to aggregate by month
    const byMonth = await Complaint.aggregate([
      { $match: matchCondition },
      { $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
      }}
    ]);

    res.json({
      total,
      pending,
      inProgress,
      resolved,
      highPriority,
      byCategory,
      byMonth
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
