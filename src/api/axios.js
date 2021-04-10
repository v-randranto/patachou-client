import axios from 'axios'
import HttpError from '../errors/httpError'

export const apiCall = async (ressource, method, data) => {
   const config = {
      method: method,
      data: data,
      url: `http://localhost:3001/api/${ressource}`,
   }

   try {
      console.log('await axios with', config)
      const res = await axios(config)
      return res.data
   } catch (error) {
      console.log(error.response)
      if (error.response) {
         const { data, status } = error.response
         console.log(data, status)
         throw new HttpError(data.error, status)
      } else {
         throw error
      }
   }
}
