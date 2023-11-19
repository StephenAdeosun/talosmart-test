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
    // router.push('/login');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <RegistrationForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default RegisterPage;
