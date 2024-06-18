import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchData = async (endpoint: any) => {
  try {
    console.log('trying to connect')
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
