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

export type QuestionType = "multiple-choice" | "checkbox" | "input" | "others";
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
  answerMethod: string;
}

export interface CreateTrainingData {
  bannerImageFile: string;
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
  modules: Module[];
  questions: Question[];
  createTraining: (data: CreateTrainingData) => Promise<any>;
  setCreateTrainingData: (data: Partial<CreateTrainingData>) => void;
  addModule: (module: Module) => void;
  addQuestion: (question: Question) => void;
  resetTraining: () => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  isCreatingTraining: false,
  trainings: [],
  modules: [
    { moduleTitle: "", lessons: [{ lessonType: "video", content: "" }] },
  ],
  questions: [
    {
      question: "",
      questionType: "multiple-choice",
      options: ["", ""],
      correctAnswer: "",
      answerMethod: "",
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

  setCreateTrainingData: (data) => set((state) => ({ ...state, ...data })),

  addModule: (module) =>
    set((state) => ({ modules: [...state.modules, module] })),

  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),

  resetTraining: () =>
    set(() => ({
      bannerImageFile: "",
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
          answerMethod: "",
        },
      ],
    })),
}));
