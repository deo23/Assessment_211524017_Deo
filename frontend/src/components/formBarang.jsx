// components/FormBarang.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FormBarang = () => {
  const [barangData, setBarangData] = useState({
    kodeBarang: '',
    namaBarang: '',
    satuan: '',
    hargasatuan: 0,
    stok: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBarangData({ ...barangData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server
      const response = await axios.post('http://localhost:3000/barang', barangData);
      console.log(response.data); // Log the response from the server

      // Reset the form after successful submission
      setBarangData({
        kodeBarang: '',
        namaBarang: '',
        satuan: '',
        hargasatuan: 0,
        stok: 0,
      });
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <div>
      <h2>Form Input Data Barang</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Kode Barang:
          <input type="text" name="kodeBarang" value={barangData.kodeBarang} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nama Barang:
          <input type="text" name="namaBarang" value={barangData.namaBarang} onChange={handleChange} />
        </label>
        <br />
        <label>
          Satuan:
          <input type="text" name="satuan" value={barangData.satuan} onChange={handleChange} />
        </label>
        <br />
        <label>
          Harga Satuan:
          <input type="number" name="hargasatuan" value={barangData.hargasatuan} onChange={handleChange} />
        </label>
        <br />
        <label>
          Stok:
          <input type="number" name="stok" value={barangData.stok} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormBarang;
