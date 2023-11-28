// tenanController.js

const { Tenan, getTenan, updateTenan, createTenan, deleteTenan, getAllTenan } = require('../model/tenanModel');

const getTenanController = async (req, res) => {
  const { kodetenan } = req.params;

  try {
    const tenan = await getTenan(kodetenan);
    if (tenan) {
      res.json(tenan);
    } else {
      res.status(404).json({ error: 'Tenan not found' });
    }
  } catch (error) {
    console.error('Error fetching tenan data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllTenanController = async (req, res) => {
  try {
    const allTenan = await getAllTenan();
    res.json(allTenan);
  } catch (error) {
    console.error('Error fetching all tenan data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTenanController = async (req, res) => {
  const { kodetenan } = req.params;
  const updatedTenanData = req.body;

  try {
    const updatedTenan = await updateTenan(kodetenan, updatedTenanData);
    if (updatedTenan) {
      res.json(updatedTenan);
    } else {
      res.status(404).json({ error: 'Tenan not found' });
    }
  } catch (error) {
    console.error('Error updating tenan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTenanController = async (req, res) => {
    const tenanData = req.body;
  
    try {
      const newTenan = await createTenan(tenanData);
      res.json(newTenan);
    } catch (error) {
      console.error('Error creating tenan:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteTenanController = async (req, res) => {
    const { kodetenan } = req.params;
  
    try {
      const deletedTenan = await deleteTenan(kodetenan);
      if (deletedTenan) {
        res.json({ message: 'Tenan deleted successfully' });
      } else {
        res.status(404).json({ error: 'Tenan not found' });
      }
    } catch (error) {
      console.error('Error deleting tenan:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  getTenanController,
  updateTenanController,
    createTenanController,
    deleteTenanController,
    getAllTenanController
};
