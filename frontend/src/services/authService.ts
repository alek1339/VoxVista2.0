import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (userData: any) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};
