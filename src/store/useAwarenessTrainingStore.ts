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

export type QuestionType = "multiple-choice" | "checkbox" | "input";
export type LessonType = "video" | "document" | "link" | "text & image";

export interface Lesson {
  lessonTitle: ReactNode;
  lessonType: LessonType;
  content: string;
}

interface Module {
  moduleTitle: string;
  lessons: Lesson[];
  questions: Question[];
}

interface Question {
  question: string;
  questionType: QuestionType;
  options: string[];
  correctAnswer: string;
  answerMethod: "multiple-choice" | "checkbox" | "input";
}

export interface CreateTrainingData {
  progress: any;
  assignedTo: any;
  _id: string;
  bannerImage: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  modules: Module[];
}

interface AssignTrainingData {}

interface TrainingState {
  isCreatingTraining: boolean;
  isLoading: boolean;
  trainings: CreateTrainingData[];
  singleTraining: CreateTrainingData | null;
  modules: Module[];
  questions: Question[];
  moduless: any[];
  createTraining: (data: CreateTrainingData) => Promise<any>;
  fetchTrainings: (fetchType: string, page: number) => Promise<void>;
  fetchSingleTraining: (trainingId: string) => Promise<void>;
  setCreateTrainingData: (data: Partial<CreateTrainingData>) => void;
  addModule: (module: Module) => void;
  addQuestion: (question: Question) => void;
  resetTraining: () => void;
  deleteSingleTraining: (trainingId: string) => Promise<any>;
  updateTraining: (data: any, trainingId: string) => Promise<any>;
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  isCreatingTraining: false,
  isLoading: false,
  trainings: [],
  singleTraining: null,
  modules: [
    { moduleTitle: "", lessons: [{ lessonType: "video", content: "" }] },
  ],
  questions: [
    {
      question: "",
      questionType: "multiple-choice",
      options: ["", ""],
      correctAnswer: "",
      answerMethod: "multiple-choice",
    },
  ],

  createTraining: async (data: CreateTrainingData) => {
    set({ isCreatingTraining: true });
    try {
      const response: AxiosResponse = await api.post(
        "/training/createTraining",
        data
      );
      toast.success("Training created successfully!");
      return response;
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to create training."
      );
    } finally {
      set({ isCreatingTraining: false });
    }
  },

  fetchTrainings: async (fetchType: string, page: number) => {
    try {
      const response: AxiosResponse = await api.post(
        `/training/getAllTrainingsAdmin?page=${page}`,
        { fetchType }
      );
      console.log(response.data.trainings);
      set({ trainings: response.data.trainings || [] });
      // set({ moduless: response.data.modules || [] });
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch trainings."
      );
    }
  },

  fetchSingleTraining: async (trainingId: string) => {
    try {
      const response: AxiosResponse = await api.get(
        `/training/getSingleTrainingAdmin/${trainingId}`
      );
      set({ singleTraining: response.data });
      console.log(response.data, "hgfds");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch training.");
    }
  },
  deleteSingleTraining: async (trainingId: string) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(
        `/training/deleteTraining/${trainingId}`
      );
      toast.success(response.data.msg);
      return response;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed to delete training.");
    } finally {
      set({ isLoading: false });
    }
  },

  assignTraining: async (trainingId: string, data: any) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await api.patch(
        `/training/assignToTraining/${trainingId}`,
        data
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
      console.log(response.data);
      return response;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Failed to assign training.");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  setCreateTrainingData: (data) => set((state) => ({ ...state, ...data })),

  addModule: (module) =>
    set((state) => ({ modules: [...state.modules, module] })),

  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),

  updateTraining: async (trainingId: string, data: any) => {
    set({ isLoading: true });

    console.log(data, "sending");
    try {
      const response = await api.patch(
        `/training/updateTraining/${trainingId}`,
        data
      );

      if (response.status === 200) {
        const { singleTraining } = get();
        if (singleTraining && trainingId) {
          await get().fetchSingleTraining(trainingId);
        }
        console.log(response.data.msg);
        return true;
      }
      console.log(response.data.msg);
      return null;
    } catch (error: any) {
      console.log(error.response.data.msg);
      return null;
    }
  },
}));
