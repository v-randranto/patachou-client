/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

export const apiCall = async (service, method, data) => {
  const config = {
    method: method,
    data: data,
    url: `http://localhost:3001/api/${service}`,
  };

  try {
    console.log('await axios with', config)
    await axios(config);    
  } catch (error) {
    console.log(error.config);
    throw error;
  }
};
