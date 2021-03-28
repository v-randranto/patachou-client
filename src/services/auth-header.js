
import AuthService from "./authService";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function authHeader():any {  
    const currentUser = AuthService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': currentUser.accessToken };
    } else {
      return {};
    }
  }