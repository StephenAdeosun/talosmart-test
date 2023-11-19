// pages/HomePage.tsx
"use client";
import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  // Your existing content

  return (
    <div>
      {/* Your existing content */}
      <Link href="/posts">
        View Posts
      </Link>
    </div>
  );
};

export default HomePage;
