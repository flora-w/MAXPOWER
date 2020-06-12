import axios from 'axios';

import { baseApiUrl } from './apiUrls';

const pathToJustDemo = `${baseApiUrl}/manage/adlogin`;

class JustDemoService {
  fetchJustDemo() {
    const formData = new FormData();
    const newdata = JSON.stringify({
        'aid':'admin', 
        'pwd': 'Admin'
     });
     formData.append('data', newdata);
     return axios.post(pathToJustDemo, formData, {
      headers: { 'Content-Type': 'application/json'},
    });
  }
}

export default new JustDemoService();
