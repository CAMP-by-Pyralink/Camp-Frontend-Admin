import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  handleErrorToast,
  isSuccessfulResponse,
} from "../utils/responseHandler";
// import { api } from "./useAuthStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_APP_API_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export interface CreateRisk {
  riskName: string;
  riskDescription: string;
  category: string;
  riskImpact: string;
  riskProbability: string;
  mitigationStrategy: string;
  isAIGenerated: boolean;
  department: string;
  riskOwner: string;
  riskStatus: string;
  note: string;
}
export interface MitigationStrategy {
  riskName: string;
  category: string;
  riskDescription: string;
}

interface RiskStore {
  isLoading: boolean;
  risks: any[];
  aiStrategy: any[];
  singleRisk: any[] | null;
  currentPage: number;
  totalPages: number;
  totalRisks: number;
  getAllRisks: (page?: string, search?: string) => Promise<any>;
  getSingleRisk: (assetId: string) => Promise<any>;
  deleteRisk: (riskId: string) => Promise<any>;

  createRisk: (data: CreateRisk) => Promise<any>;
  getMitigationStrategy: (data: MitigationStrategy) => Promise<any>;
}

export const useRiskStore = create<RiskStore>((set, get) => ({
  isLoading: false,
  risks: [],
  aiStrategy: [],
  singleRisk: null,
  currentPage: 1,
  totalPages: 1,
  totalRisks: 0,

  createRisk: async (data: CreateRisk) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/risk/createRisk", data);
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
  getMitigationStrategy: async (data: MitigationStrategy) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/risk/getMitigationStrategy", data);
      if (isSuccessfulResponse(response)) {
        // toast.success(response.data?.message);
        set({ aiStrategy: response.data?.mitigitalStrategy });
        console.log(response.data);
        return response.data?.data;
      }
      return null;
    } catch (error) {
      handleErrorToast(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  getAllRisks: async (page, search) => {
    set({ isLoading: true });

    try {
      const response = await api.get(
        `/risk/getAllRiskAdmin?page=${page}${
          search ? `&search=${encodeURIComponent(search)}` : ""
        }`
      );

      if (isSuccessfulResponse(response)) {
        set({
          risks: response.data.risks,
          currentPage: response.data.page,
          totalPages: response.data.totalPages,
          totalRisks: response.data.totalRisks,
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
  getSingleRisk: async (assetId: string) => {
    set({ isLoading: true });

    try {
      const response = await api.get(`/risk/getSingleRiskAdmin/${assetId}`);

      if (isSuccessfulResponse(response)) {
        // toast.success(response.data?.message);
        set({ singleRisk: response.data.risk });
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
  deleteRisk: async (riskId: string) => {
    set({ isLoading: true });

    try {
      const response = await api.delete(`/risk/deleteRisk/${riskId}`);

      if (isSuccessfulResponse(response)) {
        toast.success(response.data?.message);
        get().getAllRisks();
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
