
const { default: axios } = require('axios');
const { serviceUrls } = require('../constants/configValues');
export const getConversations = async (userId) => {
  const apiUrl = `${serviceUrls.SERVICE_URL}/conversation?userId=${userId}`;
  const result = await axios.get(apiUrl).then((resp) => resp.data);
  return result;
};

export const createNewMessege = async (urlBody) => {
  const apiUrl = `${serviceUrls.SERVICE_URL}/message`;
  const result = await axios.post(apiUrl, urlBody).then((resp) => resp.data);
  return result;
}


