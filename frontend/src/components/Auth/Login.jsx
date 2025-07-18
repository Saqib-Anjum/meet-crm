// import React from 'react';

// export default function Login() {
//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Left Panel */}
//       <div className="w-full max-w-md m-auto bg-white rounded-xl shadow-md overflow-hidden md:w-1/2">
//         <div className="px-8 py-10">
//           <div className="flex justify-center mb-8">
//             {/* Logo */}
//             {/* <img src="/logo.png" alt="Fil Pay" className="h-10" /> */}
//           </div>
//           <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">Sign In</h2>
//           <p className="text-sm text-gray-600 text-center mb-6">Welcome back! Please enter your details</p>
//           <form className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <div className="relative mt-1">
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-400">
//                   {/* Eye Icon Placeholder */}
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M10 3C6 3 2.73 5.11 1 8c1.73 2.89 5 5 9 5s7.27-2.11 9-5c-1.73-2.89-5-5-9-5z" />
//                     <path d="M10 13a3 3 0 100-6 3 3 0 000 6z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <label className="inline-flex items-center">
//                 <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
//                 <span className="ml-2 text-sm text-gray-600">Remember for 30 Days</span>
//               </label>
//               <a href="#" className="text-sm text-[#27AE60] hover:underline">Forgot password</a>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 bg-[#27AE60] text-white rounded-lg hover:bg-blue-700 transition duration-200"
//             >
//               Sign in
//             </button>
//           </form>
//           <div className="mt-6 text-center text-gray-500">OR</div>
//           <p className="mt-6 text-center text-sm text-gray-600">
//             Don’t have an account?{' '}
//             <a href="#" className="text-[#27AE60] hover:underline">Sign up</a>
//           </p>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="hidden md:flex md:flex-1 bg-[#1F263E] text-white items-center justify-center p-10">
//         <div className="max-w-md space-y-6">
//           <h1 className="text-4xl font-bold">Welcome back!</h1>
//           <p className="text-2xl">
//             Please sign in to your <span className="underline">Zoom Meeting Management</span> System
//           </p>
//           <p className="text-gray-200">Zoom Meeting Management System for Managing the Meeting Sessions.</p>
//           {/* Sales Report Chart Placeholder */}
//           <div className="bg-white rounded-xl p-6 shadow-lg">
//             {/* Chart and category donut would go here */}
//             <p className="text-gray-500 text-sm">Contact Us at (210) 559 7311 </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';

export default function Login() {
 const [showPassword, setShowPassword] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    }
  });

  const onSubmit = (data) => {
        navigate("/")
    console.log('Form Data:', data);
    // TODO: call your API or context login function here
    // window.location.href = "abc.com"
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Panel */}
      <div className="w-full max-w-md m-auto bg-white rounded-xl shadow-md overflow-hidden md:w-1/2">
        <div className="px-8 py-10">
          <div className="flex justify-center mb-8">
            {/* Logo */}
            {/* <img src="/logo.png" alt="Fil Pay" className="h-10" /> */}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
            Sign In
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Welcome back! Please enter your details
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

<div className="mb-4">
  <label className=" block text-sm font-medium text-gray-700">Password</label>
  <Controller

    name="password"
    control={control}
    rules={{
      required: "Password is required",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
        message:
          "Password must be 8–15 chars, incl. uppercase, lowercase, digit & special.",
      },
    }}
    render={({ field }) => (
      <div className="relative">
        <input
          {...field}
          type={showPassword ? "text" : "password"}
          disabled={isSubmitting}
          className={`
            block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
            ${errors.password ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'}
          `}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400"
          tabIndex={-1}
        >
          {showPassword ? (
            <LiaEyeSlashSolid className="w-5 h-5 text-gray-600" />
          ) : (
            <LiaEyeSolid className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    )}
  />
  {errors.password && (
    <p className="text-red-500 text-sm mt-1">
      {errors.password.message}
    </p>
  )}
</div>


            {/* Remember Checkbox & Forgot */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register('remember')}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Remember for 30 Days
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-[#27AE60] hover:underline"
              >
                Forgot password
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-[#27AE60] text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500">OR</div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="#" className="text-[#27AE60] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex md:flex-1 bg-[#51576b] text-white items-center justify-center p-10">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <p className="text-2xl">
            Please sign in to your{' '}
            <span className="underline">Zoom Meeting Management</span> System
          </p>
          <p className="text-gray-200">
            Zoom Meeting Management System for Managing the Meeting Sessions.
          </p>
          {/* Sales Report Chart Placeholder */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            {/* Chart and category donut would go here */}
            <p className="text-gray-500 text-sm">
              Contact Us at (210) 559 7311
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
