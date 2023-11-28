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

// Add similar update function as in the Barang model

module.exports = {
  Tenan,
  getTenan,
  // add updateTenan function here
};
