/* eslint-disable react/no-unescaped-entities */
// components/LoginForm.tsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../services/api';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const response = await loginUser(values);

        if (response.data.message === "Login Successful") {
          toast.success('Login successful!');
          setErrorMessage(null);

          if (onLoginSuccess) {
            onLoginSuccess();
          }
        } else if ( response.data.message === "Incrorrect Login Details" ) {
          toast.error("Incorrect Login Details");
        }
      } catch (error) {
        console.error('Error during login:', error);
        toast.error('An error occurred during login.');
      } finally {
        setLoading(false);
      }
    },
  });


  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-md p-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              formik.touched.username && formik.errors.username
                ? 'border-red-500 bg-red-100'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
          ) : null}
        </div>
        <div>
          <label className="block mb-1" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              formik.touched.password && formik.errors.password
                ? 'border-red-500 bg-red-100'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className={`bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-md hover:from-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white"
              viewBox="0 0 24 24"
            ></svg>
          ) : null}
          {loading ? '' : 'Login'}
        </button>
      </form>

      <div className="text-center mt-4">
          <p>Don't have an account?</p>
          <Link href="/register" className="text-blue-500 underline">
          <button className="text-blue-500 underline">
            Register
          </button>
          </Link>
        </div>
    </div>
  );
};

export default LoginForm;





