// barangModel.js

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'assessment',
    password: 'admin', // Make sure this is set correctly
    port: '5432',
});
client.connect();

// Define the structure of the Barang table
class Barang {
    constructor({ kodebarang, namabarang, satuan, hargasatuan, stok }) {
      this.kodeBarang = kodebarang;
      this.namaBarang = namabarang;
      this.satuan = satuan;
      this.hargaSatuan = hargasatuan;
      this.stok = stok;
    }
  }
  
  

const createBarang = async (barangData) => {
    const { kodeBarang, namaBarang, satuan, hargasatuan, stok } = barangData;
  
    try {
      // Check if the barang with the same kodeBarang already exists
      const existingBarang = await getBarang(kodeBarang);
      if (existingBarang) {
        throw new Error('Barang with the same kodeBarang already exists');
      }
  
      // Insert new barang into the database
      const query = 'INSERT INTO barang (kodebarang, namabarang, satuan, hargasatuan, stok) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [kodeBarang, namaBarang, satuan, hargasatuan, stok];
      
      const result = await client.query(query, values);
      const newBarang = result.rows[0];
  
      return newBarang;
    } catch (error) {
      console.error('Error creating barang:', error);
      throw error; // Rethrow the error for handling in the controller
    }
  };

// Function to fetch data for a specific Barang
const getBarang = async (kodeBarang) => {
    try {
      console.log('Fetching barang data for kodeBarang:', kodeBarang);
      const result = await client.query('SELECT * FROM barang WHERE kodebarang = $1', [kodeBarang]);
  
      if (result.rows.length > 0) {
        const barangData = result.rows[0];
        const barang = new Barang(barangData);
        console.log('Fetched barang data:', barang);
        return barang;
      } else {
        console.log('Barang not found for kodeBarang:', kodeBarang);
        return null;
      }
    } catch (error) {
      console.error('Error fetching barang data:', error);
      throw error;
    }
  };
  
  

// Function to update data for a specific Barang
const updateBarang = async (barangData) => {
    const { kodeBarang, namaBarang, satuan, hargasatuan, stok } = barangData;
  
    try {
      // Check if the barang exists
      const existingBarang = await getBarang(kodeBarang);
      if (!existingBarang) {
        throw new Error('Barang not found');
      }
  
      // Update the barang in the database
      const query = `
        UPDATE barang
        SET namabarang = $1, satuan = $2, hargasatuan = $3, stok = $4
        WHERE kodebarang = $5
        RETURNING *;
      `;
  
      const values = [namaBarang, satuan, hargasatuan, stok, kodeBarang];
  
      const result = await client.query(query, values);
      const updatedBarang = result.rows[0];
  
      return updatedBarang;
    } catch (error) {
      console.error('Error updating barang:', error);
      throw error; // Rethrow the error for handling in the controller
    }
  };

  const viewBarang = async () => {
    try {
      // Fetch barang data from the database
      const query = 'SELECT * FROM barang;';
      const result = await client.query(query);
  
      return result.rows;
    } catch (error) {
      console.error('Error fetching barang data:', error);
      throw error; // Rethrow the error for handling in the controller
    }
  };

  const deleteBarang = async (kodeBarang) => {
    try {
      // Check if the barang exists
      const existingBarang = await getBarang(kodeBarang);
      if (!existingBarang) {
        return null; // Barang not found
      }
  
      // Delete the barang from the database
      const query = 'DELETE FROM barang WHERE kodebarang = $1 RETURNING *;';
      const result = await client.query(query, [kodeBarang]);
  
      return result.rows[0]; // Return the deleted barang
    } catch (error) {
      console.error('Error deleting barang:', error);
      throw error;
    }
  };
    
  

module.exports = {
  Barang,
  getBarang,
  updateBarang,
  createBarang,
    viewBarang,
    deleteBarang,
};
