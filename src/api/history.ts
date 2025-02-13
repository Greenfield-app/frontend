import axios from 'axios';
import { Record } from '../vite-env'

// Create an Axios instance with base URL and timeout settings
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    withCredentials: true,
});

// Function to add accepted restaurant recommendation to records
export async function addRestaurantToEatsHistory (endpoint: string) : Promise<any> {
    try {
        const response = await instance.post(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error saving restaurant: ', error);
        throw error;
    }
}

// Function to fetch user's Eat History
export async function fetchEatHistory (endpoint:string) : Promise<Record[]> {
    try {
        const response = await instance.get(endpoint);
        return Array.isArray(response.data) ? response.data : []
    } catch (error) {
        console.error('Error fetching eat history: ', error);
        throw error;
    }
}
