import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-3e7e3.firebaseio.com/'
})      

export default instance;