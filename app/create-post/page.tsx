// pages/createpost.tsx
"use client";
import { useState } from 'react';
import PostForm from '@/components/CreatePost';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
const CreatePostPage: React.FC = () => {
  const [postCreated, setPostCreated] = useState(false);
  const router = useRouter();

  const handleCreatePostSuccess = () => {
    setPostCreated(true);
    toast.success('Post created successfully!');
    // Redirect to the posts page or wherever you want after creating a post
    // For example, redirecting to the posts page:
    router.push('/posts');
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
               <Link href="/login" className="text-white">
                 Login
               </Link>
             </div>
           </div>
         </nav>
   
        <div className=" bg-gray-100 pt-16  h-screen ">
      
        <ToastContainer />

        <PostForm onCreatePostSuccess={handleCreatePostSuccess} />
    </div>
    </div>
  );
};

export default CreatePostPage;
