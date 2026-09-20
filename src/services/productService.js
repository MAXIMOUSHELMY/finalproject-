import api from "./api";

const productService = {
  // =========================
  // Public Products
  // =========================

  getProducts: async (params = {}) => {
    const response = await api.get(
      "/api/products",
      {
        params,
      }
    );

    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(
      `/api/products/${id}`
    );

    return response.data;
  },


getAdminProducts: async (params = {}) => {
  const response = await api.get(
    "/api/admin/products",
    { params }
  );

  return response.data;
},

  createProduct: async (productData) => {
    const response = await api.post(
      "/api/admin/products",
      productData
    );

    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(
      `/api/admin/products/${id}`,
      productData
    );

    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(
      `/api/admin/products/${id}`
    );

    return response.data;
  },
};

export default productService;