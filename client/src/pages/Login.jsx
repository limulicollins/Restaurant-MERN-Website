import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
  <div
    className="login-container"
    style={{
      backgroundImage: "url('/background.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      minHeight: "100vh"
    }}
  >
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>

      <div className='input-box'>
        <FontAwesomeIcon icon={faEnvelope} className="input-icon-left" />
        <input name="email" type="email" value={form.email} onChange={handleChange} required/>
        <label htmlFor="email">Email:</label>
      </div>

      <div className='input-box'>
        <FontAwesomeIcon icon={faLock} className="input-icon-left" />
        <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} required/>
        <label htmlFor="password">Password:</label>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="input-icon-right cursor-pointer" onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide password" : "Show password"}/>
      </div>

      <div className='remember-forgot'>
        <label>
          <input type="checkbox" name='remember'/> Remember me
        </label>
        <a href="/forgot-password">Forgot password?</a>
      </div>

      <button type="submit">Login</button>

      <div className='register-link'>
        <span>Don't have an account? </span>
        <a href="/Register">Register</a>
      </div>

      {error && <p className="error-text">{error}</p>}
    </form>
  </div>
);
};

export default Login;
