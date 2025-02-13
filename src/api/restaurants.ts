import axios from 'axios';
import { NewRestaurant, SavedRestaurant } from '../vite-env'

// Create an Axios instance with base URL and timeout settings
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    withCredentials: true,
});

// Function to save the restaurant to the database
export async function saveRestaurant (endpoint: string, restaurant: NewRestaurant) : Promise<any> {
    
    try {
        const response = await instance.post(endpoint, restaurant);
        return response.data;
    } catch (error) {
        console.error('Error saving restaurant: ', error);
        throw error;
    }
}

// Function to fetch the restaurant by Place ID
export async function fetchRestaurant (endpoint: string) : Promise<SavedRestaurant> {    
    try {
        const response = await instance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurant: ', error);
        throw error;
    }
}