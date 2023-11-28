// components/ViewDataTenan.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the styles

const ViewDataTenan = () => {
  const [tenanData, setTenanData] = useState([]);
  const [editData, setEditData] = useState({
    KodeTenan: '',
    NamaTenan: '',
    Hp: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const viewTenan = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tenan');
      const allTenanData = response.data;

      // Set the data in the state
      setTenanData(allTenanData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch all data for Tenan
    viewTenan(); // Call the function when the component mounts
  }, []);

  const handleEdit = (tenan) => {
    // Set the edit data and show the modal
    setEditData(tenan);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the data
      await axios.put(`http://localhost:3000/tenan/${editData.KodeTenan}`, editData);

      // Close the modal and refresh the data
      setShowEditModal(false);
      viewTenan();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (kodeTenan) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              // Make a DELETE request to delete the data
              await axios.delete(`http://localhost:3000/tenan/${kodeTenan}`);

              // Refresh the data after deletion
              viewTenan();
            } catch (error) {
              console.error(error);
            }
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div>
      <h2>View Data Tenan</h2>
      <table>
        <thead>
          <tr>
            <th>Kode Tenan</th>
            <th>Nama Tenan</th>
            <th>No HP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tenanData.map((tenan) => (
            <tr key={tenan.kodetenan}>
              <td>{tenan.kodetenan}</td>
              <td>{tenan.namatenan}</td>
              <td>{tenan.hp}</td>
              <td>
                <button onClick={() => handleEdit(tenan)}>Edit</button>
                <button onClick={() => handleDelete(tenan.kodetenan)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div>
          <h3>Edit Data Tenan</h3>
          <form>
            {/* Add input fields for each attribute */}
            <label>
              Kode Tenan:
              <input
                type="text"
                name="KodeTenan"
                value={editData.KodeTenan}
                onChange={(e) => setEditData({ ...editData, KodeTenan: e.target.value })}
              />
            </label>
            <br />
            <label>
              Nama Tenan:
              <input
                type="text"
                name="NamaTenan"
                value={editData.NamaTenan}
                onChange={(e) => setEditData({ ...editData, NamaTenan: e.target.value })}
              />
            </label>
            <br />
            <label>
              No HP:
              <input
                type="text"
                name="Hp"
                value={editData.Hp}
                onChange={(e) => setEditData({ ...editData, Hp: e.target.value })}
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

export default ViewDataTenan;
