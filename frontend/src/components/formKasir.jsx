// components/FormKasir.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FormKasir = () => {
  const [kasirData, setKasirData] = useState({
    kodeKasir: '',
    nama: '',
    hp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKasirData({ ...kasirData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server
      const response = await axios.post('http://localhost:3000/kasir', kasirData);
      console.log(response.data); // Log the response from the server

      // Reset the form after successful submission
      setKasirData({
        kodeKasir: '',
        nama: '',
        hp: '',
      });
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <div>
      <h2>Form Input Data Kasir</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Kode Kasir:
          <input type="text" name="kodeKasir" value={kasirData.kodeKasir} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nama Kasir:
          <input type="text" name="nama" value={kasirData.nama} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nomor HP:
          <input type="text" name="hp" value={kasirData.hp} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormKasir;
