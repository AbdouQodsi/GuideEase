const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  const { userId, tourId, reason, description, status } = req.body;

  if (!userId || !tourId || !reason) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const report = new Report({
      userId,
      tourId,
      reason,
      description,
      status,
    });

    await report.save();
    res.status(201).json({ message: "Report submitted successfully", report });
  } catch (error) {
    console.error("Report submission error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPendingReports = async (req, res) => {
  try {
    const reports = await Report.aggregate([
      {
        $addFields: {
          tourIdObj: { $toObjectId: "$tourId" }
        }
      },
      {
        $lookup: {
          from: 'tours', 
          localField: 'tourIdObj',
          foreignField: '_id',
          as: 'tour'
        }
      },
      {
        $unwind: '$tour' 
      },
      {
        $match: {
          status: 'in progress'
        }
      }
    ]);

    res.status(200).json(reports);
  } catch (err) {
    console.error("Fetch pending reports error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


 

// Get report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('tourId userId');
    if (!report) return res.status(404).json({ message: "Report not found" });

    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update report status
exports.updateReportStatus = async (req, res) => {
    try {
      const updatedReport = await Report.findByIdAndUpdate(
        req.params.id,
        { status: "traité" }, // 👈 forcé ici
        { new: true }
      );
  
      if (!updatedReport) {
        return res.status(404).json({ message: "Report not found" });
      }
  
      res.status(200).json({ message: "Report status set to 'traité'", report: updatedReport });
    } catch (error) {
      console.error("Error updating report:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  