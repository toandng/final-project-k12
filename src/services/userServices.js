import axios from "axios";

const userServices = {
  getUserByUsername: {
    get: (url) => axios.get(url, { baseURL: '/auth/register' }), // Đảm bảo baseURL đúng
  },
};

export default userServices;
