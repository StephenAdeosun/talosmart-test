// pages/HomePage.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage: React.FC = () => {
  // Your existing content
  toast.success('Login successful!');
  return (
    <div>
      <ToastContainer/>
      {/* Your existing content */}
      <Link href="/posts">
        View Posts
      </Link>
    </div>
  );
};

export default HomePage;
