import { apiCall } from '../api/axios';
import { AUTH_API, METHOD } from '../constants/api';

const { RESSOURCE, LOGIN, LOST_PASSWORD, REGISTER, RESET_PASSWORD } = AUTH_API;

class AuthService {
    path = '';
    login(identification) {
        this.path = `${RESSOURCE}/${LOGIN}`;
        return apiCall(this.path, METHOD.POST, { identification }).then(data => data)
    }

    logout() {
        localStorage.removeItem('user');
    }

    lostPassword(email) {
        this.path = `${RESSOURCE}/${LOST_PASSWORD}`;
        return apiCall(this.path, METHOD.POST, { email }).then(data => data);
    }

    register(profile) {
        this.path = `${RESSOURCE}/${REGISTER}`;
        return apiCall(this.path, METHOD.POST, { profile }).then(data => data);
    }

    resetPassword(password, resetToken) {
        this.path = `${RESSOURCE}/${RESET_PASSWORD}/${resetToken}`;
        return apiCall(this.path, METHOD.PUT, { password }).then(data => data);
    }

    get currentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    setCurrentUser(data) {
        localStorage.setItem('user', JSON.stringify(data));
    }
}

export default new AuthService();
