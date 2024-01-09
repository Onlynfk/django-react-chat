const DEBUG = true;

const local = "http://127.0.0.1:8000";
const prod = "https://api.quizzers.club";

const API_URL = DEBUG ? local : prod;

export { API_URL };
