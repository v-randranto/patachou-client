
import AuthService from "../services/authService";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function authHeader():any {  
    // if (currentUser && currentUser.accessToken) {
    //   // for Node.js Express back-end
    //   return { 'x-access-token': currentUser.accessToken };
    // } else {
    //   return {};
    // }

    const currentUser = AuthService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
        return { Authorization: `Bearer ${currentUser.accessToken}` };
    } else {
        return {};
    }
  }