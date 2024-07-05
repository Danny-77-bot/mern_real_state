import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', formData);
      const data = res.data;
      setLoading(false);

      if (!data.success) {
        setError(data.message || 'Sign up failed. Please try again.');
      } else {
        setError(null);
        navigate('/sign-in');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={handleChange}
          className='border p-3 rounded-lg'
          id='username'
          type='text'
          placeholder='Username'
          required
        />
        <input
          onChange={handleChange}
          className='border p-3 rounded-lg'
          id='email'
          type='email'
          placeholder='Email'
          required
        />
        <input
          onChange={handleChange}
          className='border p-3 rounded-lg'
          id='password'
          type='password'
          placeholder='Password'
          minLength={6}
          required
        />
        <button
          disabled={loading}
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
    </div>
  );
}
