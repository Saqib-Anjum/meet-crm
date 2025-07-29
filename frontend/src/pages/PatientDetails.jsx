import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { differenceInHours, parseISO } from 'date-fns';

// Utility functions
const formatDate = (isoString) => {
  // Safely format a date string to YYYY-MM-DD
  return isoString?.split('T')?.[0] || '';
};

const getHoursSince = (isoString) => {
  if (typeof isoString !== 'string') return Infinity;
  try {
    return differenceInHours(new Date(), parseISO(isoString));
  } catch {
    return Infinity;
  }
};

// UserForm component for adding/editing users
export const UserForm = ({ initialData = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    city: "",
    insurance: "",
    therapy: "",
    therapyDate: "",
    ...initialData,
  });

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md max-h-full overflow-y-auto"
      >
        <h3 className="text-xl font-bold mb-4">
          {initialData._id ? "Edit Patient" : "Add New Patient"}
        </h3>

        {/* Basic Fields */}
        {[ 'fullName', 'phoneNumber', 'email', 'city' ].map((key) => (
          <div className="mb-3" key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {formatLabel(key)}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

        {/* Insurance */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Insurance</label>
          <select
            name="insurance"
            value={formData.insurance || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
          >
            <option value="">Select Option</option>
            <option value="Insurance">Insurance</option>
            <option value="Self Pay">Self Pay</option>
          </select>
        </div>

        {/* DOB */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formatDate(formData.dob)}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Therapy */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Therapy Type</label>
          <select
            name="therapy"
            value={formData.therapy || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
          >
            <option value="">Select Option</option>
            <option value="Individual Therapy">Individual Therapy</option>
            <option value="Couples and Relationship Therapy">Couples and Relationship Therapy</option>
            <option value="Family Therapy">Family Therapy</option>
            <option value="Life Coaching">Life Coaching</option>
            <option value="Grief Counseling">Grief Counseling</option>
            <option value="Anxiety & Stress Management">Anxiety & Stress Management</option>
            <option value="Other Therapy">Other Therapy</option>
          </select>
        </div>

        {/* Therapy Date */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Therapy Date</label>
          <input
            type="date"
            name="therapyDate"
            value={formatDate(formData.therapyDate)}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

// Main PatientDetails component
const PatientDetails = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://crm.airx.ac/patients");
      console.log(response)
      // ensure array
      setUserData(response.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      await axios.delete(`https://crm.airx.ac/del-patient/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError('Failed to delete patient');
    }
  };

  const handleAdd = () => {
    setEditUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await axios.put(`https://crm.airx.ac/update-patient/${data._id}`, data);
      } else {
        await axios.post("https://crm.airx.ac/add-patient", data);
      }
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error("Error saving patient:", err);
      setError("Failed to save patient data");
    }
  };

  const handleCancel = () => setShowForm(false);

  // Prepare sorted data
  const sortedData = [...userData].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
        ❌ {error}
      </div>
    </div>
  );

  return (
    <div className="mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Patients</h2>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          Add Patient
        </button>
      </div>

      {sortedData.length === 0 ? (
        <p className="text-center text-gray-500">No Data found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedData.map((user) => {
            const hoursSince = getHoursSince(user.createdAt);
            const isNew = hoursSince < 48;

            return (
              <div
                key={user._id}
                className="relative bg-white p-5 rounded-lg shadow hover:shadow-xl transition"
              >
                {isNew && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                <button
                  onClick={() => handleEdit(user)}
                  className="absolute top-2 right-12 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <RiDeleteBin6Fill size={20} />
                </button>
                <p className="text-gray-700 mt-4"><strong>Full Name:</strong> {user.fullName}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {user.phoneNumber}</p>
                <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-700"><strong>DOB:</strong> {formatDate(user.dob)}</p>
                <p className="text-gray-700"><strong>Gender:</strong> {user.gender}</p>
                <p className="text-gray-700"><strong>City:</strong> {user.city}</p>
                <p className="text-gray-700"><strong>Insurance:</strong> {user.insurance}</p>
                <p className="text-gray-700"><strong>Therapy:</strong> {user.therapy}</p>
                <p className="text-gray-700"><strong>Therapy Date:</strong> {formatDate(user.therapyDate)}</p>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <UserForm
          initialData={editUser || {}}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default PatientDetails;
