const DEBUG = false;

const local = "http://127.0.0.1:8000";
const prod = "https://api.quizzers.club";

const GOOGLE_CLIENT_ID = "941224135259-bjcejif8p4dqud6onsk9a4m7dioh30dq.apps.googleusercontent.com"

const ITEMS_PER_PAGE = 10;
const API_URL = DEBUG ? local : prod;

export { API_URL, ITEMS_PER_PAGE, GOOGLE_CLIENT_ID };
