import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-e90a5.firebaseio.com/'
});

export default instance;