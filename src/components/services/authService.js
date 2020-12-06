import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth/';       

class AuthService {
    login(login) {
        return axios.post(API_URL + 'login', { login }).then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        console.log('>logout');
        localStorage.removeItem('user');
    }

    register(account) {
        return axios.post(API_URL + 'register', { account });
    }

    get currentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();