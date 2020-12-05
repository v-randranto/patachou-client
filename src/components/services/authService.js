import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

class AuthService {
  login(pseudo, password) {
    return axios
      .post(API_URL + "login", {
        pseudo,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "register", {user});
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();