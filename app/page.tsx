// pages/index.tsx
import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/"className="text-white text-lg font-bold">
            Home
          </Link>
          <div className="space-x-4">
            <Link href="/login"className="text-white">
              Login
            </Link>
            <Link href="/register" className="text-white">
              Signup
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Talosmart Page</h1>
        <p className="text-gray-700">
          This is a simple home page with a navigation bar. You can login,register and create posts here.
        </p>
        <div className="mt-8">
          <Link href="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md">
             Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
