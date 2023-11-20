// pages/createpost.tsx
"use client";
import { useState } from 'react';
import PostForm from '@/components/CreatePost';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePostPage: React.FC = () => {
  const [postCreated, setPostCreated] = useState(false);
  const router = useRouter();

  const handleCreatePostSuccess = () => {
    setPostCreated(true);
    toast.success('Post created successfully!');
    // Redirect to the posts page or wherever you want after creating a post
    // For example, redirecting to the posts page:
    router.push('/dashboard');
  };

  return (
    <div>
      
        <ToastContainer />

        <PostForm onCreatePostSuccess={handleCreatePostSuccess} />
    </div>
  );
};

export default CreatePostPage;
