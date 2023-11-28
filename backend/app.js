const express = require('express');
const bodyParser = require('body-parser');
const barangController = require('./controller/barangController');
const kasirController = require('./controller/kasirController');
const tenanController = require('./controller/tenanController');
// Import other controllers as needed

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/barang/:kodeBarang', barangController.getBarangController);
app.put('/barang/:kodeBarang', barangController.updateBarangController);
app.post('/barang', barangController.createBarangController);
app.get('/barang', barangController.viewBarangController);
app.delete('/barang/:kodeBarang', barangController.deleteBarangController);

app.post('/kasir', kasirController.createKasirController);
app.put('/kasir/:kodeKasir', kasirController.updateKasirController);
app.get('/kasir/:kodeKasir', kasirController.getKasirController);
app.get('/kasir', kasirController.getAllKasirController);
app.delete('/kasir/:kodeKasir', kasirController.deleteKasirController);

app.post('/tenan', tenanController.createTenanController);  
app.put('/tenan/:kodetenan', tenanController.updateTenanController);
app.get('/tenan/:kodetenan', tenanController.getTenanController);
app.delete('/tenan/:kodetenan', tenanController.deleteTenanController);
app.get('/tenan', tenanController.getAllTenanController);

// Add routes for other controllers

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
