import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { registerUser } from '../store/authSlice';
import { RootState, AppDispatch } from '../store/store';

import { Input } from 'components/forms';
import  {Button}  from 'components/ui/';
import { AuthCard } from 'components/layout';

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    nativeLanguage: 'en',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <AuthCard title="Create Account">
      <form onSubmit={handleSubmit}>
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />

        <div style={{ marginBottom: '1rem' }}>
          <label>Native Language</label>
          <select
            name="nativeLanguage"
            value={formData.nativeLanguage}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px' }}
          >
            <option value="en">English</option>
            <option value="bg">Bulgarian</option>
          </select>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Register'}
        </Button>
      </form>
    </AuthCard>
  );
};

export default Register;
