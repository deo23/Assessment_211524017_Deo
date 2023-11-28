// barangNotaController.js

const { BarangNota, getBarangNota, updateBarangNota } = require('../model/barangNotaModel');

const getBarangNotaController = async (req, res) => {
  const { kodeNota, kodeBarang } = req.params;

  try {
    const barangNota = await getBarangNota(kodeNota, kodeBarang);
    if (barangNota) {
      res.json(barangNota);
    } else {
      res.status(404).json({ error: 'BarangNota not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBarangNotaController = async (req, res) => {
  const { kodeNota, kodeBarang } = req.params;

  try {
    await updateBarangNota(kodeNota, kodeBarang, req.body);
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getBarangNotaController,
  updateBarangNotaController,
};
