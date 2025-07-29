import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const [errors, setErrors] = useState({});
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = ['Weak', 'Medium', 'Strong'];
    const colors = ['red', 'orange', 'green'];
    const level = Math.min(score, 3);

    return {
      label: labels[level - 1] || 'Too Weak',
      color: colors[level - 1] || 'gray',
      width: `${(score / 4) * 100}%`,
      score,
    };
  };

  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ label: '', color: '' });
  const isRegisterDisabled =
    passwordStrength.label === 'Weak' || !formData.terms;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.terms) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

     try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);

      if (response.data) {
        toast.success('Registration successful!');
        navigate('/Login');
      }
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errorMsg);
    }
  };

  return (
    <div
        className="register-container"
        style={{
            backgroundImage: "url('/background.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "100vh"
        }}
    >
      <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>

      <div className="input-box">
        <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
        <label htmlFor="name">Name:</label>
        <FontAwesomeIcon icon={faUser} className="input-icon-left" />
      </div>
        
      <div className="input-box">
        <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
        <label htmlFor="email">Email:</label>
        <FontAwesomeIcon icon={faEnvelope} className="input-icon-left" />
        {errors.email && <p style={{ color: 'red', marginTop: '8px', fontSize: '0.875rem' }}>{errors.email}</p>}
      </div>
    
      <div className="input-box">
        <FontAwesomeIcon icon={faLock} className="input-icon-left" />
        <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required/>
        <label htmlFor="password">Password:</label>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="input-icon-right cursor-pointer" onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide password" : "Show password"}/>
        {formData.password && (
        <div className="mb-4">
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-full rounded strength-bar"
              style={{
                width: passwordStrength.width,
                backgroundColor: passwordStrength.color,
              }}
            ></div>
          </div>
          <p className="input-hint" style={{ color: passwordStrength.color }}>
            Strength: {passwordStrength.label}
          </p>
        </div>
      )}
      </div>
      

      <div className="input-box">
        <FontAwesomeIcon icon={faLock} className="input-icon-left" />
        <input type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="input-icon-right cursor-pointer" onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide password" : "Show password"}/>
      </div>

      <div className='terms'>
        <label>
          <input type="checkbox" name='terms' checked={formData.terms} onChange={handleChange}/> 
          I agree to the terms and conditions
        </label>
      </div>

        <button type="submit" disabled={isRegisterDisabled}
          style={{
            opacity: isRegisterDisabled ? 0.6 : 1,
            cursor: isRegisterDisabled ? 'not-allowed' : 'pointer',
          }} className="register-button"
        >
        Register
        </button>
        {isRegisterDisabled && (
          <p style={{ color: 'red', marginTop: '8px', fontSize: '0.875rem' }}>
            {passwordStrength.label === 'Weak'
              ? 'Password must be at least medium strength.'
              : !formData.agreeToTerms
              ? 'You must agree to the terms and conditions.'
              : ''}
          </p>
        )}
        
        {message && <p className="mt-2 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
