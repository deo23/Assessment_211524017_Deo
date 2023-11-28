// barangNotaModel.js

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'assessment',
    password: 'admin', // Make sure this is set correctly
    port: '5432',
});
client.connect();

class BarangNota {
  constructor({
    KodeNota,
    KodeBarang,
    JumlahBarang,
    HargaSatuan,
    Jumlah,
  }) {
    this.KodeNota = KodeNota;
    this.KodeBarang = KodeBarang;
    this.JumlahBarang = JumlahBarang;
    this.HargaSatuan = HargaSatuan;
    this.Jumlah = Jumlah;
  }
}

const getBarangNota = async (kodeNota, kodeBarang) => {
  const getBarangNotaQuery = 'SELECT * FROM BarangNota WHERE KodeNota = $1 AND KodeBarang = $2';
  const values = [kodeNota, kodeBarang];

  try {
    const result = await client.query(getBarangNotaQuery, values);
    const barangNotaData = result.rows[0];
    return new BarangNota(barangNotaData);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Add similar update function as in the Barang model

module.exports = {
  BarangNota,
  getBarangNota,
  // add updateBarangNota function here
};
