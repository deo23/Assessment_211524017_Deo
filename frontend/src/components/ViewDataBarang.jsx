// components/ViewDataBarang.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewDataBarang = () => {
  const [barangData, setBarangData] = useState([]);
  const [editData, setEditData] = useState({
    KodeBarang: '',
    NamaBarang: '',
    Satuan: '',
    HargaSatuan: 0,
    Stok: 0,
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const viewBarang = async () => {
    try {
      const response = await axios.get('http://localhost:3000/barang');
      const allBarangData = response.data;

      // Set the data in the state
      setBarangData(allBarangData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch all data for Barang
    viewBarang(); // Call the function when the component mounts
  }, []);

  const handleEdit = (barang) => {
    // Set the edit data and show the modal
    setEditData(barang);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the data
      await axios.put(`http://localhost:3000/barang/${editData.KodeBarang}`, editData);

      // Close the modal and refresh the data
      setShowEditModal(false);
      viewBarang();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>View Data Barang</h2>
      <table>
        <thead>
          <tr>
            <th>Kode Barang</th>
            <th>Nama Barang</th>
            <th>Satuan</th>
            <th>Harga Satuan</th>
            <th>Stok</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {barangData.map((barang) => (
            <tr key={barang.kodebarang}>
              <td>{barang.kodebarang}</td>
              <td>{barang.namabarang}</td>
              <td>{barang.satuan}</td>
              <td>{barang.hargasatuan}</td>
              <td>{barang.stok}</td>
              <td>
                <button onClick={() => handleEdit(barang)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div>
          <h3>Edit Data Barang</h3>
          <form>
            <label>
              Kode Barang:
              <input
                type="text"
                name="KodeBarang"
                value={editData.KodeBarang}
                onChange={(e) => setEditData({ ...editData, KodeBarang: e.target.value })}
              />
            </label>
            <br />
            <label>
              Nama Barang:
              <input
                type="text"
                name="NamaBarang"
                value={editData.NamaBarang}
                onChange={(e) => setEditData({ ...editData, NamaBarang: e.target.value })}
              />
            </label>
            <br />
            <label>
              Satuan:
              <input
                type="text"
                name="Satuan"
                value={editData.Satuan}
                onChange={(e) => setEditData({ ...editData, Satuan: e.target.value })}
              />
            </label>
            <br />
            <label>
              Harga Satuan:
              <input
                type="number"
                name="HargaSatuan"
                value={editData.HargaSatuan}
                onChange={(e) => setEditData({ ...editData, HargaSatuan: e.target.value })}
              />
            </label>
            <br />
            <label>
              Stok:
              <input
                type="number"
                name="Stok"
                value={editData.Stok}
                onChange={(e) => setEditData({ ...editData, Stok: e.target.value })}
              />
            </label>
            <br />
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewDataBarang;
