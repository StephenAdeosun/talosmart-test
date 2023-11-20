// pages/register.tsx
"use client";
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import RegistrationForm from '@/components/SignUpForm';

const RegisterPage: NextPage = () => {
  const router = useRouter();

  // Callback to execute on successful registration
  const handleRegisterSuccess = () => {
    // Redirect to the login page after successful registration
    router.push('/login');
  };

  return (
     <div className=" bg-gray-100 pt-16  h-screen ">
      <RegistrationForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default RegisterPage;
