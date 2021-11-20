export const CONFIG_URL = {
  SERVICE_URL: process.env.SERVICE_URL || "https://chat-app-group14.herokuapp.com/api",
  SERVICE_TEXT_FILE: "https://chat-app-group14.herokuapp.com/images"
};

export const LOCAL_STORGE = {
  TOKEN: "token"
}

export const LOGIN_STATUS =  {
  IsLogin: true,
  NotLogin: false, 
}

export const ROUTE = {
 messenger: "/messenger",
 profile: "/profile/:_id",
 home: "/",
 callvideo: '/callvideo'
};