// pages/login.tsx
"use client";
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

const LoginPage: NextPage = () => {
  const router = useRouter();

  // Callback to execute on successful login
  const handleLoginSuccess = () => {
    // Redirect to the dashboard or home page after successful login
    router.push('/dashboard'); // Adjust the route as needed
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
