const Request = require('../models/Request');
const Organ = require('../models/Organ');

// @desc    Hospital requests an organ
exports.createRequest = async (req, res) => {
  try {
    const { organId, patientName, patientBloodGroup, reason } = req.body;

    const organ = await Organ.findById(organId);
    if (!organ || organ.isReserved)
      return res.status(404).json({ message: 'Organ not available' });

    const request = await Request.create({
      organ: organId,
      hospital: req.user.id,
      patientName,
      patientBloodGroup,
      reason
    });

    // Optionally reserve organ until decision is made
    organ.isReserved = true;
    await organ.save();

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Hospital views their own requests
exports.getHospitalRequests = async (req, res) => {
  try {
    const requests = await Request.find({ hospital: req.user.id })
      .populate('organ')
      .populate('hospital', 'name');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Center views incoming requests for their organs
exports.getCenterRequests = async (req, res) => {
  try {
    const organs = await Organ.find({ center: req.user.id });
    const organIds = organs.map(org => org._id);

    const requests = await Request.find({ organ: { $in: organIds } })
      .populate('organ')
      .populate('hospital', 'name email');

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Center accepts/rejects a request
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const request = await Request.findById(req.params.id).populate('organ');
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Check if current center owns the organ
    if (request.organ.center.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    request.status = status;
    await request.save();

    // If rejected, make organ available again
    if (status === 'Rejected') {
      request.organ.isReserved = false;
      await request.organ.save();
    }

    res.status(200).json({ message: `Request ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
