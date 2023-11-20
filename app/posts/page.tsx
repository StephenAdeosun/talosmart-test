// pages/Posts.tsx
"use client";
import React from 'react';
import PostsPage from '@/components/PostsPage';
import Link from 'next/link';
const Posts: React.FC = () => {
  return (
    <div>
       <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/"className="text-white text-lg font-bold">
            Home
          </Link>
          <div className="space-x-4">
            <Link href="/create-post"className="text-white">
              Create Post
            </Link>
          

          </div>
        </div>
      </nav>
      {/* Display the PostsPage component */}
      <PostsPage />
    </div>
  );
};

export default Posts;

