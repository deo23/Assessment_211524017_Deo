const express = require('express');
const bodyParser = require('body-parser');
const barangController = require('./controller/barangController');
// Import other controllers as needed

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/barang/:kodeBarang', barangController.getBarangController);
app.put('/barang/:kodeBarang', barangController.updateBarangController);
app.post('/barang', barangController.createBarangController);
app.get('/barang', barangController.viewBarangController);
app.delete('/barang/:kodeBarang', barangController.deleteBarangController);

// Add routes for other controllers

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
