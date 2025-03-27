import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the bearer token
api.interceptors.request.use(
  (config) => {
    // const { authUser } = useAuthStore.getState();
    // console.log(authToken, "dfg");

    // if (authUser) {
    //   console.log(authUser, "dfg");
    //   config.headers.Authorization = `Bearer ${authUser}`;
    // }

    const token = Cookies.get("token");

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  profileImage: string | null;
  role: string;
  homeAddress: string;
  phoneNumber: string;
}

// --- Admin store interface

interface AdminStore {
  isRegisteringAdmin: boolean;
  isLoading: boolean;
  departments: string[];
  admins: any[];
  users: any[];
  companyData: any[];
  currentUser: GetCurrentAdminData | null;
  companyDetails: CompanyDetails | null;
  fetchDepartments: () => Promise<void>;
  getAdmins: () => Promise<void>;
  getUsers: () => Promise<void>;
  getCurrentAdmin: () => Promise<any>;
  registerAdmin: (data: registerAdminData) => Promise<AxiosResponse | void>;
  registerUser: (data: registerUserData) => Promise<AxiosResponse | void>;
  getCompanyDetails: () => Promise<any>;
  updateAdminDetails: (data: any) => Promise<any>;
  updateCompanyDetails: (data: any) => Promise<any>;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  isRegisteringAdmin: false,
  isLoading: false,
  departments: [],
  admins: [],
  users: [],
  currentUser: null,
  companyDetails: [],
  companyData: [],

  registerAdmin: async (data: registerAdminData) => {
    set({ isRegisteringAdmin: true });
    try {
      const response: AxiosResponse = await api.post(
        "/company/registerAdmin",
        data
      );
      console.log(response);
      toast.success("Admin registered successfully!");
      await get().getAdmins();
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
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.get(
        "/admin/getAllAdmins?page=1"
      );
      set({ admins: response.data.admins });
      console.log("getAdmins", response.data.allAdmins);
    } catch (error) {
      console.error("getAdmins", error);
    } finally {
      set({ isLoading: false });
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
      toast.success(response.data.msg);
      await get().getUsers();
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
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.get("/user/getAllUsers?page=1");
      set({ users: response.data.users });
      console.log("getUsers", response.data.users);
      // console.log("users", users);
      set({ users: response.data.users });
    } catch (error) {
      console.error("getUsers", error);
    } finally {
      set({ isLoading: false });
    }
  },
  getCurrentAdmin: async () => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.get("/admin/currentAdmin");
      set({ currentUser: response.data.admin });
      console.log("getAdmins", response.data.admin);
    } catch (error) {
      console.error("getAdmins", error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateAdminDetails: async (data: any) => {
    set({ isLoading: true });

    try {
      const payload = {
        fName: data.fName,
        lName: data.lName,
        homeAddress: data.homeAddress,
        phoneNumber: data.phoneNumber,
        profileImage: data.profileImage,
      };

      const response: AxiosResponse = await api.patch(
        "/admin/updateAdminDetails",
        payload
      );

      if (response.status === 200) {
        toast.success(response.data.msg);

        // Update user state efficiently
        set((state) => ({
          currentUser: {
            ...state.currentUser!,
            ...payload, // Reuse the same payload instead of repeating fields
          },
        }));

        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Update profile error:", error);
      toast.error(error.response?.data?.msg ?? "Failed to update profile");
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDepartments: async () => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.get(
        "/admin/getCompanyDepartments"
      );
      set({ departments: response.data.companyDepartments });
      console.log("departments", response.data.companyDepartments);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch departments.");
    } finally {
      set({ isLoading: false });
    }
  },
  getCompanyDetails: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/admin/getCompanyDetails");
      if (response.status === 200) {
        const companyDetails = response.data.data; // Extract the company details
        set({ companyData: companyDetails }); // Update the state with the fetched data
        console.log(
          "Company details fetched and state updated:",
          companyDetails
        );
        // toast.success(response.data.msg);
        // console.log("Dfad", companyData);
        return companyDetails; // Return the data for further use if needed
      }
    } catch (error: any) {
      console.error("Error fetching company details:", error);
      toast.error(
        error.response?.data?.msg || "Failed to fetch company details."
      );
    } finally {
      set({ isLoading: false });
    }
  },
  updateCompanyDetails: async (data: any) => {
    set({ isLoading: true });
    try {
      const payload = {
        companyName: data.companyName || "",
        companyUrl: data.companyUrl || "",
        companyDepartments: data.companyDepartments || [],
        profileImage: data.profileImage || "", // This should already be Bas
      };

      const response: AxiosResponse = await api.patch(
        "/admin/updateCompanyDetails",
        payload
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
        return response;
      }
    } catch (error: any) {
      console.error("Error updating company details:", error);
      toast.error(error.response?.data?.msg);
    } finally {
      set({ isLoading: false });
    }
  },
}));
