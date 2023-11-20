// components/RegistrationForm.tsx
import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from 'react-router-dom' if using React Router
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegistrationFormProps {
  onRegisterSuccess: () => void;

}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegisterSuccess }) => {
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

        const response = await registerUser(values);

        if (response.status === 200) {
          toast.success('Registration successful!');
          setSuccessMessage(null);

          if (onRegisterSuccess) {
            onRegisterSuccess();
          }
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        toast.error('An error occurred during registration.');
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className="min-h-screen ">
      <div className="max-w-md mx-auto bg-white rounded-md p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        {successMessage && (
          <div className="text-green-500 mb-4 text-center">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
        )}
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
              className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white"
              viewBox="0 0 24 24"
            ></svg>
          ) : null}
          {loading ? '' : 'Register'}
        </button>
        
        <div className="text-center mt-4">
          <p>Already have an account?</p>
          <Link href="/login" className="text-blue-500 underline">
          <button className="text-blue-500 underline">
            Login
          </button>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default RegistrationForm;
