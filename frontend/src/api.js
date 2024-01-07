import axios from 'axios';
import { API_URL } from './config';

const userToken = localStorage.getItem('usertoken');
const user_id = parseInt(localStorage.getItem('user_id'))

console.log("user_id", user_id)

// Set up the headers with the authentication token
const headers = {
  Authorization: `Bearer ${userToken}`,
  'Content-Type': 'application/json', // Add any other headers if needed
};


export const loginApi = (payload) => {
  return axios.post(`${API_URL}/api/v1/token/login/`, payload);
};

export const fetchPoll = (url) => {
  return axios
    .get(`${API_URL}/api/v1/polls/${url}/`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export const pollResults = (url) => {
  return axios
    .get(`${API_URL}/api/v1/polls/results/${url}/`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.message)
      return err;
    });
}

export const pollVote = (url, choice_id) => {
  // Get the user token from localStorage
  const user_id = parseInt(localStorage.getItem('user_id'))
  console.log("user_id", user_id)

  return axios
    .post(
      `${API_URL}/api/v1/polls/vote/${url}/`,
      { choice_id, user_id }, // assuming choice_id needs to be sent in the request body

    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};


export const signupApi = (data) => {

  return axios
    .post(`${API_URL}/api/v1/profiles/viewer/`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export const googleLogin = (code) => {
  return axios
    .get(`${API_URL}/api/v1/auth/login/google/${code}`)
    .then((res) => {
      console.log("res", res)
      localStorage.setItem("usertoken", res.data.access)
      localStorage.setItem("user_id", res.data.user_id);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
