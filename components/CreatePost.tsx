// components/PostForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPost } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MAX_IMAGE_SIZE_MB = 0.5;
const PostForm: React.FC<{ onCreatePostSuccess: () => void }> = ({ onCreatePostSuccess }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      postText: '',
      image: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      postText: Yup.string().required('Post Text is required'),
      image: Yup.mixed()
      .required('Image is required')
      .test('fileSize', 'File size too large', (value) => {
        if (!value) return false;
        return (value as File).size <= MAX_IMAGE_SIZE_MB * 1024 * 1024;
      }),

    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const response = await createPost({
          username: values.username,
          post: values.postText,
          image: values.image,
        });

        if (response) {
          toast.success('Post created successfully!');
          if (onCreatePostSuccess) {
            onCreatePostSuccess();
          }
          console.log('Post created successfully!', response);
        } else {
          toast.error('Failed to create post.');
          console.error('Failed to create post:', response);
        }
      } catch (error) {
        toast.error('An error occurred during post creation.');
        console.error('Error during post creation:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-md p-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Post</h2>
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
          <label className="block mb-1" htmlFor="postText">
            Post Text:
          </label>
          <input
            type="text"
            id="postText"
            name="postText"
            value={formik.values.postText}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              formik.touched.postText && formik.errors.postText
                ? 'border-red-500 bg-red-100'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.postText && formik.errors.postText ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.postText}</div>
          ) : null}
        </div>
        <div>
          <label className="block mb-1" htmlFor="image">
            Image Upload:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue('image', event.currentTarget.files?.[0]);
            }}
            onBlur={formik.handleBlur}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              formik.touched.image && formik.errors.image
                ? 'border-red-500 bg-red-100'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className={`bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-md hover:from-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
            formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {formik.isSubmitting ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white"
              viewBox="0 0 24 24"
            ></svg>
          ) : null}
          {formik.isSubmitting ? '' : 'Create Post'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PostForm;
