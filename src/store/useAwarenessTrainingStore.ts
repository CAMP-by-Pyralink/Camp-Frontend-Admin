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

api.interceptors.request.use(
  (config) => {
    const { authUser } = useAuthStore.getState();
    if (authUser) {
      config.headers.Authorization = `Bearer ${authUser}`;
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
  lessonType: LessonType;
  content: string;
}

interface Module {
  moduleTitle: string;
  lessons: Lesson[];
}

interface Question {
  question: string;
  questionType: QuestionType;
  options: string[];
  correctAnswer: string;
  answerMethod: "multiple-choice" | "checkbox" | "input";
}

export interface CreateTrainingData {
  bannerImage: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  modules: Module[];
  questions: Question[];
}

interface TrainingState {
  isCreatingTraining: boolean;
  trainings: CreateTrainingData[];
  singleTraining: CreateTrainingData | null;
  modules: Module[];
  questions: Question[];
  createTraining: (data: CreateTrainingData) => Promise<any>;
  fetchTrainings: (fetchType: string, page: number) => Promise<void>;
  fetchSingleTraining: (trainingId: string) => Promise<void>;
  setCreateTrainingData: (data: Partial<CreateTrainingData>) => void;
  addModule: (module: Module) => void;
  addQuestion: (question: Question) => void;
  resetTraining: () => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  isCreatingTraining: false,
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
      set({ singleTraining: response.data.training });
      console.log(response.data.training);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch training.");
    }
  },

  updateTraining: async (
    trainingId: string,
    data: Partial<CreateTrainingData>
  ) => {
    set({ isUpdatingTraining: true });
    try {
      const response: AxiosResponse = await api.patch(
        `/training/updateTraining/${trainingId}`,
        data
      );
      toast.success("Training updated successfully!");

      // Refresh the single training if it's the one we're updating
      const { singleTraining } = get();
      if (singleTraining && trainingId) {
        await get().fetchSingleTraining(trainingId);
      }

      return response;
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update training."
      );
      throw error;
    } finally {
      set({ isUpdatingTraining: false });
    }
  },

  setCreateTrainingData: (data) => set((state) => ({ ...state, ...data })),

  addModule: (module) =>
    set((state) => ({ modules: [...state.modules, module] })),

  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),

  resetTraining: () =>
    set(() => ({
      bannerImage: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
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
    })),
}));
