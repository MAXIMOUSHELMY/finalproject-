import api from "./api";

const orderService = {
  getOrders: async () => {
    const response = await api.get(
      "/orders"
    );

    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(
      `/orders/${id}`
    );

    return response.data;
  },

  cancelOrder: async (id) => {
    const response = await api.delete(
      `/orders/${id}`
    );

    return response.data;
  },

  updateOrderStatus: async (
    id,
    newStatus
  ) => {
    const response = await api.put(
      `/orders/${id}/status`,
      {
        new_status: newStatus,
      }
    );

    return response.data;
  },
};

export default orderService;