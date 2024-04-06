import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.70.98:8086/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': "Bearer ".concat(localStorage.getItem('token')),
  },
});

export default {
  get(url) {
    return apiClient.get(url);
  },
  post(url,data) {
    return apiClient.post(url, data)
    /* .catch(error => {
      if(error.response.data.message == 'Token has expired'){
       this.$router.push({ name: '/' });
       Toast.fire({
         icon: 'error',
         title: 'Token has expired'
       })
      }
   }); */
  },
  update(id, data) {
    return apiClient.put(`/items/${id}`, data);
  },
  delete(url) {
    return apiClient.delete(url);
  },
};
