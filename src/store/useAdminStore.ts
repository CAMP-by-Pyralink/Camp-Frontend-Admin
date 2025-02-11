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

// --- Data Payload Interfaces ---

export interface registerAdminData {
  fname: string;
  lname: string;
  email: string;
  // password: string;
  // confirmPassword: string;
  department: string;
  type: string;
  authProvider: string;
  // companyName: string;
}

export interface getAdminsData {
  fname: string;
}

// --- Admin store interface

interface AdminStore {
  isRegisteringAdmin: boolean;
  departments: string[];
  fetchDepartments: () => Promise<void>;
  registerAdmin: (data: registerAdminData) => Promise<any>;
}

const { authUser } = useAuthStore.getState();
if (!authUser) {
  console.error("No auth user found");
  // return;
}
console.log(authUser);

export const useAdminStore = create<AdminStore>((set) => ({
  isRegisteringAdmin: false,
  departments: [],

  registerAdmin: async (data: registerAdminData) => {
    set({ isRegisteringAdmin: true });
    try {
      const response: AxiosResponse = await api.post(
        "/company/registerAdmin",
        data,
        {
          headers: {
            Authorization: `Bearer ${authUser}`,
          },
        }
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
      const response: AxiosResponse = await api.get("/admin/getAdmins", {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  getCurrentAdmin: async () => {
    try {
      const response: AxiosResponse = await api.get("/admin/currentAdmin");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  fetchDepartments: async () => {
    console.log(authUser);
    try {
      const response: AxiosResponse = await api.get(
        "/admin/getCompanyDepartments",
        {
          headers: {
            Authorization: `Bearer ${authUser}`,
          },
        }
      );
      set({ departments: response.data.departments });
      console.log("Authorization Header:", `Bearer ${authUser?.token}`);
      set({ departments: response.data.companyDepartments });
      console.log("departments", response.data.companyDepartments);
    } catch (error) {
      console.log(error);
    }
  },
}));
