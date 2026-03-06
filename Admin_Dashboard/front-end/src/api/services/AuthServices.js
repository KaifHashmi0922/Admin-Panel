// services/AuthServices.js
import api from "../axios";

const handleError = (error, defaultMessage) => {
  if (error.response && error.response.data) {
    throw error.response.data;
  }
  throw { message: defaultMessage };
};

export const AuthServices = {
  // Register
  EmployeeCreate: async (payload) => {
    try {
      const { data } = await api.post("/employee_register/", payload);
      return data;
    } catch (error) {
      handleError(error, "Registration failed");
    }
  },

  // Login
  EmployeeLogin: async (payload) => {
    try {
      const { data } = await api.post("/employee_login/", payload);
      return data;
    } catch (error) {
      handleError(error, "Login failed");
    }
  },

  // Send OTP
  EmployeeResetPassword: async (payload) => {
    try {
      const { data } = await api.post("/employee/send_otp/", payload);
      return data;
    } catch (error) {
      handleError(error, "OTP sending failed");
    }
  },

  // Verify OTP
  EmployeeVerifyOTP: async (payload) => {
    try {
      const { data } = await api.post("/employee/verify_otp/", payload);
      return data;
    } catch (error) {
      handleError(error, "OTP verification failed");
    }
  },

  // Change Password
  EmployeeChangePassword: async (payload) => {
    try {
      const { data } = await api.post("/employee/change-password/", payload);
      return data;
    } catch (error) {
      handleError(error, "Password change failed");
    }
  },

  // Logout
  EmployeeLogout: async () => {
    try {
      const { data } = await api.post("/employee_logout/");
      return data;
    } catch (error) {
      handleError(error, "Logout failed");
    }
  },
};