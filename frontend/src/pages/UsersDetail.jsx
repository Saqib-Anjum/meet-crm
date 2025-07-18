import { useState, useEffect } from "react";
import axios from "axios";

const UsersDetail = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    axios
      .get("http://localhost:5000/users/get")
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load user data");
        setLoading(false);
      });
  }, []);



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
      <h2 className="text-3xl font-bold text-center mb-6">Users Data</h2>

      {userData.length === 0 ? (
        <p className="text-center text-gray-500">No Data found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userData.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg border border-gray-200 rounded-lg p-5 hover:shadow-xl transition"
            >
              <p className="text-gray-700">
                <strong>Full Name:</strong> {user.fullName}
              </p>
              <p className="text-gray-700">
                <strong>Phone Number:</strong> {user.phoneNumber}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700">
                <strong>DOB:</strong> {user.dob}
              </p>
              <p className="text-gray-700">
                <strong>Gender:</strong> {user.gender}
              </p>
              <p className="text-gray-700">
                <strong>City:</strong> {user.city}
              </p>
               <p className="text-gray-700">
                <strong>Country:</strong> {user.country}
              </p>
               <p className="text-gray-700">
                <strong>Therapy:</strong> {user.therapy}
              </p>
               <p className="text-gray-700">
                <strong>Therapy Date:</strong> {user.therapyDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersDetail;