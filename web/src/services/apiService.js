import axios from "axios";

const API_BASE_URL = "https://backend-729408356870.asia-east1.run.app/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 請求攔截器
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 響應攔截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // 取得所有專案
  getProjects: async () => {
    try {
      return await api.get("/api/projects");
    } catch (error) {
      throw new Error("Failed to fetch projects");
    }
  },

  // 取得特定專案
  getProject: async (id) => {
    try {
      return await api.get(`/api/projects/${id}`);
    } catch (error) {
      throw new Error("Failed to fetch project");
    }
  },

  // 根據類別取得專案
  getProjectsByCategory: async (category) => {
    try {
      return await api.get(`/api/projects/category/${category}`);
    } catch (error) {
      throw new Error("Failed to fetch projects by category");
    }
  },

  // 取得個人資訊
  getAbout: async () => {
    try {
      return await api.get("/api/about");
    } catch (error) {
      throw new Error("Failed to fetch about info");
    }
  },

  // 健康檢查
  healthCheck: async () => {
    try {
      return await api.get("/api/health");
    } catch (error) {
      throw new Error("API health check failed");
    }
  },
};

export default apiService;
