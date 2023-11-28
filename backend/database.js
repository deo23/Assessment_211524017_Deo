const { Client } = require('pg');

// Replace these with your actual database credentials
const connectionString = 'postgresql://postgres:admin@localhost:5432/assessment';
const client = new Client({
  connectionString: connectionString,
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');

    // Create the 'Barang' table
    const createBarangTableQuery = `
      CREATE TABLE IF NOT EXISTS Barang (
        KodeBarang VARCHAR(10) PRIMARY KEY,
        NamaBarang VARCHAR(255) NOT NULL,
        Satuan VARCHAR(15) NOT NULL,
        HargaSatuan NUMERIC NOT NULL,
        Stok INTEGER NOT NULL
      );
    `;

    // Create the 'Kasir' table
    const createKasirTableQuery = `
      CREATE TABLE IF NOT EXISTS Kasir (
        KodeKasir VARCHAR(10) PRIMARY KEY,
        Nama VARCHAR(255) NOT NULL,
        HP VARCHAR(15) NOT NULL
      );
    `;

    // Create the 'Tenan' table
    const createTenanTableQuery = `
      CREATE TABLE IF NOT EXISTS Tenan (
        KodeTenan VARCHAR(10) PRIMARY KEY,
        NamaTenan VARCHAR(255) NOT NULL,
        HP VARCHAR(15) NOT NULL
      );
    `;

    // Create the 'Nota' table
    const createNotaTableQuery = `
      CREATE TABLE IF NOT EXISTS Nota (
        KodeNota VARCHAR(10) PRIMARY KEY,
        KodeTenan VARCHAR(10) NOT NULL,
        KodeKasir VARCHAR(10) NOT NULL,
        TglNota DATE NOT NULL,
        JamNota TIMESTAMP NOT NULL,
        JumlahBelanja NUMERIC NOT NULL,
        Diskon NUMERIC NOT NULL,
        Total NUMERIC NOT NULL,
        FOREIGN KEY (KodeTenan) REFERENCES Tenan (KodeTenan),
        FOREIGN KEY (KodeKasir) REFERENCES Kasir (KodeKasir)
      );
    `;

    // Create the 'BarangNota' table
    const createBarangNotaTableQuery = `
      CREATE TABLE IF NOT EXISTS BarangNota (
        KodeNota VARCHAR(10) NOT NULL,
        KodeBarang VARCHAR(10) NOT NULL,
        JumlahBarang INTEGER NOT NULL,
        HargaSatuan NUMERIC NOT NULL,
        Jumlah NUMERIC NOT NULL,
        PRIMARY KEY (KodeNota, KodeBarang),
        FOREIGN KEY (KodeNota) REFERENCES Nota (KodeNota),
        FOREIGN KEY (KodeBarang) REFERENCES Barang (KodeBarang)
      );
    `;

    // Execute the table creation queries
    return Promise.all([
      client.query(createBarangTableQuery),
      client.query(createKasirTableQuery),
      client.query(createTenanTableQuery),
      client.query(createNotaTableQuery),
      client.query(createBarangNotaTableQuery),
    ]);
  })
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((err) => {
    console.error('Error creating tables:', err);
  })
  .finally(() => {
    // Close the database connection
    client.end();
  });
