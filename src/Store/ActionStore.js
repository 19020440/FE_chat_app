import { action, makeAutoObservable, observable } from 'mobx';

export class ActionStore {
  offlineStatus = false;
  conversations = [];

  constructor() {
    makeAutoObservable(this, {
      conversations: observable,
      action_setListConversation: action,
    });
  }

  //Set List COnversation
  action_setListConversation(data) {
    console.log("conversaiton :", data);
    const lastText = {
      "sender": "6195a0fe18583d3cc50adf53",
      "text": "\"asd\"",
      "seens": [{
          
          "id": "6195a0fe18583d3cc50adf53",
          "profilePicture": "https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-gai-xinh-de-thuong-nhat-1.jpg",
          "seen": false
      }, {
          
          "id": "6195a35e18583d3cc50adf58",
          "profilePicture": "https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg",
          "seen": true
      }]
  }
   
    this.conversations = [{...data[0],lastText}];
  }
  async action_searchFriend(data) {
    // TODO: fill logic here
    console.log('action_searchFriend:', data);
  }
}
