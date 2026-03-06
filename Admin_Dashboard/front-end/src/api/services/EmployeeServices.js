import api from "../axios";

export const EmployeeServices = {

  // ==============================
  // Register Employee
  // ==============================
  EmployeeCreate: async (data) => {
    const response = await api.post("/register/", data);
    return response.data;
  },

  // ==============================
  // Login Employee
  // ==============================
  EmployeeLogin: async (data) => {
    const response = await api.post("/login/", data);
    return response.data;
  },

  // ==============================
  // Logout Employee
  // ==============================
  EmployeeLogout: async () => {
    const response = await api.post("/logout/");
    return response.data;
  },

  // ==============================
  // Forget Password
  // ==============================
  EmployeeForgetPassword: async (data) => {
    const response = await api.post("/forget-password/", data);
    return response.data;
  },

  // ==============================
  // Change Password
  // ==============================
  EmployeeChangePassword: async (data) => {
    const response = await api.post("/change-password/", data);
    return response.data;
  },

  // ==============================
  // Update Employee By ID
  // ==============================
  EmployeeUpdateById: async (id, data) => {
    const response = await api.patch("/employee_update/", {
      id,
      ...data,
    });
    return response.data;
  },

  // ==============================
  // Update Employee Profile
  // ==============================
  EmployeeProfileUpdate: async (id, data) => {
    const response = await api.patch("/employee_profile_update/", {
      id,
      ...data,
    });
    return response.data;
  },

  // ==============================
  // Search Employee
  // ==============================
  EmployeeGetBySearchbar: async (query) => {
    const response = await api.get("/employee-search/", {
      params: { q: query },
    });
    return response.data;
  },

  // ==============================
  // Get All Employees
  // ==============================
  EmployeeGet: async (data) => {
    const response = await api.post("/employee/", data);
    return response.data;
  },

  // ==============================
  // Get Employee By ID
  // ==============================
  EmployeesGetById: async (id) => {
    const response = await api.get(`/employee/${id}/`);
    return response.data;
  },

  // ==============================
  // Change Employee Status
  // ==============================
  EmployeeStatusChange: async (id) => {
    const response = await api.patch("/employee-status-change/", { id });
    return response.data;
  },

  // ==============================
  // Delete Employee
  // ==============================
  EmployeeDeleteById: async (id) => {
    const response = await api.delete("/employee-delete/", {
      data: { id },
    });
    return response.data;
  },
    EmployeeProfile: async () => {
    const response = await api.get("/profile/");
    return response.data;
  },

};