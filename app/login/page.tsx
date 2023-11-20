// pages/login.tsx
"use client";
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
const LoginPage: NextPage = () => {
  const router = useRouter();

  // Callback to execute on successful login
  const handleLoginSuccess = () => {
    // Redirect to the dashboard or home page after successful login
    router.push('/create-post');
    toast.success('Login successful!');
  };

  return (
     <div className=" bg-gray-100 h-screen ">
 <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/"className="text-white text-lg font-bold">
            Home
          </Link>
          <div className="space-x-4">
           
            <Link href="/register" className="text-white">
              Signup
            </Link>
          </div>
        </div>
      </nav>

     <div className=" bg-gray-100 pt-16  h-screen ">
      <ToastContainer />
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
    </div>
   
  );
};

export default LoginPage;
