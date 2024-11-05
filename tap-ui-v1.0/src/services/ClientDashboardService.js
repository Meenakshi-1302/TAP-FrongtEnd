// src/services/clientDashboardService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

// Function to fetch job requirements
export const getJobRequirements = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/requirements`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job requirements:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to fetch manufacturers
export const getManufacturers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mfrs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to fetch candidates
export const getCandidates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/candidates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error; // Rethrow the error for handling in the component
  }
};