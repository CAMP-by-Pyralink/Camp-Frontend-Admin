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

export interface registerUserData {
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
export interface GetCurrentAdminData {
  adminId: string;
  comapanyName: string;
  department: string;
  fName: string;
  lName: string;
  email: string;
  pNumber: string;
  profileImage: string;
  role: string;
  address: string;
  phoneNumber: string;
}

// --- Admin store interface

interface AdminStore {
  isRegisteringAdmin: boolean;
  departments: string[];
  admins: any[];
  currentUser: GetCurrentAdminData | null;
  fetchDepartments: () => Promise<void>;
  getAdmins: () => Promise<void>;
  getUsers: () => Promise<void>;
  getCurrentAdmin: () => Promise<any>;
  registerAdmin: (data: registerAdminData) => Promise<AxiosResponse | void>;
  registerUser: (data: registerUserData) => Promise<AxiosResponse | void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  isRegisteringAdmin: false,
  departments: [],
  admins: [],
  currentUser: null,

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
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.msg, {
        style: { maxWidth: "100%" },
      });
    } finally {
      set({ isRegisteringAdmin: false });
    }
  },

  getAdmins: async () => {
    try {
      const response: AxiosResponse = await api.get(
        "/admin/getAllAdmins?page=1"
      );
      set({ admins: response.data.admins });
      console.log("getAdmins", response.data.admins);
    } catch (error) {
      console.error("getAdmins", error);
    }
  },
  registerUser: async (data: registerUserData) => {
    set({ isRegisteringAdmin: true });
    try {
      const response: AxiosResponse = await api.post(
        "/auth/addUsersWithManual",
        data
      );
      console.log(response);
      toast.success("User registered successfully!");
      return response;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.msg, {
        style: { maxWidth: "100%" },
      });
    } finally {
      set({ isRegisteringAdmin: false });
    }
  },
  getUsers: async () => {
    try {
      const response: AxiosResponse = await api.get("/user/getAllUsers?page=1");
      set({ admins: response.data.users });
      console.log("getUsers", response.data.users);
    } catch (error) {
      console.error("getUsers", error);
    }
  },
  getCurrentAdmin: async () => {
    try {
      const response: AxiosResponse = await api.get("/admin/currentAdmin");
      set({ currentUser: response.data.admin });
      console.log("getAdmins", response.data.admin);
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
