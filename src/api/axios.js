/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

export const apiCall = async (ressource, method, data) => {
  const config = {
    method: method,
    data: data,
    url: `http://localhost:3001/api/${ressource}`,
  };

  try {
    console.log('await axios with', config)
    const res = await axios(config); 
    return res.data  
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};
