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

export interface createTemplateData {
  title: string;
  content: string;
  bannerImage: string | Blob;
}

export interface PhishingTemplate {
  id: number;
  title: string;
  content: string;
  bannerImage: string;
}

// --- Phishing store interface
interface PhishingStore {
  isCreatingTemplate: boolean;
  phishingTemplates: PhishingTemplate[];
  fetchPhishingTemplates: (page: number) => Promise<void>;
  createPhishingTemplate: (data: createTemplateData) => Promise<any>;
}

export const usePhishingStore = create<PhishingStore>((set) => ({
  isCreatingTemplate: false,
  phishingTemplates: [],

  fetchPhishingTemplates: async (page: number) => {
    const { authUser } = useAuthStore.getState();
    if (!authUser) {
      console.error("No auth user found or token missing");
      toast.error("Authentication error. Please log in again.");
      return;
    }

    try {
      const response: AxiosResponse = await api.get(
        `/template/getPhishingTemplates?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${authUser}`,
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
}));
