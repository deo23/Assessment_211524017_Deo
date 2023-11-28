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

class Tenan {
  constructor({
    Kodetenan,
    NamaTenan,
    HP,
    TenanID,
  }) {
    this.Kodetenan = Kodetenan;
    this.NamaTenan = NamaTenan;
    this.HP = HP;
    this.TenanID = TenanID;
  }
}

const getTenan = async (kodetenan) => {
  const getTenanQuery = 'SELECT * FROM Tenan WHERE Kodetenan = $1';
  const values = [kodetenan];

  try {
    const result = await client.query(getTenanQuery, values);
    const tenanData = result.rows[0];
    return new Tenan(tenanData);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const createTenan = async (tenanData) => {
    try {
      // Insert the tenan into the database
      const query =
        'INSERT INTO tenan (kodetenan, namatenan, hp) VALUES ($1, $2, $3) RETURNING *;';
      const result = await client.query(query, [
        tenanData.kodetenan,
        tenanData.namatenan,
        tenanData.hp,
      ]);
  
      return result.rows[0]; // Return the newly created tenan
    } catch (error) {
      console.error('Error creating tenan:', error);
      throw error;
    }
  };

  const updateTenan = async (kodetenan, updatedTenanData) => {
    try {
      // Check if the tenan exists
      const existingTenan = await getTenan(kodetenan);
      if (!existingTenan) {
        return null; // Tenan not found
      }
  
      // Update the tenan in the database
      const query =
        'UPDATE tenan SET namatenan = $1, hp = $2 WHERE kodetenan = $3 RETURNING *;';
      const result = await client.query(query, [
        updatedTenanData.namatenan,
        updatedTenanData.hp,
        kodetenan,
      ]);
  
      return result.rows[0]; // Return the updated tenan
    } catch (error) {
      console.error('Error updating tenan:', error);
      throw error;
    }
  };
// Add similar update function as in the Barang model

module.exports = {
  Tenan,
  getTenan,
    createTenan,
    updateTenan,
  // add updateTenan function here
};
