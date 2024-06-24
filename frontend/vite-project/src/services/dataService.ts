import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchData = async (endpoint: string, config?: AxiosRequestConfig) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw new Error('Failed to delete data');
  }
};

export const updateData = async (endpoint: string, data: any, config?: AxiosRequestConfig) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data, config);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw new Error('Failed to update data');
  }
};
