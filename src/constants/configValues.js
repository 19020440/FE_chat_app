const loginStatuses = {
  ANONYMOUS: 0,
  LOGINED: 1,
  WAITING: 2,
};

const serviceUrls = {
  SERVICE_URL: process.env.SERVICE_URL || 'http://localhost:8888',
  SERVICE_TEXT_FILE: 'http://localhost:8800/images',
};

const localStorage = {
  TOKEN: 'token',
};

module.exports = {
  loginStatuses,
  localStorage,
  serviceUrls,
};
