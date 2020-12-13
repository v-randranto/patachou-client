import { apiCall } from '../../api/axios';
import { AUTH_API, METHOD } from '../../constants/api';

const { RESSOURCE, LOGIN, REGISTER } = AUTH_API;

class AuthService {
    path = '';
    login(login) {
        this.path = `${RESSOURCE}/${LOGIN}`;
        return apiCall(this.path, METHOD.POST, { login }).then(data => {
            return data;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(account) {
        this.path = `${RESSOURCE}/${REGISTER}`;
        return apiCall(this.path, METHOD.POST, { account }).then(status => status);
    }

    get currentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    setCurrentUser(data) {
        localStorage.setItem('user', JSON.stringify(data));
    }
}

export default new AuthService();
