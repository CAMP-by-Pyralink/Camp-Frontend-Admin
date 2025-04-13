import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  handleErrorToast,
  isSuccessfulResponse,
} from "../utils/responseHandler";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
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

export interface CreateAssets {
  assetImage: string;
  barCode: string;
  assetName: string;
  category: string;
  purchaseDate: string;
  location: string;
  currentLocation: string;
  department: string;
  assignedTo: string;
  status: string;
  antivirusStatus: string;
  warranty: string;
  warrantyExpiration: string;
  subscriptionRenewal: string;
  partsChanged: string;
  techSpecifications: string;
}

interface AssetsStore {
  isLoading: boolean;
  createAsset: (data: CreateAssets) => Promise<any>;
}

export const useAssetsStore = create<AssetsStore>((set) => ({
  isLoading: false,

  createAsset: async (data) => {
    set({ isLoading: true });

    try {
      const response = await api.post("/asset/createAsset", data);

      if (isSuccessfulResponse(response)) {
        toast.success(response.data?.msg || "Asset created successfully!");
        return true;
      }
      return null;
    } catch (error) {
      handleErrorToast(error, "Failed to create asset.");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
