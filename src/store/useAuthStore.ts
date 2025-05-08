import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_APP_API_KEY,
  },
});

// --- Data Payload Interfaces ---

export interface RegisterCompanyData {
  companyName: string;
  email: string;
  companyUrl: string;
  companySize: string;
  password: string;
  confirmPassword: string;
  authProvider?: "manual";
  type?: "company" | "admin";
  fName?: string;
  lName?: string;
}

export interface VerifyEmailData {
  verificationToken: string;
  email: string;
}

export interface ResendTokenData {
  email: string;
}

export interface OnboardingData {
  email: string;
  companyDepartments: string[];
  onboardingType: "manual" | "scan";
  frameworkType: "3 x 3 Matrix" | "4 x 4 Matrix";
  frameworkFile: string | Blob;
}

export interface LoginData {
  email: string;
  password: string;
  authProvider: "manual" | "google";
}

// --- User Interface ---

export interface AuthUser {
  token: string;
}

export interface ForgotPassword {
  email: string;
}
export interface VerifyEmailResetPassword {
  token: string;
  email: string;
}

export interface ResendTokenAdmin {
  email: string;
}
export interface ChangePassword {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

// --- Auth Store Interface ---

interface AuthStore {
  authUser: AuthUser | null;
  // Loading/Processing States
  isLoading: boolean;
  isAuthLoaded: boolean;
  isSigningUp: boolean;
  isVerifyingEmail: boolean;
  isResendingToken: boolean;
  isOnboarding: boolean;
  isLoggingIn: boolean;
  isAuthenticated: boolean;

  set: (state: Partial<AuthStore>) => void;

  // State Setters
  setAuthUser: (user: AuthUser | null) => void;
  setIsLoading: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;

  //  (Endpoints)
  registerCompany: (data: RegisterCompanyData) => Promise<any>;
  verifyEmail: (
    data: VerifyEmailData
  ) => Promise<AxiosResponse<any, any> | null>;
  resendToken: (
    data: ResendTokenData
  ) => Promise<AxiosResponse<any, any> | null>;
  onboardCompany: (data: OnboardingData) => Promise<any>;
  login: (data: LoginData) => Promise<any>;
  logout: () => Promise<void>;
  forgotPassword: (data: ForgotPassword) => Promise<any>;
  verifyEmailResetPassword: (data: VerifyEmailResetPassword) => Promise<any>;
  resendTokenForgotPassword: (data: ResendTokenAdmin) => Promise<any>;
  changepassword: (data: ChangePassword) => Promise<any>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial State
  authUser: null,
  isLoading: false,
  isSigningUp: false,
  isVerifyingEmail: false,
  isResendingToken: false,
  isLoggingIn: false,
  isAuthenticated: false,
  isOnboarding: false,
  isAuthLoaded: false,
  set: (state) => set(state),

  // Setters
  setAuthUser: (user: AuthUser | null) => set({ authUser: user }),
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  // Async Actions
  registerCompany: async (data: RegisterCompanyData) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/company/register", data);
      if (response.status === 201) {
        toast.success("Registration successful! verify your email.");
        console.log(data.email);
        sessionStorage.setItem("email", data.email);
      }
      console.log(response.data);
      return response;
    } catch (error: any) {
      console.log(error.response?.data);
      const message = error?.response.data.message || "Registration failed";
      toast.error(message, {
        style: { maxWidth: "100%" },
      });
      return null;
    } finally {
      set({ isSigningUp: false });
    }
  },
  verifyEmail: async (data: VerifyEmailData) => {
    set({ isVerifyingEmail: true });
    try {
      const response = await api.post("/company/verifyEmail", data);
      if (response.status === 201) {
        toast.success("Email verified successfully!");
      }
      console.log(response.data);
      return response;
    } catch (error: any) {
      const message = "Email verification failed";
      toast.error(message);
      return null;
    } finally {
      set({ isVerifyingEmail: false });
    }
  },

  resendToken: async (data: ResendTokenData) => {
    set({ isResendingToken: true });
    try {
      const response = await api.post("/company/resendToken", data);
      if (response.status === 201) {
        toast.success("Verification token resent!");
      }
      console.log(response.data);
      return response;
    } catch (error: any) {
      const message = "Resending token failed";
      toast.error(message);
      console.log(error.response?.data);
      return null;
    } finally {
      set({ isResendingToken: false });
    }
  },

  // onboardCompany: async (data: OnboardingData) => {
  //   set({ isOnboarding: true });
  //   try {
  //     // Prepare FormData since a file is included
  //     const formData = new FormData();
  //     formData.append("email", data.email);
  //     // data.companyDepartments.forEach((dept) =>
  //     //   formData.append("companyDepartments[]", dept)
  //     // );
  //     formData.append(
  //       "companyDepartments",
  //       JSON.stringify(data.companyDepartments)
  //     );
  //     formData.append("onboardingType", data.onboardingType);
  //     formData.append("frameworkType", data.frameworkType);
  //     formData.append("frameworkFile", data.frameworkFile);

  //     console.log("final data", formData);
  //     const response = await axios.post("/company/finishOnboarding", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     if (response.status === 201) {
  //       toast.success("Onboarding successful!");
  //     }
  //     return response;
  //   } catch (error: any) {
  //     const message =
  //       error.response?.data?.message || "Onboarding failed. Please try again.";
  //     toast.error(message);
  //     return null;
  //   } finally {
  //     set({ isOnboarding: false });
  //   }
  // },
  onboardCompany: async (data: OnboardingData) => {
    // const baseURL = import.meta.env.VITE_APP_BASE_URL;

    set({ isOnboarding: true });
    try {
      const payload = {
        email: data.email,
        companyDepartments: data.companyDepartments,
        onboardingType: data.onboardingType,
        frameworkType: data.frameworkType,
        frameworkFile: data.frameworkFile,
      };

      console.log("Final Data:", payload);

      const response = await api.patch(
        // `${baseURL}/company/finishOnboarding`,
        "/company/finishOnboarding",
        payload
      );
      if (response.status === 201) {
        toast.success("Onboarding successful!");
      }
      return response;
    } catch (error: any) {
      // toast.error("Onboarding failed. Please try again.");
      toast.error(error.response?.data?.message);
      return null;
    } finally {
      set({ isOnboarding: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const response = await api.post("/company/login", data);

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("token", token, { expires: 1, secure: true });
        set({ authUser: { token }, isAuthenticated: true });

        toast.success(response.data.message);
        return true;
      }

      return false;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  forgotPassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/admin/forgotPassword", data);
      if (response.status === 200) {
        toast.success(response.data.message);
        sessionStorage.setItem("email", response.data.email);
        return true;
      }
      console.log(response.data);
      return false;
    } catch (error: any) {
      // const message = error?.response?.data?.message || "Login failed";
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  verifyEmailResetPassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/admin/verifyEmailResetPassword", data);
      if (response.status === 200) {
        toast.success(response.data.message);
        return true;
      }
      console.log(response.data);
      return false;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  resendTokenForgotPassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/admin/resendToken", data);
      if (response.status === 200) {
        toast.success(response.data.message);
        return true;
      }
      console.log(response.data);
      return false;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  changepassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.patch("/admin/changePassword", data);
      if (response.status === 200) {
        toast.success(response.data.message);
        return true;
      }
      console.log(response.data);
      return false;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ authUser: null, isAuthenticated: false });
    Cookies.remove("token");
    toast.success("Logged out successfully!");
  },

  checkAuth: () => {
    const token = Cookies.get("token");
    if (token) {
      set({ authUser: { token }, isAuthenticated: true, isAuthLoaded: true });
    } else {
      set({ authUser: null, isAuthenticated: false, isAuthLoaded: true });
    }
  },
}));
