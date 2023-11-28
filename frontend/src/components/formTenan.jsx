// components/FormTenan.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FormTenan = () => {
  const [tenanData, setTenanData] = useState({
    KodeTenan: '',
    NamaTenan: '',
    Alamat: '',
    NoTelp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenanData({ ...tenanData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server
      const response = await axios.post('http://localhost:3000/tenan', tenanData);
      console.log(response.data); // Log the response from the server

      // Reset the form after successful submission
      setTenanData({
        KodeTenan: '',
        NamaTenan: '',
        Alamat: '',
        NoTelp: '',
      });
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <div>
      <h2>Form Input Data Tenan</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Kode Tenan:
          <input type="text" name="KodeTenan" value={tenanData.KodeTenan} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nama Tenan:
          <input type="text" name="NamaTenan" value={tenanData.NamaTenan} onChange={handleChange} />
        </label>
        
        <label>
          No Telp:
          <input type="text" name="NoTelp" value={tenanData.NoTelp} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormTenan;
