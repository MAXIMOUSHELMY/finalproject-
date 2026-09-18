import api from "./api";

const cartService = {
  syncCart: async (items) => {
    const response = await api.post(
      "/cart",
      items
    );

    return response.data;
  },

  getCart: async () => {
    const response = await api.get(
      "/cart"
    );

    return response.data;
  },

  updateCart: async (items) => {
    const response = await api.put(
      "/cart",
      items
    );

    return response.data;
  },

  removeFromCart: async (productId) => {
    const response = await api.delete(
      `/cart/${productId}`
    );

    return response.data;
  },
};

export default cartService;