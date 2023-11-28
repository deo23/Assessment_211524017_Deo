// kasirModel.js

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'assessment',
    password: 'admin', // Make sure this is set correctly
    port: '5432',
});
client.connect();

class Kasir {
  constructor({
    KodeKasir,
    Nama,
    HP,
  }) {
    this.KodeKasir = KodeKasir;
    this.Nama = Nama;
    this.HP = HP;
  }
}

const getKasir = async (kodeKasir) => {
  const getKasirQuery = 'SELECT * FROM Kasir WHERE KodeKasir = $1';
  const values = [kodeKasir];

  try {
    const result = await client.query(getKasirQuery, values);
    const kasirData = result.rows[0];
    return new Kasir(kasirData);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const createKasir = async ({ kodeKasir, nama, hp }) => {
    try {
      // Insert the new kasir into the database
      const query = 'INSERT INTO kasir (kodekasir, nama, hp) VALUES ($1, $2, $3) RETURNING *;';
      const result = await client.query(query, [kodeKasir, nama, hp]);
  
      return result.rows[0]; // Return the newly created kasir
    } catch (error) {
      console.error('Error creating kasir:', error);
      throw error;
    }
  };

// Add similar update function as in the Barang model

module.exports = {
  Kasir,
  getKasir,
    createKasir,
  // add updateKasir function here
};
