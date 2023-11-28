// kasirController.js

const { Kasir, getKasir, updateKasir } = require('../model/kasirModel');

const getKasirController = async (req, res) => {
  const { kodeKasir } = req.params;

  try {
    const kasir = await getKasir(kodeKasir);
    if (kasir) {
      res.json(kasir);
    } else {
      res.status(404).json({ error: 'Kasir not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateKasirController = async (req, res) => {
  const { kodeKasir } = req.params;

  try {
    await updateKasir(kodeKasir, req.body);
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getKasirController,
  updateKasirController,
};