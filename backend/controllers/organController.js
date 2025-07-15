const Organ = require('../models/Organ');

// @desc    Add a new organ (by center)
exports.addOrgan = async (req, res) => {
  try {
    const { organType, bloodGroup, donorAge } = req.body;

    const newOrgan = await Organ.create({
      organType,
      bloodGroup,
      donorAge,
      center: req.user.id, // from authMiddleware
    });

    res.status(201).json(newOrgan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all available organs (filter by type, blood group optional)
exports.getOrgans = async (req, res) => {
  try {
    const organs = await Organ.find({ isReserved: false }).populate('center', 'name email');
    res.status(200).json(organs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get organs listed by current center
exports.getMyOrgans = async (req, res) => {
  try {
    const organs = await Organ.find({ center: req.user.id });
    res.status(200).json(organs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete organ
exports.deleteOrgan = async (req, res) => {
  try {
    const organ = await Organ.findById(req.params.id);

    if (!organ) return res.status(404).json({ message: 'Organ not found' });

    if (organ.center.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this organ' });
    }

    await organ.deleteOne();
    res.status(200).json({ message: 'Organ deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
