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
  try {
    // Retrieve the tenan from the database
    const query = 'SELECT * FROM tenan WHERE kodetenan = $1;';
    const result = await client.query(query, [kodetenan]);

    if (result.rows.length > 0) {
      return result.rows[0]; // Return the tenan data
    } else {
      return null; // Tenan not found
    }
  } catch (error) {
    console.error('Error fetching tenan data:', error);
    throw error;
  }
};

const getAllTenan = async () => {
  try {
    // Retrieve all tenan from the database
    const query = 'SELECT * FROM tenan;';
    const result = await client.query(query);

    return result.rows; // Return all tenan data
  } catch (error) {
    console.error('Error fetching all tenan data:', error);
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
  const deleteTenan = async (kodetenan) => {
    try {
      // Check if the tenan exists
      const existingTenan = await getTenan(kodetenan);
      if (!existingTenan) {
        return null; // Tenan not found
      }
  
      // Delete the tenan from the database
      const query = 'DELETE FROM tenan WHERE kodetenan = $1 RETURNING *;';
      const result = await client.query(query, [kodetenan]);
  
      return result.rows[0]; // Return the deleted tenan
    } catch (error) {
      console.error('Error deleting tenan:', error);
      throw error;
    }
  };

module.exports = {
  Tenan,
  getTenan,
    createTenan,
    updateTenan,
    deleteTenan,
    getAllTenan,
};
