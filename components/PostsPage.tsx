// components/PostsPage.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Updated import
import { getPostsByUser } from '../services/api';

interface Post {
  username: string;
  base64str: string | null;
  post: string;
  created_at: string; // Assuming created_at is a string; adjust accordingly
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const searchParams = useSearchParams(); // Updated

  useEffect(() => {
    const username = searchParams.get('username');
    if (username) {
      // Fetch posts when the component mounts or when the username changes
      fetchPosts(username);
    }
  }, [searchParams]);

  const fetchPosts = async (selectedUsername: string) => {
    try {
      const fetchedPosts = await getPostsByUser(selectedUsername);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Posts by {searchParams.get('username')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.created_at}
            className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{post.post}</h2>
            <p className="text-gray-600 mb-4">{post.username}</p>
            {post.base64str && (
              <img src={`data:image/png;base64,${post.base64str}`} alt="Post Image" className="mb-4" />
            )}
            <p className="text-gray-500">{post.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
