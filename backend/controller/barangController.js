// barangController.js

const { Barang, getBarang, updateBarang } = require('../model/barangModel');
const { createBarang } = require('../model/barangModel');

const getBarangController = async (req, res) => {
  const { kodeBarang } = req.params;

  try {
    const barang = await getBarang(kodeBarang);
    if (barang) {
      res.json(barang);
    } else {
      res.status(404).json({ error: 'Barang not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBarangController = async (req, res) => {
    const { kodeBarang } = req.params;
    const { namaBarang, satuan, hargasatuan, stok } = req.body;
  
    try {
      const existingBarang = await getBarang(kodeBarang);
      if (!existingBarang) {
        return res.status(404).json({ error: 'Barang not found' });
      }
  
      const updatedBarang = await updateBarang({
        kodeBarang,
        namaBarang,
        satuan,
        hargasatuan,
        stok,
      });
  
      res.status(200).json(updatedBarang);
    } catch (error) {
      console.error('Error updating barang:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };

const createBarangController = async (req, res) => {
    const { kodeBarang, namaBarang, satuan, hargasatuan, stok } = req.body;
  
    try {
      const existingBarang = await getBarang(kodeBarang);
      if (existingBarang) {
        return res.status(400).json({ error: 'Barang with the same kodeBarang already exists' });
      }
  
      const newBarang = await createBarang({
        kodeBarang,
        namaBarang,
        satuan,
        hargasatuan,
        stok,
      });
  
      res.status(201).json(newBarang);
    } catch (error) {
      console.error('Error creating barang:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
    


module.exports = {
  getBarangController,
  updateBarangController,
  createBarangController,
};
