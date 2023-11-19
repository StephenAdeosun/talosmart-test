// pages/createpost.tsx
"use client";
import { useState } from 'react';
import PostForm from '@/components/CreatePost';
import { useRouter } from 'next/navigation';

const CreatePostPage: React.FC = () => {
  const [postCreated, setPostCreated] = useState(false);
  const router = useRouter();

  const handleCreatePostSuccess = () => {
    setPostCreated(true);
    // Redirect to the posts page or wherever you want after creating a post
    // For example, redirecting to the posts page:
    // router.push('/posts');
  };

  return (
    <div>
      <h1>Create Post</h1>
      {postCreated ? (
        <p>Post created successfully!</p>
      ) : (
        <PostForm onCreatePostSuccess={handleCreatePostSuccess} />
      )}
    </div>
  );
};

export default CreatePostPage;
