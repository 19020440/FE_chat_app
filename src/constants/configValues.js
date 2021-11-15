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
  USER_OFFLINE: 'userOffline',
  INVITE_TO_GROUP: 'invite_to_group',
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
