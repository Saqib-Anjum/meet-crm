import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/Slices/AuthSlices';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onSubmit = async (data) => {
    setApiError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'https://crm.airx.ac/signin',   // adjust to your real base URL if needed
        { email: data.email, password: data.password }
      );
      const { token, user } = response.data;

      // store token & optionally user info
      // localStorage.setItem('authToken', token);
      // if (data.remember) {
      //   localStorage.setItem('isAuthenticated', 'true');
      // }

      // // redirect to dashboard (or wherever)
      // console.log('Login succeeded, about to navigate…');
      // navigate('/');



      dispatch(loginSuccess({ user, token }));

      // 2️⃣ Store token in localStorage if you want persistence
      if (data.remember) {
        localStorage.setItem('authToken', token);
      }

      // 3️⃣ Now navigate; ProtectedRoute will see auth=true and allow you in
      console.log('Login succeeded, about to navigate…');
      navigate('/', { replace: true });




    } catch (err) {
      console.error('Login failed:', err);
      // show first error message from server or generic
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Panel */}
      <div className="w-full max-w-md m-auto bg-white rounded-xl shadow-md overflow-hidden md:w-1/2">
        <div className="px-8 py-10">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
            Sign In
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Welcome back! Please enter your details
          </p>

          {apiError && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {apiError}
            </div>
          )}

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
                disabled={isSubmitting}
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
                    message:
                      "8–15 chars, incl. uppercase, lowercase, digit & special.",
                  },
                }}
                render={({ field }) => (
                  <div className="relative">
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      disabled={isSubmitting}
                      className={`block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.password
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register('remember')}
                  disabled={isSubmitting}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Remember for 30 Days
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-lg text-white transition duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#27AE60] hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex md:flex-1 bg-[#0B5CFF] text-white items-center justify-center p-10">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <p className="text-2xl">
            <span>Aurora Family Counseling</span> CRM
          </p>
          <p className="text-gray-200">
           Please proceed to signin Frank's CRM.
          </p>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-500 text-sm">
              Contact Us at (301) 678 8088
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
