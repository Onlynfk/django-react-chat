import axios from 'axios';
import { API_URL } from './config';

const userToken = localStorage.getItem('token');
console.log("token", userToken)

// Set up the headers with the authentication token
const headers = {
  Authorization: `Bearer ${userToken}`,
  'Content-Type': 'application/json', // Add any other headers if needed
};


export const loginApi = (payload) => {
  return axios.post(`${API_URL}/api/auth/login/`, payload);
};


export const signupApi = (data) => {

  return axios
    .post(`${API_URL}/api/auth/register/`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export const chatsListAPI = () => {
  return axios
    .get(`${API_URL}/api/chats/`, { headers: headers })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};


export const usersListAPI = () => {
  return axios
    .get(`${API_URL}/api/users/`, { headers: headers })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const createRoomAPI = (reciever_id) => {
  return axios
    .get(`${API_URL}/api/chats/create_room/${reciever_id}/`, { headers: headers })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchRoomAPI = (room_id, receiver_id) => {
  return axios
    .get(`${API_URL}/api/chats/room/${room_id}/${receiver_id}/`, { headers: headers })
    .then((res) => {
      console.log("hello", res)
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const updateHasSeenAPI = (room_id, receiver_id) => {
  return axios
    .post(`${API_URL}/api/chats/update_has_seen/${room_id}/${receiver_id}/`, {}, { headers: headers })
    .then((res) => {
      console.log("hello", res)
      return res;
    })
    .catch((err) => {
      return err;
    });
};

