import axios from 'axios';

const dbApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_DB_URL
})
export default dbApi