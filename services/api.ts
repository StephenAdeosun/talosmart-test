// services/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://assignment-api-spxd.onrender.com/api';

export const loginUser = async (credentials: { username: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/login`, credentials);
};

export const registerUser = async (credentials: { username: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/register`, credentials);
};

export const createPost = async (data: { username: string; post: string;image?: File | null }) => {
    const { username, post, image } = data;
  
    try {
      let base64str = '';
  
      // Convert the selected image to Base64
      if (image) {
        const reader = new FileReader();
        return new Promise<string>((resolve, reject) => {
          reader.onloadend = () => {
            base64str = reader.result as string;
            console.log('Final Base64 String:', base64str);
            resolve(base64str);
          };
  
          reader.onerror = reject;
  
          reader.readAsDataURL(image);
        })
          .then((base64) => {
            return axios.post(`${API_BASE_URL}/createpost`, { username, base64str: base64, post });
            
          })
          .catch((error) => {
            throw error;
          });
      } else {
        return axios.post(`${API_BASE_URL}/createpost`, { username, post });
      }
    } catch (error) {
      throw error;
    }
  };
  

// export const getPostsByUser = async (email: string) => {
//   return axios.get(`${API_BASE_URL}/posts/${email}`);
// };


export const getPostsByUser = async (username: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${username}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };