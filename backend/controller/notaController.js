// notaController.js

const { Nota, getNota, updateNota, inputNota } = require('../model/notaModel');

const getNotaController = async (req, res) => {
  const { kodenota } = req.params;

  try {
    const nota = await getNota(kodenota);

    if (nota) {
      res.json(nota);
    } else {
      res.status(404).json({ error: 'Shopping receipt not found' });
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

const inputNotaController = async (req, res) => {
  const {
    Kodenota,
    Kodetenan,
    Kodekasir,
    TglNota,
    JamNota,
    Jumlahbelanja,
    Diskon,
    Total,
    // Add other attributes as needed
  } = req.body;

  try {
    // Call the model function to insert transaction data
    const insertedNota = await inputNota({
      Kodenota,
      Kodetenan,
      Kodekasir,
      TglNota,
      JamNota,
      Jumlahbelanja,
      Diskon,
      Total,
      // Pass other attributes as needed
    });

    res.json({ message: 'Transaction data inserted successfully', data: insertedNota });
  } catch (error) {
    console.error('Error inserting transaction data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getNotaController,
  updateNotaController,
  inputNotaController,
};
    