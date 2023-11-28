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
    try {
      // Retrieve the kasir from the database
      const query = 'SELECT * FROM kasir WHERE kodekasir = $1;';
      const result = await client.query(query, [kodeKasir]);
  
      if (result.rows.length > 0) {
        return result.rows[0]; // Return the retrieved kasir
      } else {
        return null; // Kasir not found
      }
    } catch (error) {
      console.error('Error fetching kasir data:', error);
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

  const updateKasir = async ({ kodeKasir, nama, hp }) => {
    try {
      // Check if the kasir exists
      const existingKasir = await getKasir(kodeKasir);
      if (!existingKasir) {
        return null; // Kasir not found
      }
  
      // Update the kasir in the database
      const query = 'UPDATE kasir SET nama = $1, hp = $2 WHERE kodekasir = $3 RETURNING *;';
      const result = await client.query(query, [nama, hp, kodeKasir]);
  
      return result.rows[0]; // Return the updated kasir
    } catch (error) {
      console.error('Error updating kasir:', error);
      throw error;
    }
  };

const getAllKasir = async () => {
  try {
    // Retrieve all kasir from the database
    const query = 'SELECT * FROM kasir;';
    const result = await client.query(query);

    return result.rows; // Return the list of all kasir
  } catch (error) {
    console.error('Error fetching all kasir data:', error);
    throw error;
  }
};

const deleteKasir = async (kodeKasir) => {
    try {
      // Check if the kasir exists
      const existingKasir = await getKasir(kodeKasir);
      if (!existingKasir) {
        return null; // Kasir not found
      }
  
      // Delete the kasir from the database
      const query = 'DELETE FROM kasir WHERE kodekasir = $1 RETURNING *;';
      const result = await client.query(query, [kodeKasir]);
  
      return result.rows[0]; // Return the deleted kasir
    } catch (error) {
      console.error('Error deleting kasir:', error);
      throw error;
    }
  };
  

module.exports = {
  Kasir,
  getKasir,
    createKasir,
    updateKasir,
    getAllKasir,
    deleteKasir,
  // add updateKasir function here
};
