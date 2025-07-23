// import { useState, useEffect } from "react";
// import axios from "axios";

// const UsersDetail = () => {
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);



//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/users/get")
//       .then((response) => {
//         setUserData(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching users:", err);
//         setError("Failed to load user data");
//         setLoading(false);
//       });
//   }, []);



//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
//           ❌ {error}
//         </div>
//       </div>
//     );

//   return (
//     <div className="mx-auto py-10 px-4">
//       <h2 className="text-3xl font-bold text-center mb-6">Users Data</h2>

//       {userData.length === 0 ? (
//         <p className="text-center text-gray-500">No Data found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {userData.map((user) => (
//             <div
//               key={user._id}
//               className="bg-white shadow-lg border border-gray-200 rounded-lg p-5 hover:shadow-xl transition"
//             >
//               <p className="text-gray-700">
//                 <strong>Full Name:</strong> {user.fullName}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Phone Number:</strong> {user.phoneNumber}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Email:</strong> {user.email}
//               </p>
//               <p className="text-gray-700">
//                 <strong>DOB:</strong> {user.dob}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Gender:</strong> {user.gender}
//               </p>
//               <p className="text-gray-700">
//                 <strong>City:</strong> {user.city}
//               </p>
//                <p className="text-gray-700">
//                 <strong>Country:</strong> {user.country}
//               </p>
//                <p className="text-gray-700">
//                 <strong>Therapy:</strong> {user.therapy}
//               </p>
//                <p className="text-gray-700">
//                 <strong>Therapy Date:</strong> {user.therapyDate}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UsersDetail;

// After Editable

// import { useState, useEffect } from "react";
// import axios from "axios";

// const UserForm = ({ initialData = {}, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phoneNumber: "",
//     email: "",
//     dob: "",
//     gender: "",
//     city: "",
//     country: "",
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
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md">
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
//         <div className="flex justify-end space-x-2">
//           <button type="button" onClick={onCancel} className="px-4 py-2">
//             Cancel
//           </button>
//           <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//             Save
//           </button>
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
//     try {
//       const response = await axios.get("http://localhost:5000/users/get");
//       console.log(response)
//       setUserData(response.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError("Failed to load user data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleAdd = () => {
//     setEditUser(null);
//     setShowForm(true);
//   };

//   const handleEdit = (user) => {
//     setEditUser(user);
//     setShowForm(true);
//   };

//   const handleSave = async (data) => {
//     try {
//       if (data._id) {
//         await axios.put(`http://localhost:5000/users/update/${data._id}`, data);
//       } else {
//         await axios.post("http://localhost:5000/users", data);
//       }
//       setShowForm(false);
//       fetchUsers();
//     } catch (err) {
//       console.error("Error saving user:", err);
//       setError("Failed to save user data");
//     }
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
//         ❌ {error}
//       </div>
//     </div>
//   );

//   return (
//     <div className="mx-auto py-10 px-4">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold">Users Data</h2>
//         <button
//           onClick={handleAdd}
//           className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
//         >
//           + Add User
//         </button>
//       </div>

//       {userData.length === 0 ? (
//         <p className="text-center text-gray-500">No Data found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {userData.map((user) => (
//             <div
//               key={user._id}
//               className="bg-white shadow-lg border border-gray-200 rounded-lg p-5 hover:shadow-xl transition relative"
//             >
//               <button
//                 onClick={() => handleEdit(user)}
//                 className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
//               >
//                 ✏️
//               </button>

//               <p className="text-gray-700"><strong>Full Name:</strong> {user.fullName}</p>
//               <p className="text-gray-700"><strong>Phone Number:</strong> {user.phoneNumber}</p>
//               <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
//               <p className="text-gray-700"><strong>DOB:</strong> {user.dob}</p>
//               <p className="text-gray-700"><strong>Gender:</strong> {user.gender}</p>
//               <p className="text-gray-700"><strong>City:</strong> {user.city}</p>
//               <p className="text-gray-700"><strong>Country:</strong> {user.country}</p>
//               <p className="text-gray-700"><strong>Therapy:</strong> {user.therapy}</p>
//               <p className="text-gray-700"><strong>Therapy Date:</strong> {user.therapyDate}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {showForm && (
//         <UserForm
//           initialData={editUser || {}}
//           onSave={handleSave}
//           onCancel={handleCancel}
//         />
//       )}
//     </div>
//   );
// };

// export default UsersDetail;





import { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ initialData = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    city: "",
    country: "",
    therapy: "",
    therapyDate: "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // Overlay with padding for better spacing and scroll
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md max-h-full overflow-y-auto"
      >
        <h3 className="text-xl font-bold mb-4">
          {initialData._id ? "Edit User" : "Add New User"}
        </h3>
        {Object.keys(formData).map((key) =>
          key !== "_id" ? (
            <div className="mb-3" key={key}>
              <label className="block text-sm font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ) : null
        )}
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
// dev2
const UsersDetail = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/users/get");
      setUserData(response.data);
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
        await axios.put(`http://localhost:5000/users/update/${data._id}`, data);
      } else {
        await axios.post("http://localhost:5000/users/create", data);
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
        <h2 className="text-3xl font-bold">Users Data</h2>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          + Add User
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
                className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
              >
                ✏️
              </button>

              <p className="text-gray-700"><strong>Full Name:</strong> {user.fullName}</p>
              <p className="text-gray-700"><strong>Phone Number:</strong> {user.phoneNumber}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>DOB:</strong> {user.dob}</p>
              <p className="text-gray-700"><strong>Gender:</strong> {user.gender}</p>
              <p className="text-gray-700"><strong>City:</strong> {user.city}</p>
              <p className="text-gray-700"><strong>Country:</strong> {user.country}</p>
              <p className="text-gray-700"><strong>Therapy:</strong> {user.therapy}</p>
              <p className="text-gray-700"><strong>Therapy Date:</strong> {user.therapyDate}</p>
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
