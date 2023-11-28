// components/ViewDataKasir.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewDataKasir = () => {
  const [kasirData, setKasirData] = useState([]);
  const [editData, setEditData] = useState({
    kodekasir: '',
    nama: '',
    hp: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const viewKasir = async () => {
    try {
      const response = await axios.get('http://localhost:3000/kasir');
      const allKasirData = response.data;

      // Set the data in the state
      setKasirData(allKasirData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch all data for Kasir
    viewKasir(); // Call the function when the component mounts
  }, []);

  const handleEdit = (kasir) => {
    // Set the edit data and show the modal
    setEditData(kasir);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the data
      await axios.put(`http://localhost:3000/kasir/${editData.kodekasir}`, editData);

      // Close the modal and refresh the data
      setShowEditModal(false);
      viewKasir();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (kodekasir) => {
    try {
      // Make a DELETE request to delete the data
      await axios.delete(`http://localhost:3000/kasir/${kodekasir}`);

      // Refresh the data after deletion
      viewKasir();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>View Data Kasir</h2>
      <table>
        <thead>
          <tr>
            <th>Kode Kasir</th>
            <th>Nama Kasir</th>
            <th>Nomor HP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {kasirData.map((kasir) => (
            <tr key={kasir.kodekasir}>
              <td>{kasir.kodekasir}</td>
              <td>{kasir.nama}</td>
              <td>{kasir.hp}</td>
              <td>
                <button onClick={() => handleEdit(kasir)}>Edit</button>
                <button onClick={() => handleDelete(kasir.kodekasir)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div>
          <h3>Edit Data Kasir</h3>
          <form>
            {/* Add input fields for each attribute */}
            <label>
              Kode Kasir:
              <input
                type="text"
                name="kodekasir"
                value={editData.kodekasir}
                onChange={(e) => setEditData({ ...editData, kodekasir: e.target.value })}
                disabled
              />
            </label>
            <br />
            <label>
              Nama Kasir:
              <input
                type="text"
                name="nama"
                value={editData.nama}
                onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
              />
            </label>
            <br />
            <label>
              Nomor HP:
              <input
                type="text"
                name="hp"
                value={editData.hp}
                onChange={(e) => setEditData({ ...editData, hp: e.target.value })}
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

export default ViewDataKasir;
