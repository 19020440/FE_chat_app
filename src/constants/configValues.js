const loginStatuses = {
  ANONYMOUS: 0,
  LOGINED: 1,
  WAITING: 2,
};

const serviceUrls = {
  SERVICE_URL: process.env.SERVICE_URL || 'http://localhost:8888',
  SERVICE_TEXT_FILE: 'http://localhost:8800/images',
};

const socketEvents = {
  USER_OFFLINE: 'USER_OFFLINE',
  INVITE_TO_GROUP: 'INVITE_TO_GROUP',
  JOIN_ROOM: 'JOIN_ROOM',
  OUT_ROOM: 'OUT_ROOM',
  SEND_MESSAGE: 'SEND_MESSAGE',
  GET_MESSAGE: 'GET_MESSAGE',
}

const localStorage = {
  TOKEN: 'token',
};

module.exports = {
  loginStatuses,
  localStorage,
  serviceUrls,
  socketEvents,
};
