// kasirController.js

const { Kasir, getKasir, updateKasir } = require('../model/kasirModel');
const { createKasir } = require('../model/kasirModel');
const { getAllKasir } = require('../model/kasirModel');

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
      console.error('Error fetching kasir data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const updateKasirController = async (req, res) => {
    const { kodeKasir } = req.params;
    const { nama, hp } = req.body;
  
    try {
      const updatedKasir = await updateKasir({ kodeKasir, nama, hp });
      if (updatedKasir) {
        res.json(updatedKasir);
      } else {
        res.status(404).json({ error: 'Kasir not found' });
      }
    } catch (error) {
      console.error('Error updating kasir:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const createKasirController = async (req, res) => {
    const { kodeKasir, nama, hp } = req.body;
  
    try {
      const newKasir = await createKasir({ kodeKasir, nama, hp });
      res.json(newKasir);
    } catch (error) {
      console.error('Error creating kasir:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getAllKasirController = async (req, res) => {
  try {
    const kasirList = await getAllKasir();
    res.json(kasirList);
  } catch (error) {
    console.error('Error fetching all kasir data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getKasirController,
  updateKasirController,
    createKasirController,
    getAllKasirController,
};
