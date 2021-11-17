
import { useStore } from '../hook';
const { default: axios } = require('axios');
const { serviceUrls } = require('../constants/configValues');
// eslint-disable-next-line react-hooks/rules-of-hooks
const {ActionStore} = useStore('ActionStore')
const getConversations = async (userId) => {
  const apiUrl = `${serviceUrls.SERVICE_URL}/user/${userId}/conversations`;
  const result = await axios.get(apiUrl).then((resp) => resp.data);
  
  return result;
};

module.exports = {
  getConversations,
};
