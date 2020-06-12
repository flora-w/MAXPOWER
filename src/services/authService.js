import axios from 'axios';

import { baseApiUrl } from './apiUrls';

import env from 'environments/environment';

import { SESSION_CREDENTIALS_NAME } from 'constants/webStorages';

const { production } = env;

const pathToLogin = `${
  production ? baseApiUrl : 'http://localhost:3000'
}/oauth/adlogin`;

const pathToRefresh = `${
  production ? baseApiUrl : 'http://localhost:3000'
}/oauth/refresh`;

const pathToAuth = `${baseApiUrl}/oauth/adlogin`;

class AuthService {
  login(payload) {
    return axios.post(pathToLogin, payload);
  }

  refreshToken({ token, username }) {
    return fetch(pathToRefresh, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, username }),
    });
  }

  retrieveSessionCredentials() {
    // console.log(JSON.parse(sessionStorage.getItem(SESSION_CREDENTIALS_NAME)));
    return JSON.parse(sessionStorage.getItem(SESSION_CREDENTIALS_NAME));
  }

  updateSessionCredentials(profile) {
    sessionStorage.setItem(SESSION_CREDENTIALS_NAME, JSON.stringify(profile));
  }

  setAuthData({account,password}) {
    console.log(account);
    console.log(password);
    const formData = new FormData();
    formData.append('user', account);
    formData.append('pwd', password);
    return axios.post(pathToAuth, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default new AuthService();
