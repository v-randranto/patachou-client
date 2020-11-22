/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

export const apiCall = async (service, method, data, callback) => {
  const config = {
    method: method,
    data: data,
    url: `http://localhost:3001/api/${service}`,
  };

  try {
    console.log('await axios with', config)
    const res = await axios(config); 
    if (callback) {
      callback(res.data)   
    }
    return res.data  
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};
