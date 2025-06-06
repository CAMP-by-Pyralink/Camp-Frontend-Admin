import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import Cookies from "js-cookie";
import { api } from "./useRiskStore";
import {
  handleErrorToast,
  isSuccessfulResponse,
} from "../utils/responseHandler";

export interface CreateCampaign {
  campaignName: string;
  campaignTo: "user" | "department"; // "user" or "department"
  campaignToId: number[]; // "If user, user ids if department department ids"
  dates: string[];
  startTime: string;
  endTime: string;
  timeZone: string;
}

interface CampaignStore {
  isLoading: boolean;
  campaigns: any[];
  currentPage: number;
  totalPages: number;
  singleCampaign: any | null;
  createCampaign: (data: CreateCampaign, id: any) => Promise<any>;
  sendTestMail: (id: any) => Promise<any>;
  getAllCampaigns: () => Promise<any>;
  getSingleCampaign: (id: string) => Promise<any>;
  getTimezone: (data: any) => Promise<any>;
}

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
  campaigns: [],
  singleCampaign: null,

  getTimezone: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/timezone/getTimezone`, data);
      if (isSuccessfulResponse(response)) {
        toast.success(response.data?.message);
        console.log(response.data.timezone);
        return true;
      }
      return null;
    } catch (error) {
      handleErrorToast(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  createCampaign: async (data, id) => {
    set({ isLoading: true });
    try {
      const response = await api.post(
        `/campaign/createPhishingCampaign/${id}`,
        data
      );
      if (isSuccessfulResponse(response)) {
        toast.success(response.data?.message);
        return true;
      }
      return null;
    } catch (error) {
      handleErrorToast(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  getAllCampaigns: async () => {
    set({ isLoading: true });

    try {
      const response = await api.get("/campaign/getAllCampaignAdmin");

      if (isSuccessfulResponse(response)) {
        set({
          campaigns: response.data.campaigns,
          currentPage: response.data.page,
          totalPages: response.data.totalPages,
          //   totalRisks: response.data.totalRisks,
        });
        // toast.success(response.data?.message);
        return true;
      }
      return null;
    } catch (error) {
      // handleErrorToast(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  getSingleCampaign: async (id: string) => {
    set({ isLoading: true });

    try {
      const response = await api.get(`/campaign/getSingleCampaignAdmin/${id}`);

      if (isSuccessfulResponse(response)) {
        // toast.success(response.data?.message);
        set({ singleCampaign: response.data.campaign });
        return true;
      }
      return null;
    } catch (error) {
      handleErrorToast(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  sendTestMail: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/campaign/sendTestPhishingEmail/${id}`);
      if (isSuccessfulResponse(response)) {
        toast.success(response.data?.message);
        return true;
      }
      return null;
    } catch (error) {
      handleErrorToast(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
