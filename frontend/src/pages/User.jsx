// import React, { useEffect, useRef, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { toast } from 'react-toastify';

// export default function User() {
//   const { handleSubmit, control, reset, setValue, getValues, formState: { errors } } = useForm({
//     defaultValues: {
//       fullName: "",
//       phoneNumber: "",
//       email: "",
//       dob: "",
//       gender: "",
//       city: "",
//       country: "",
//       therapy: "",
//     },
//   });
// //   const [profileImage, setProfileImage] = useState(PlaceHolder);
//   const fileInputRef = useRef(null);
//   const [isSubmitting, setIsSubmitting] = useState(false); 
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [emailVerified, setEmailVerified] = useState('');
//   const [verifyEmail, setVerifyEmail] = useState('');

// const formatDate = (date) => {
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = (d.getMonth() + 1).toString().padStart(2, '0');
//   const day = d.getDate().toString().padStart(2, '0'); 

//   return `${year}-${month}-${day}`;
// };
  


//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };


//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post('http://localhost:5000/users', data);
//       toast.success('User added successfully!');
//       reset();
//       if (fileInputRef.current) fileInputRef.current.value = null;
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to add user');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   return (

//     <>
//       <div className="min-h-screen border-t-2 border-slate-200 flex flex-col mx-auto p-4">
//         <div className="bg-white p-6 rounded-lg shadow-md w-full">
//           <div className="items-center bg-white justify-center mb-8 mt-5">
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
//                 Full Name
//               </label>
//               <Controller
//                 name="fullName"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     id="fullName"
//                     placeholder="Full Name"
//                     className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                 )}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="phoneNumber">
//                 Phone Number
//               </label>
//               <Controller
//                 name="phoneNumber"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     id="phoneNumber"
//                     type="tel"
//                     placeholder="Phone Number"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                 )}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
//                 Email
//               </label>
//               <Controller
//                 name="email"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="relative w-full">
//                   <input
//                     {...field}
//                     id="email"
//                     type="email"
//                     placeholder="Email"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                     </div>
//                 )}
//               />
            
//             </div>
//            {/* <div><a href=''> <p> {verifyEmail}</p> </a></div> */}
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="dob">
//                 DOB
//               </label>
//               <Controller
//                 name="dob"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     id="dob"
//                     type="date"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                 )}
//               />
//             </div>

            // <div className="mb-4">
            //   <label className="block text-gray-700 font-medium mb-2" htmlFor="gender">
            //     Gender
            //   </label>
            //   <Controller
            //     name="gender"
            //     control={control}
            //     render={({ field }) => (
            //       <select
            //         {...field}
            //         id="gender"
            //         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            //       >
            //         <option value="">Select Gender</option>
            //         <option value="male">Male</option>
            //         <option value="female">Female</option>
            //         <option value="other">Other</option>
            //       </select>
            //     )}
            //   />
            // </div>
            // <div className="mb-4">
            //   <label className="block text-gray-700 font-medium mb-2" htmlFor="phoneNumber">
            //     City
            //   </label>
            //   <Controller
            //     name="city"
            //     control={control}
            //     render={({ field }) => (
            //       <input
            //         {...field}
            //         id="city"
            //         type="text"
            //         placeholder="City"
            //         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            //       />
            //     )}
            //   />
            // </div>

            // <div className="mb-4">
            //   <label className="block text-gray-700 font-medium mb-2" htmlFor="country">
            //     Country
            //   </label>
            //   <Controller
            //     name="country"
            //     control={control}
            //     render={({ field }) => (
            //       <select
            //         {...field}
            //         id="country"
            //         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            //       >
            //         <option value="">Select Country</option>
            //         <option value="USA">USA</option>
            //         <option value="Canada">Canada</option>
            //         <option value="Other">Other</option>
            //       </select>
            //     )}
            //   />
            // </div>

            // <div className="mb-4">
            //   <label className="block text-gray-700 font-medium mb-2" htmlFor="country">
            //     Therapy
            //   </label>
            //   <Controller
            //     name="therapy"
            //     control={control}
            //     render={({ field }) => (
            //       <select
            //         {...field}
            //         id="therapy"
            //         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-"
            //       >
            //         <option value="Individual Therapy">Individual Therapy</option>
            //         <option value="Couples and Relationship Therapy">Couples and Relationship Therapy</option>
            //         <option value="Family Therapy">Family Therapy</option>
            //         <option value="Life Coaching">Life Coaching</option>
            //         <option value="Grief Counseling">Grief Counseling</option>
            //         <option value="Anxiety & Stress Management">Anxiety & Stress Management</option>
            //         <option value="Other Therapy">Other Therapy</option>
            //       </select>
            //     )}
            //   />
            // </div>

//               <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="dob">
//                 Therapy Date
//               </label>
//               <Controller
//                 name="therapyDate"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     id="therapyDate"
//                     type="date"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                 )}
//               />
//             </div>

//             <div className='pt-3 mb-4'>
//               <button
//                 type="submit"
//                 className={`bg-black w-28 text-white py-2 px-4 rounded-md font-medium`}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Adding User...' : 'Add User'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       </>
//   );
// }





import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

export default function User() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      dob: "",
      gender: "",
      city: "",
      country: "",
      therapy: "",
      therapyDate: ""
    }
  });

  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const onSubmit = async (data) => {
  //   setIsSubmitting(true);
  //   try {
  //     // POST to backend API
  //     const response = await axios.post('http://localhost:5000/users', data);
  //     toast.success('User added successfully!');
  //     reset();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Failed to add user');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    // POST to backend API
    const response = await axios.post('http://localhost:5000/users', data);
    reset();
  } catch (error) {
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen border-t-2 border-slate-200 flex flex-col mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: 'Full name is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  id="fullName"
                  placeholder="Full Name"
                  className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              )}
            />
            {errors.fullName && <p className="text-red-500 mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: 'Phone number is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              )}
            />
            {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Invalid email address' } }}
              render={({ field }) => (
                <input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              )}
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* DOB */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
              DOB
            </label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="dob"
                  type="date"
                  className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              )}
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="gender"
                  className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              )}
            />
          </div>

          <div className="mb-4">
                 <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
                   City
                 </label>
                 <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="city"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="country">
                Country
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="country"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="">Select Country</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Other">Other</option>
                  </select>
                )}
              />
            </div>

              <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="country">
                Therapy
              </label>
              <Controller
                name="therapy"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="therapy"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-"
                  >
                    <option value="Individual Therapy">Individual Therapy</option>
                    <option value="Couples and Relationship Therapy">Couples and Relationship Therapy</option>
                    <option value="Family Therapy">Family Therapy</option>
                    <option value="Life Coaching">Life Coaching</option>
                    <option value="Grief Counseling">Grief Counseling</option>
                    <option value="Anxiety & Stress Management">Anxiety & Stress Management</option>
                    <option value="Other Therapy">Other Therapy</option>
                  </select>
                )}
              />
            </div>

            

               <div className="mb-4">
                 <label className="block text-gray-700 font-medium mb-2" htmlFor="therapyDate">
                   Therapy Date
                 </label>
                 <Controller
                name="therapyDate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="therapyDate"
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                )}
              />
            </div>


            

          {/* Submit Button */}
          <div className="pt-3 mb-4">
            <button
              type="submit"
              className="bg-black w-28 text-white py-2 px-4 rounded-md font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
