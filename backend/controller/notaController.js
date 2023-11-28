// notaController.js

const { Nota, getNota, updateNota } = require('../model/notaModel');

const getNotaController = async (req, res) => {
  const { kodenota } = req.params;

  try {
    const nota = await getNota(kodenota);
    if (nota) {
      res.json(nota);
    } else {
      res.status(404).json({ error: 'Nota not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateNotaController = async (req, res) => {
  const { kodenota } = req.params;

  try {
    await updateNota(kodenota, req.body);
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getNotaController,
  updateNotaController,
};
    