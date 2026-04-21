import axiosInstance from "../axios-instance";

export const adminJobService = {
  getJobs: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const response = await axiosInstance.get("/admin/jobpost", { params });
    return response.data;
  },
};
