import api from "./api";

const checkoutService = {
  checkout: async (checkoutData) => {
    const response = await api.post(
      "/checkout",
      checkoutData
    );

    return response.data;
  },

  confirmPayment: async (paymentData) => {
    const response = await api.post(
      "/payment",
      paymentData
    );

    return response.data;
  },
};

export default checkoutService;