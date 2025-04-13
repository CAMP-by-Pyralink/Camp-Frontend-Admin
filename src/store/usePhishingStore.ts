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

// const token = Cookies.get("token");
// console.log("Token:", token);

api.interceptors.request.use(
  (config) => {
    // const { authUser } = useAuthStore.getState();
    // if (authUser) {
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

export interface createTemplateData {
  title: string;
  content: string;
  bannerImage: string | Blob;
}

export interface PhishingTemplate {
  _id: string;
  title: string;
  content: string;
  bannerImage: string;
}

// --- Phishing store interface
interface PhishingStore {
  isCreatingTemplate: boolean;
  isUpdatingTemplate: boolean;
  isDeletingTemplate: boolean;
  isLoading: boolean;
  phishingTemplates: PhishingTemplate[];
  fetchPhishingTemplates: (page: number) => Promise<void>;
  createPhishingTemplate: (data: createTemplateData) => Promise<any>;
  updatePhishingTemplate: (
    id: string,
    data: createTemplateData
  ) => Promise<any>;
  deletePhishingTemplate: (templateId: string) => Promise<any>;
}

export const usePhishingStore = create<PhishingStore>((set) => ({
  isCreatingTemplate: false,
  isUpdatingTemplate: false,
  isDeletingTemplate: false,
  isLoading: false,
  phishingTemplates: [],

  fetchPhishingTemplates: async (page: number) => {
    try {
      const response: AxiosResponse = await api.get(
        `/template/getPhishingTemplates?page=${page}`
      );
      set({ phishingTemplates: response.data.templates });
      console.log("Phishing Templates:", response.data.templates);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch phishing templates."
      );
    }
  },

  createPhishingTemplate: async (data: createTemplateData) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.post(
        "template/createPhishingTemplate",
        data
      );

      if (response.status === 201) {
        console.log(response);
        // alert("response is true");
        toast.success(response.data.msg);
        return true;
      }
      return null;
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to create template."
      );
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  updatePhishingTemplate: async (id: string, data: createTemplateData) => {
    set({ isLoading: true });
    try {
      console.log("Request Data:", data);
      const response: AxiosResponse = await api.patch(
        `template/updatePhishingTemplate/${id}`,
        data
      );

      if (response.status === 200) {
        console.log("Response:", response);
        toast.success(response.data.msg);
        return true;
      }
      return null;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed to update template.");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  deletePhishingTemplate: async (templateId: string) => {
    set({ isDeletingTemplate: true });
    try {
      const response: AxiosResponse = await api.delete(
        `/template/deletePhishingTemplate/${templateId}`
      );
      toast.success("Template deleted successfully!");
      return response;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed to delete template.");
    } finally {
      set({ isDeletingTemplate: false });
    }
  },
}));
