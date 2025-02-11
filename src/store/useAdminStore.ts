import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the bearer token
api.interceptors.request.use(
  (config) => {
    const { authUser } = useAuthStore.getState();
    if (authUser) {
      config.headers.Authorization = `Bearer ${authUser}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Data Payload Interfaces ---

export interface registerAdminData {
  fName: string;
  lName: string;
  email: string;
  // password: string;
  // confirmPassword: string;
  department: string;
  type: string;
  authProvider: string;
}

export interface getAdminsData {
  fname: string;
}

// --- Admin store interface

interface AdminStore {
  isRegisteringAdmin: boolean;
  departments: string[];
  admins: any[];
  fetchDepartments: () => Promise<void>;
  getAdmins: () => Promise<void>;
  registerAdmin: (data: registerAdminData) => Promise<AxiosResponse | void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  isRegisteringAdmin: false,
  departments: [],
  admins: [],

  registerAdmin: async (data: registerAdminData) => {
    set({ isRegisteringAdmin: true });
    try {
      const response: AxiosResponse = await api.post(
        "/company/registerAdmin",
        data
      );
      console.log(response);
      toast.success("Admin registered successfully!");
      return response;
    } catch (error) {
      console.error(error);
      toast.error("Failed to register admin.");
    } finally {
      set({ isRegisteringAdmin: false });
    }
  },

  getAdmins: async () => {
    try {
      const response: AxiosResponse = await api.get("/admin/getAdmins");
      set({ admins: response.data.admins });
      console.log("getAdmins", response.data.admins);
    } catch (error) {
      console.error("getAdmins", error);
    }
  },

  fetchDepartments: async () => {
    try {
      const response: AxiosResponse = await api.get(
        "/admin/getCompanyDepartments"
      );
      set({ departments: response.data.companyDepartments });
      console.log("departments", response.data.companyDepartments);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch departments.");
    }
  },
}));
