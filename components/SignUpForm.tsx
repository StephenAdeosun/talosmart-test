// components/RegistrationForm.tsx
import { useState } from 'react';
import { registerUser } from '../services/api';

interface RegistrationFormProps {
  onRegisterSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await registerUser({ username, password });

      if (response.status === 200) {
        console.log(response);
        
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
        console.log('Registration successful!');
      } else {
        console.error('Registration failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
