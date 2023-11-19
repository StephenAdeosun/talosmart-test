// components/PostForm.tsx
import { useState, ChangeEvent } from 'react';
import { createPost } from '../services/api';

const PostForm: React.FC<{ onCreatePostSuccess: () => void }> = ({ onCreatePostSuccess }) => {
  const [username, setUsername] = useState(''); // New state for the username input
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      // Convert the selected image to Base64 for verification
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     const base64str = reader.result as string;
    //     console.log('Base64 String:', base64str);
    //   };
    //   reader.readAsDataURL(file);

    }
  };


  const handleCreatePost = async () => {
    try {
      const response = await createPost({ username, post: postText, image });

      if (response) {
        console.log(username, postText, image)
        if (onCreatePostSuccess) {
          onCreatePostSuccess();
        }
        console.log('Post created successfully!', response);
      } else {
        console.error('Failed to create post:', response);
        console.log(username, postText, image)

      }
    } catch (error) {
        console.log(username, postText, image)

      console.error('Error during post creation:', error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Post Text:
          <input type="text" value={postText} onChange={(e) => setPostText(e.target.value)} />
        </label>
        <br />
        <label>
          Image Upload:
          <input type="file" accept="image/*"  onChange={handleFileChange} />
        </label>
        <br />
        <button type="button" onClick={handleCreatePost}>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
