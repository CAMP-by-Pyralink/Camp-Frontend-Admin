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

const token = Cookies.get("token");
console.log("Token:", token);

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
  phishingTemplates: [],

  fetchPhishingTemplates: async (page: number) => {
    // const { authUser } = useAuthStore.getState();
    // if (!authUser) {
    //   console.error("No auth user found or token missing");
    //   toast.error("Authentication error. Please log in again.");
    //   return;
    // }

    try {
      const response: AxiosResponse = await api.get(
        `/template/getPhishingTemplates?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    const { authUser } = useAuthStore.getState();
    if (!authUser) {
      console.error("No auth user found or token missing");
      toast.error("Authentication error. Please log in again.");
      return;
    }

    set({ isCreatingTemplate: true });
    try {
      const response: AxiosResponse = await api.post(
        "template/createPhishingTemplate",
        data,
        {
          headers: {
            Authorization: `Bearer ${authUser}`,
          },
        }
      );
      console.log("Authorization Header:", `Bearer ${authUser.token}`);

      console.log(response);
      toast.success("Template created successfully!");
      return response;
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to create template."
      );
    } finally {
      set({ isCreatingTemplate: false });
    }
  },

  updatePhishingTemplate: async (id: string, data: createTemplateData) => {
    const { authUser } = useAuthStore.getState();
    if (!authUser) {
      console.error("No auth user found or token missing");
      toast.error("Authentication error. Please log in again.");
      return;
    }
    set({ isUpdatingTemplate: true });
    try {
      console.log("Request Data:", data);
      const response: AxiosResponse = await api.patch(
        `template/updatePhishingTemplate/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authUser}`,
          },
        }
      );
      console.log("Request Headers:", {
        Authorization: `Bearer ${authUser}`,
      });
      console.log("Response:", response);
      toast.success("Template updated successfully!");
      return response;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed to update template.");
    } finally {
      set({ isUpdatingTemplate: false });
    }
  },

  deletePhishingTemplate: async (templateId: string) => {
    const { authUser } = useAuthStore.getState();
    if (!authUser) {
      console.error("No auth user found or token missing");
      toast.error("Authentication error. Please log in again.");
      return;
    }
    set({ isDeletingTemplate: true });
    try {
      const response: AxiosResponse = await api.delete(
        `/template/deletePhishingTemplate/${templateId}`,
        {
          headers: {
            Authorization: `Bearer ${authUser}`,
          },
        }
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
