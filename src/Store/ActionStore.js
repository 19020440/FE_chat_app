import { makeAutoObservable } from 'mobx';

export class ActionStore {
  offlineStatus = false;
  conversations = [];

  constructor() {
    makeAutoObservable(this, {});
  }

  async action_searchFriend(data) {
    // TODO: fill logic here
    console.log('action_searchFriend:', data);
  }
}
