import { apiCall } from '../api/axios'
import { AUTH_API, METHOD } from '../constants/api'

const { RESSOURCE, LOGIN, LOST_PASSWORD, REGISTER, RESET_PASSWORD } = AUTH_API

class RecipeService {
   constructor() {
       this.path = ''
   }

   get currentUser() {
      return JSON.parse(localStorage.getItem('user'))
   }

   get isAuthenticated() {
      if (this.currentUser) {
         return true
      }
      return false
   }

   login(identification) {
      this.path = `${RESSOURCE}/${LOGIN}`
      return apiCall(this.path, METHOD.POST, { identification }).then((user) => {
         this.storeCurrentUser(user)
         return user
      })
   }

   logout() {
      localStorage.removeItem('user')
   }

   lostPassword(email) {
      this.path = `${RESSOURCE}/${LOST_PASSWORD}`
      return apiCall(this.path, METHOD.POST, { email }).then((data) => data)
   }

   register(account) {
      console.log("account", account)
      this.path = `${RESSOURCE}/${REGISTER}`
      return apiCall(this.path, METHOD.POST, { account}).then((data) => data)
   }

   resetPassword(password, resetToken) {
      this.path = `${RESSOURCE}/${RESET_PASSWORD}/${resetToken}`
      return apiCall(this.path, METHOD.PUT, { password }).then((data) => data)
   }

   storeCurrentUser(data) {
      localStorage.setItem('user', JSON.stringify(data))
   }
}

export default new RecipeService()
