import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

// const UserForm = ({ initialData = {}, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phoneNumber: "",
//     email: "",
//     dob: "",
//     gender: "",
//     city: "",
//     insurance: "",
//     therapy: "",
//     therapyDate: "",
//     ...initialData,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     // Overlay with padding for better spacing and scroll
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-auto">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg w-full max-w-md max-h-full overflow-y-auto"
//       >
//         <h3 className="text-xl font-bold mb-4">
//           {initialData._id ? "Edit User" : "Add New User"}  
//         </h3>
//         {Object.keys(formData).map((key) =>
//           key !== "_id" ? (
//             <div className="mb-3" key={key}>
//               <label className="block text-sm font-medium text-gray-700">
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </label>
//               <input
//                 type="text"
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//               />
//             </div>
//           ) : null
//         )}
//         <div className="flex justify-end space-x-2 mt-4">
//           <button type="button" onClick={onCancel} className="px-4 py-2">
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };


const UserForm = ({ initialData = {}, onSave, onCancel }) => {
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
    .replace(/([A-Z])/g, " $1")       // insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase());


    const formatDate = (isoString) => {
  if (!isoString) return '';
  return isoString.slice(0, 10);
};


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
          {initialData._id ? "Edit User" : "Add New User"}
        </h3>

        {/* Full Name, Phone, Email, City, Insurance */}
        {['fullName', 'phoneNumber', 'email', 'city'].map((key) => (
          <div className="mb-3" key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {formatLabel(key)}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

          <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Insurance</label>
          <select
            name="insurance"
            value={formData.insurance}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
          >
            <option value="USA">Insurance</option>
            <option value="Canada">Self Pay</option>
          </select>
        </div>

        {/* DOB */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ''}
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

        {/* Therapy Type */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Therapy Type</label>
          <select
            name="therapy"
            value={formData.therapy}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
          >
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
            value={formData.therapyDate || ''}
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


const UsersDetail = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://meet.airx.ac/users/get");
      setUserData(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
  if (!isoString) return '';
  return isoString.slice(0, 10);
};

const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`https://meet.airx.ac/users/delete/${id}`);
      fetchUsers();
    } catch {
      setError('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
        await axios.put(`https://meet.airx.ac/users/update/${data._id}`, data);
      } else {
        await axios.post("https://meet.airx.ac/users", data);
      }
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
      setError("Failed to save user data");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
          ❌ {error}
        </div>
      </div>
    );

  return (
    <div className="mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Patients Data</h2>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          Add Patient
        </button>
      </div>

      {userData.length === 0 ? (
        <p className="text-center text-gray-500">No Data found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userData.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg border border-gray-200 rounded-lg p-5 hover:shadow-xl transition relative"
            >
              <button
                onClick={() => handleEdit(user)}
                className="absolute top-2 right-12 text-blue-500 hover:text-blue-700"
              >
                <FaEdit  size={20} />
              </button>
              <button onClick={() => handleDelete(user._id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                <RiDeleteBin6Fill size={20} />
                </button>
              <p className="text-gray-700"><strong>Full Name:</strong> {user.fullName}</p>
              <p className="text-gray-700"><strong>Phone Number:</strong> {user.phoneNumber}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>DOB:</strong> {formatDate(user.dob)}</p>
              <p className="text-gray-700"><strong>Gender:</strong> {user.gender}</p>
              <p className="text-gray-700"><strong>City:</strong> {user.city}</p>
              <p className="text-gray-700"><strong>Country:</strong> {user.country}</p>
              <p className="text-gray-700"><strong>Therapy:</strong> {user.therapy}</p>
              <p className="text-gray-700"><strong>Therapy Date:</strong> {formatDate(user.therapyDate)}</p>
            </div>
          ))}
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

export default UsersDetail;











// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserForm = ({ initialData = {}, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     fullName: '', phoneNumber: '', email: '', dob: '', gender: '', city: '', country: '', therapy: '', therapyDate: '',
//     ...initialData,
//   });

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-auto">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md max-h-full overflow-y-auto">
//         <h3 className="text-xl font-bold mb-4">{initialData._id ? 'Edit User' : 'Add New User'}</h3>
//         {Object.entries(formData).map(([key, val]) =>
//           key !== '_id' && (
//             <div className="mb-3" key={key}>
//               <label className="block text-sm font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//               <input name={key} value={val} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded p-2" />
//             </div>
//           )
//         )}
//         <div className="flex justify-end space-x-2 mt-4">
//           <button type="button" onClick={onCancel} className="px-4 py-2">Cancel</button>
//           <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Save</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const UsersDetail = () => {
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [editUser, setEditUser] = useState(null);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try { const res = await axios.get('http://localhost:5000/users/get'); setUserData(res.data); }
//     catch (e) { setError('Failed to load user data'); }
//     finally { setLoading(false); }
//   };
//   useEffect(() => { fetchUsers(); }, []);

//   const handleAdd = () => { setEditUser(null); setShowForm(true); };
//   const handleEdit = (u) => { setEditUser(u); setShowForm(true); };
//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this user?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/users/delete/${id}`);
//       fetchUsers();
//     } catch {
//       setError('Failed to delete user');
//     }
//   };
//   const handleSave = async (data) => {
//     try {
//       if (data._id) await axios.put(`http://localhost:5000/users/update/${data._id}`, data);
//       else await axios.post('http://localhost:3060/users/create', data);
//       setShowForm(false);
//       fetchUsers();
//     } catch { setError('Failed to save user data'); }
//   };

//   if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"/></div>;
//   if (error) return <div className="flex justify-center items-center min-h-screen"><div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">❌ {error}</div></div>;

//   return (
//     <div className="mx-auto py-10 px-4">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold">Users Data</h2>
//         <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">+ Add User</button>
//       </div>

//       {userData.length === 0 ? <p className="text-center text-gray-500">No Data found</p> : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {userData.map(user => (
//             <div key={user._id} className="bg-white shadow-lg border rounded-lg p-5 relative hover:shadow-xl transition">
//               <button onClick={() => handleEdit(user)} className="absolute top-2 right-12 text-blue-500 hover:text-blue-700">✏️</button>
//               <button onClick={() => handleDelete(user._id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">🗑️</button>
//               {['fullName','phoneNumber','email','dob','gender','city','country','therapy','therapyDate'].map(field => (
//                 <p className="text-gray-700" key={field}><strong>{field.charAt(0).toUpperCase()+field.slice(1)}:</strong> {user[field]}</p>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}

//       {showForm && <UserForm initialData={editUser||{}} onSave={handleSave} onCancel={() => setShowForm(false)}/>}    
//     </div>
//   );
// };

// export default UsersDetail;
