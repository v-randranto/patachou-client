import { connection } from '../constants/actionTypes'
const { LOGIN, LOGOUT } = connection

const authReducer = (state, action) => {
   const { user } = action
   switch (action.type) {
      case LOGIN:
         return { isAuthenticated: true, user }
      case LOGOUT:
         return { isAuthenticated: false, user: null }
      default:
         return state
   }
}

export default authReducer
