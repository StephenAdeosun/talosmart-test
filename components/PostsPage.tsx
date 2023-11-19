// components/PostsPage.tsx
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // Updated import
import { getPostsByUser } from '../services/api';

interface Post {
  username: string;
  base64str: string | null;
  post: string;
  created_at: string; // Assuming created_at is a string; adjust accordingly
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const pathname = usePathname(); // Updated
  const searchParams = useSearchParams(); // Updated

  useEffect(() => {
    const username = searchParams.get('username');
    if (username) {
      // Fetch posts when the component mounts or when the username changes
      fetchPosts(username);
    }
  }, [pathname, searchParams]);

  const fetchPosts = async (selectedUsername: string) => {
    try {
      const fetchedPosts = await getPostsByUser(selectedUsername);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <h1>Posts by {searchParams.get('username')}</h1>
      <ul>
        {posts.map((post) => (
            <div key={post.created_at}>
          <li >{post.post}</li>
          <li>{post.base64str}</li>
          <li>{post.username}</li>

            </div>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
