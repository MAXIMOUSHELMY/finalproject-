import api from "./api";

const authService = {
  login: async (credentials) => {
    const response = await api.post(
      "/login",
      credentials
    );

    return response.data;
  },

  register: async (userData) => {
    const response = await api.post(
      "/signup",
      userData
    );

    return response.data;
  },

  verifyOTP: async (data) => {
    const response = await api.post(
      "/verify-signup",
      data
    );

    return response.data;
  },

  updateAddress: async (data) => {
    const response = await api.put(
      "/address",
      data
    );

    return response.data;
  },
};

export default authService;