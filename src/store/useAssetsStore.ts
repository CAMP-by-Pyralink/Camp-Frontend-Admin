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
export interface Asset {
  _id: string;
  assetImage: string;
  category: string;
  purchaseDate: string;
  location: string;
  department: string;
  status: string;
  antivirusStatus: string;
  warrantyExpiration: string;
  subscriptionRenewal: string;
}

interface AssetsStore {
  isLoading: boolean;
  assets: any[];
  singleAsset: any[] | null;
  createAsset: (data: CreateAssets) => Promise<any>;
  // getAllAsset: (data: any) => Promise<any>;
  currentPage: number;
  totalPages: number;
  totalAssets: number;
  getAllAsset: (data: {
    page?: number;
    limit?: number;
  }) => Promise<boolean | null>;
  getSingleAsset: (assetId: string) => Promise<boolean | null>;
  deleteAsset: (assetId: string) => Promise<any>;
  updateAsset: (assetId: string, data: Partial<CreateAssets>) => Promise<any>;
}
// /asset/getAllAssetsAdmin?page=1&search=smilga&status=Active&location=HQ&department=Marketing
export const useAssetsStore = create<AssetsStore>((set, get) => ({
  isLoading: false,
  assets: [],
  singleAsset: null,
  currentPage: 1,
  totalPages: 1,
  totalAssets: 0,

  createAsset: async (data) => {
    set({ isLoading: true });

    try {
      const response = await api.post("/asset/createAsset", data);

      if (isSuccessfulResponse(response)) {
        toast.success(response.data?.msg);
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
  getAllAsset: async (data) => {
    set({ isLoading: true });

    try {
      const response = await api.get("/asset/getAllAssetsAdmin");

      if (isSuccessfulResponse(response)) {
        set({
          assets: response.data.assets,
          currentPage: response.data.page,
          totalPages: response.data.totalPages,
          totalAssets: response.data.totalAssets,
        });
        // toast.success(response.data?.msg);
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
  getSingleAsset: async (assetId: string) => {
    set({ isLoading: true });

    try {
      const response = await api.get(`/asset/getSingleAssetAdmin/${assetId}`);

      if (isSuccessfulResponse(response)) {
        toast.success(response.data?.msg);
        set({ singleAsset: response.data.asset });
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
  deleteAsset: async (assetId: string) => {
    set({ isLoading: true });

    try {
      const response = await api.delete(`/asset/deleteAsset/${assetId}`);

      if (isSuccessfulResponse(response)) {
        toast.success(response.data?.msg);
        get().getAllAsset({ page: 1, limit: 10 });
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
  updateAsset: async (assetId: string, data: Partial<CreateAssets>) => {
    set({ isLoading: true });

    try {
      const response = await api.patch(`/asset/updateAsset/${assetId}`, data);

      if (isSuccessfulResponse(response)) {
        toast.success(response.data?.msg || "Asset updated successfully");
        // Optionally refresh assets or singleAsset if needed
        // await get().getSingleAsset(assetId);
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
