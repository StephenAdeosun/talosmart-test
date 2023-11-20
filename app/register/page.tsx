// pages/register.tsx
"use client";
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import RegistrationForm from '@/components/SignUpForm';
import Link from 'next/link';
const RegisterPage: NextPage = () => {
  const router = useRouter();

  // Callback to execute on successful registration
  const handleRegisterSuccess = () => {
    // Redirect to the login page after successful registration
    router.push('/login');
  };

  return (
     <div className=" bg-gray-100   h-screen ">
       <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/"className="text-white text-lg font-bold">
            Home
          </Link>
          <div className="space-x-4">
            <Link href="/login"className="text-white">
              Login
            </Link>
          
          </div>
        </div>
      </nav>
     <div className=" bg-gray-100 pt-16  h-screen ">

      <RegistrationForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
    </div>
  );
};

export default RegisterPage;
