import { observable, makeAutoObservable, action } from 'mobx';
import { Request } from '../helper/Request';
import _ from 'lodash';
import { loginStatuses, serviceUrls } from '../constants/configValues';

export class AuthStore {
  login = loginStatuses.ANONYMOUS;
  user = {};

  constructor() {
    makeAutoObservable(this, {
      login: observable,
      user: observable,
      action_login: action,
      action_register: action,
    });
  }

  //REGISTER
  async action_register(data) {
    const DOMAIN = `${serviceUrls.SERVICE_URL}/register`;
    const result = await Request.post(data, DOMAIN);

    return result;
  }

  async action_setLogin(value) {
    this.login = value;
  }
  action_setSocket(data) {
    this.socket = data;
  }

  async action_login(data) {
    const DOMAIN = `${serviceUrls.SERVICE_URL}/session`;
    const result = await Request.post(data, DOMAIN);

    if (result) {
      this.user = result.content;
      this.login = loginStatuses.LOGINED;
      sessionStorage.setItem('token', result.token);
      return true;
    }
    return false;
  }

  // TODO: note, there is currently no api for this
  // understand logic of this function later on
  async action_validLogin() {
    const DOMAIN = `${serviceUrls.SERVICE_URL}/session`;
    const result = await Request.get({}, DOMAIN);
    if (result) {
      if (!_.isEmpty(result.content)) {
        this.user = result.content;

        this.socket?.emit('validLogin');
        this.socket?.on('setvalidLogin', (socketId) => {
          this.user.socketId = socketId;
          this.login = loginStatuses.LOGINED;
        });
      }
    }
  }

  async action_logout() {
    const DOMAIN = `${serviceUrls.SERVICE_URL}/session`;
    const result = await Request.delete({ email: this.user?.email }, DOMAIN);

    if (result) {
      this.login = 0;
      sessionStorage.removeItem('token');
      this.action_resetAllData();
      return true;
    }
    return false;
  }
}
