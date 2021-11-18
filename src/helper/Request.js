import axios from 'axios';
import { localStorage } from '../constants/configValues';
import { showMessageError } from './functions';

export const Request = {
  async header() {
    const token = sessionStorage.getItem(localStorage.TOKEN);
    let data = {};
    if (token) {
      data = { token: token };
    }
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        token: data.token,
      },
    });
  },

  async post(data, url) {
    try {
      const api = await this.header();
      const result = await api.post(url, data).then(resp => resp.data);

      if (result.success) {
        return result;
      } else {
        showMessageError(result.message || result.code);
        return false;
      }
    } catch (err) {
      showMessageError(err.message);
      return false;
    }
  },

  async get(url) {
    try {
      const api = await this.header();
      const result = await api.get(url).then(resp => resp.data);

      if (result.success) {
        return result.data;
      } else {
        showMessageError(result.message);
      }
    } catch (err) {
      showMessageError(err.message);
    }
  },
};
