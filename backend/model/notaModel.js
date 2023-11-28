// tenanModel.js

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'assessment',
    password: 'admin', // Make sure this is set correctly
    port: '5432',
});
client.connect();

class Nota {
  constructor({
    Kodenota,
    Kodetenan,
    Kodekasir,
    TglNota,
    JamNota,
    Jumlahbelanja,
    Diskon,
    Total,
  }) {
    this.Kodenota = Kodenota;
    this.Kodetenan = Kodetenan;
    this.Kodekasir = Kodekasir;
    this.TglNota = TglNota;
    this.JamNota = JamNota;
    this.Jumlahbelanja = Jumlahbelanja;
    this.Diskon = Diskon;
    this.Total = Total;
  }
}

const getNota = async (kodenota) => {
  const getNotaQuery = 'SELECT * FROM Nota WHERE Kodenota = $1';
  const values = [kodenota];

  try {
    const result = await client.query(getNotaQuery, values);
    const notaData = result.rows[0];
    return new Nota(notaData);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const inputNota = async ({
  Kodenota,
  Kodetenan,
  Kodekasir,
  TglNota,
  JamNota,
  Jumlahbelanja,
  Diskon,
  Total,
  // Add other attributes as needed
}) => {
  try {
    // Insert transaction data into the database
    const query = `
      INSERT INTO nota (
        Kodenota, Kodetenan, Kodekasir, TglNota, JamNota, Jumlahbelanja, Diskon, Total
        -- Add other columns
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const result = await client.query(query, [
      Kodenota,
      Kodetenan,
      Kodekasir,
      TglNota,
      JamNota,
      Jumlahbelanja,
      Diskon,
      Total,
      // Pass other values as needed
    ]);

    return result.rows[0]; // Return the inserted transaction data
  } catch (error) {
    console.error('Error inserting transaction data:', error);
    throw error;
  }
};
// Add similar update function as in the Barang model

module.exports = {
  Nota,
  getNota,
  inputNota,
  // add updateNota function here
};