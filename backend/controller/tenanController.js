// tenanController.js

const { Tenan, getTenan, updateTenan } = require('../model/tenanModel');

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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTenanController = async (req, res) => {
  const { kodetenan } = req.params;

  try {
    await updateTenan(kodetenan, req.body);
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getTenanController,
  updateTenanController,
};
