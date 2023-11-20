// pages/login.tsx
"use client";
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginPage: NextPage = () => {
  const router = useRouter();

  // Callback to execute on successful login
  const handleLoginSuccess = () => {
    // Redirect to the dashboard or home page after successful login
    router.push('/create-post');
    toast.success('Login successful!');
  };

  return (
     <div className=" bg-gray-100 pt-16  h-screen ">
      <ToastContainer />
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
