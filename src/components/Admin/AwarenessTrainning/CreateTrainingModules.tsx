import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  PlusCircle,
  Trash,
  UploadCloud,
} from "lucide-react";
import uploadVideoIcon from "../../../assets/svgs/upload-video-icon.svg";
import uploadDocumentIcon from "../../../assets/svgs/upload-document-icon.svg";
import uploadLinkicon from "../../../assets/svgs/link-icon.svg";
import uploadTexticon from "../../../assets/svgs/upload-text-img-icon.svg";
import delIcon from "../../../assets/svgs/delete-icon.svg";
import {
  LessonType,
  QuestionType,
  useTrainingStore,
} from "../../../store/useAwarenessTrainingStore";
import CreateTrainingStep3 from "./CreateTrainingStep3";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import QuillToolbar, { formats, modules } from "../../../utils/QuillToolBar";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import he from "he";

interface CreateTrainingModulesProps {
  initialData?: FormState;
  onSave?: (data: any) => Promise<void>;
  isEditMode?: boolean;
}

interface QuestionData {
  question: string;
  questionType: QuestionType;
  options: string[];
  correctAnswer: string;
  answerMethod: "multiple-choice" | "checkbox" | "input";
}

interface LessonData {
  lessonType: LessonType;
  lessonTitle: string;
  content: string;
  questions: QuestionData[];
}

interface ModuleData {
  moduleTitle: string;
  lessons: LessonData[];
}

interface FormState {
  bannerImage: string | null;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  modules: {
    id: number;
    title: string;
    isCollapsed: boolean;
    lessons: {
      id: number;
      title: string;
      type: LessonType;
      content: any;
      quizzes: {
        id: number;
        questions: QuestionData[];
      }[];
    }[];
  }[];
}

const CreateTrainingModules = ({
  initialData,
  onSave,
  isEditMode = false,
}: CreateTrainingModulesProps) => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState<{
    moduleId: number | null;
    lessonId: number | null;
  }>({ moduleId: null, lessonId: null });
  const { createTraining, isLoading } = useTrainingStore();

  // Form state
  const [formState, setFormState] = useState<FormState>(
    initialData || {
      bannerImage: null,
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      modules: [
        {
          id: 1,
          title: "New Module",
          isCollapsed: false,
          lessons: [
            {
              id: 1,
              title: "New Lesson",
              type: "video",
              content: null,
              quizzes: [],
            },
          ],
        },
      ],
    }
  );

  // Active lesson state for content type tabs
  const [activeLessonTab, setActiveLessonTab] = useState<{
    moduleId: number;
    lessonId: number;
    tabIndex: number;
  }>({
    moduleId: 1,
    lessonId: 1,
    tabIndex: 0,
  });

  // Handle training details input change
  const handleTrainingDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setFormState({
          ...formState,
          bannerImage: reader.result as string,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle lesson content file upload
  const handleLessonFileUpload = (
    moduleId: number,
    lessonId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      // Set uploading state
      setIsUploading({ moduleId, lessonId });

      reader.onload = () => {
        const base64String = reader.result as string;
        const updatedModules = formState.modules.map((module) => {
          if (module.id === moduleId) {
            const updatedLessons = module.lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  content: base64String,
                };
              }
              return lesson;
            });
            return { ...module, lessons: updatedLessons };
          }
          return module;
        });

        setFormState({
          ...formState,
          modules: updatedModules,
        });

        // Clear uploading state
        setIsUploading({ moduleId: null, lessonId: null });
      };

      reader.onerror = () => {
        // Handle read error
        console.error("Error reading file");
        setIsUploading({ moduleId: null, lessonId: null });
      };

      // Always read as base64 for all file types
      reader.readAsDataURL(file);
    }
  };

  // Handle lesson link input
  const handleLessonLinkInput = (
    moduleId: number,
    lessonId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const updatedModules = formState.modules.map((module) => {
      if (module.id === moduleId) {
        const updatedLessons = module.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            return { ...lesson, content: value };
          }
          return lesson;
        });
        return { ...module, lessons: updatedLessons };
      }
      return module;
    });
    setFormState({
      ...formState,
      modules: updatedModules,
    });
  };

  // Handle text editor content
  const handleEditorContent = (
    moduleId: number,
    lessonId: number,
    content: any
  ) => {
    const updatedModules = formState.modules.map((module) => {
      if (module.id === moduleId) {
        const updatedLessons = module.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            return { ...lesson, content };
          }
          return lesson;
        });
        return { ...module, lessons: updatedLessons };
      }
      return module;
    });
    setFormState({
      ...formState,
      modules: updatedModules,
    });
  };

  // Handle quiz questions
  const handleQuizQuestions = (
    moduleId: number,
    lessonId: number,
    quizId: number,
    data: { questions: QuestionData[] }
  ) => {
    const updatedModules = formState.modules.map((module) => {
      if (module.id === moduleId) {
        const updatedLessons = module.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            const updatedQuizzes = lesson.quizzes.map((quiz) => {
              if (quiz.id === quizId) {
                return { ...quiz, questions: data.questions };
              }
              return quiz;
            });
            return { ...lesson, quizzes: updatedQuizzes };
          }
          return lesson;
        });
        return { ...module, lessons: updatedLessons };
      }
      return module;
    });
    setFormState({
      ...formState,
      modules: updatedModules,
    });
  };

  // Toggle module collapse state
  const toggleModuleCollapse = (moduleId: number) => {
    setFormState({
      ...formState,
      modules: formState.modules.map((module) => {
        if (module.id === moduleId) {
          return { ...module, isCollapsed: !module.isCollapsed };
        }
        return module;
      }),
    });
  };

  // Add new module
  const addNewModule = () => {
    const newModuleId =
      formState.modules.length > 0
        ? Math.max(...formState.modules.map((m) => m.id)) + 1
        : 1;
    setFormState({
      ...formState,
      modules: [
        ...formState.modules,
        {
          id: newModuleId,
          title: "New Module",
          isCollapsed: false,
          lessons: [
            {
              id: 1,
              title: "New Lesson",
              type: "video",
              content: null,
              quizzes: [],
            },
          ],
        },
      ],
    });
  };

  // Add new lesson to a module
  const addNewLesson = (moduleId: number) => {
    setFormState({
      ...formState,
      modules: formState.modules.map((module) => {
        if (module.id === moduleId) {
          const newLessonId =
            module.lessons.length > 0
              ? Math.max(...module.lessons.map((l) => l.id)) + 1
              : 1;
          return {
            ...module,
            lessons: [
              ...module.lessons,
              {
                id: newLessonId,
                title: "New Lesson",
                type: "video",
                content: null,
                quizzes: [],
              },
            ],
          };
        }
        return module;
      }),
    });
  };

  // Add new quiz to a lesson
  const addNewQuiz = (moduleId: number, lessonId: number) => {
    setFormState({
      ...formState,
      modules: formState.modules.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map((lesson) => {
            if (lesson.id === lessonId) {
              const newQuizId =
                lesson.quizzes.length > 0
                  ? Math.max(...lesson.quizzes.map((q) => q.id)) + 1
                  : 1;
              return {
                ...lesson,
                quizzes: [
                  ...lesson.quizzes,
                  {
                    id: newQuizId,
                    questions: [],
                  },
                ],
              };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        }
        return module;
      }),
    });
  };

  // Handle module title change
  const handleModuleTitleChange = (
    moduleId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      modules: formState.modules.map((module) => {
        if (module.id === moduleId) {
          return { ...module, title: value };
        }
        return module;
      }),
    });
  };

  // Handle lesson title change
  const handleLessonTitleChange = (
    moduleId: number,
    lessonId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      modules: formState.modules.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map((lesson) => {
            if (lesson.id === lessonId) {
              return { ...lesson, title: value };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        }
        return module;
      }),
    });
  };

  // Handle lesson type tab click
  const handleLessonTabClick = (
    moduleId: number,
    lessonId: number,
    tabIndex: number,
    type: LessonType
  ) => {
    setActiveLessonTab({ moduleId, lessonId, tabIndex });

    // Update the lesson type
    setFormState({
      ...formState,
      modules: formState.modules.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map((lesson) => {
            if (lesson.id === lessonId) {
              return { ...lesson, type, content: null };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        }
        return module;
      }),
    });
  };

  // Delete module
  const deleteModule = (moduleId: number) => {
    setFormState((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }));
  };

  // Delete lesson
  const deleteLesson = (moduleId: number, lessonId: number) => {
    setFormState((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
          };
        }
        return module;
      }),
    }));
  };

  // const sanitizedContent = DOMPurify.sanitize(content);

  // Update your prepareDataForBackend function
  // Update the prepareDataForBackend function to properly handle the text editor content

  // Function to properly clean and format the content
  const cleanEditorContent = (content, lessonType) => {
    if (!content || typeof content !== "string") return "";

    // For text & image type, we need special handling
    if (lessonType === "text-&-image") {
      try {
        // Check if content contains an image
        if (content.includes('<img src="data:image/')) {
          // Extract just the base64 data from the image
          const imageMatch = content.match(/data:image\/[^;]+;base64,[^"]+/);
          if (imageMatch) {
            // Return just the base64 image data
            return imageMatch[0];
          }
        }

        // If it's text content (not an image)
        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;

        // Option 1: Extract just the text content without any HTML
        const plainText = tempDiv.textContent || tempDiv.innerText || "";

        // Option 2: If you want to keep minimal formatting like lists, but clean up tags
        // const minimalHtml = tempDiv.innerHTML.replace(/<\/?ol[^>]*>/g, '')
        //                                      .replace(/<\/?ul[^>]*>/g, '')
        //                                      .replace(/<li[^>]*>/g, '• ')
        //                                      .replace(/<\/li>/g, '\n');

        return plainText.trim();
      } catch (error) {
        console.error("Error processing content:", error);
        // Fallback to a simple tag removal if DOM parsing fails
        return content.replace(/<[^>]+>/g, "").trim();
      }
    }

    // For other types, just return the content as is
    return content;
  };

  // Update the prepareDataForBackend function
  const prepareDataForBackend = (formData = formState) => {
    // Format modules according to the backend's expected structure
    const formattedModules = formData.modules.map((module) => {
      const formattedLessons = module.lessons.map((lesson) => {
        // Collect all questions from all quizzes in this lesson
        const allQuestions: QuestionData[] = [];
        lesson.quizzes.forEach((quiz) => {
          if (quiz.questions && quiz.questions.length > 0) {
            allQuestions.push(...quiz.questions);
          }
        });

        // Process the content based on lesson type
        let formattedContent = "";

        if (lesson.content) {
          formattedContent = cleanEditorContent(lesson.content, lesson.type);
        }

        return {
          lessonType: lesson.type,
          lessonTitle: lesson.title,
          content: formattedContent,
          questions: allQuestions,
        };
      });

      return {
        moduleTitle: module.title,
        lessons: formattedLessons,
        questions: formattedLessons.flatMap((lesson) => lesson.questions),
      };
    });

    return {
      bannerImage: formData.bannerImage || "",
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      modules: formattedModules,
    };
  };

  // Optional: A more robust function that can handle both image and text mixed content
  const processComplexContent = (content) => {
    if (!content || typeof content !== "string") return "";

    // Create a temporary DOM element
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Check for images
    const images = tempDiv.querySelectorAll("img");
    if (images.length > 0) {
      // If there's an image, extract its src attribute
      const imageSrc = images[0].getAttribute("src");
      if (imageSrc && imageSrc.startsWith("data:image/")) {
        return imageSrc; // Return just the image data
      }
    }

    // No images found, process as text
    // Remove all HTML tags and return plain text
    return (
      tempDiv.textContent ||
      tempDiv.innerText ||
      content.replace(/<[^>]+>/g, "")
    );
  };

  // Save training module
  const saveTrainingModule = async () => {
    // Check if any file is currently uploading
    if (isUploading.moduleId !== null && isUploading.lessonId !== null) {
      toast("Please wait, file is still uploading");
      return;
    }

    try {
      const formattedData = prepareDataForBackend();
      console.log("Sending data to backend:", formattedData);

      // Call the createTraining function from the store
      if (isEditMode && onSave) {
        await onSave(formattedData);
      } else {
        const response = await createTraining(formattedData);
        if (response) navigate("/awareness-training");
      }
    } catch (error) {
      console.error("Error creating training:", error);
    }
  };

  const uploadTabs = [
    { icon: uploadVideoIcon, name: "Video", type: "video" as LessonType },
    {
      icon: uploadDocumentIcon,
      name: "Document",
      type: "document" as LessonType,
    },
    { icon: uploadLinkicon, name: "Link", type: "link" as LessonType },
    {
      icon: uploadTexticon,
      name: "text-&-image",
      type: "text-&-image" as LessonType,
    },
  ];

  return (
    <div className="px-24 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-textColor text-2xl">
          {isEditMode ? "Edit Training" : "Create Training Module"}
        </h1>
        <button
          disabled={!!isLoading}
          className={`bg-primary500 text-white py-3 px-12 rounded-lg font-semibold flex items-center justify-center
    ${isLoading ? "opacity-50 cursor-not-allowed" : ""} `}
          onClick={saveTrainingModule}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-6 mr-2 animate-spin" />
              {isEditMode ? "Updating..." : "Saving..."}
            </>
          ) : (
            <>{isEditMode ? "Update" : "Save"}</>
          )}
        </button>
      </div>

      {/* Training Details Section */}
      <div className="space-y-6 w-fit">
        <div className="space-y-2">
          <label htmlFor="bannerImage" className="block text-sm font-medium">
            Banner Image
          </label>

          {/* Preview Container */}
          {formState.bannerImage && (
            <div className="relative group w-[634px]">
              <img
                src={formState.bannerImage}
                alt="Banner preview"
                className="w-full h-64 object-cover rounded-lg border border-primary100"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setFormState({ ...formState, bannerImage: null })
                  }
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full"
                >
                  <Trash className="w-6 h-6  text-red-600" />
                </button>
              </div>
            </div>
          )}

          {/* Upload Area */}
          {!formState.bannerImage && (
            <label
              htmlFor="bannerImage"
              className="flex flex-col items-center justify-center w-[634px] h-48 cursor-pointer border-2 border-dashed border-primary100 rounded-md hover:border-primary500 transition-colors"
            >
              <div className="text-center space-y-2">
                <UploadCloud className="w-8 h-8 text-primary500 mx-auto" />
                <p className="text-sm font-medium text-primary500">
                  Click to upload banner image
                </p>
                <p className="text-xs text-gray-500">
                  Recommended: 1200x300px JPG or PNG
                </p>
              </div>
            </label>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            id="bannerImage"
            name="bannerImage"
            className="hidden"
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Training title
          </label>
          <input
            type="text"
            name="title"
            className="border border-primary100 py-4 px-3 w-[634px] rounded-md"
            value={formState.title}
            onChange={handleTrainingDetailsChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Training description
          </label>
          <textarea
            name="description"
            className="border border-primary100 py-2 px-3 w-[634px] h-[102px] rounded-md"
            value={formState.description}
            onChange={handleTrainingDetailsChange}
          />
        </div>
        <div className="flex gap-4 w-[634px] mb-4">
          <div className="w-full">
            <label htmlFor="startDate" className="block text-sm font-medium">
              Start date
            </label>
            <input
              type="date"
              name="startDate"
              className="border border-primary100 py-2 px-3 w-full basis-[50%] rounded-md"
              value={formState.startDate}
              onChange={handleTrainingDetailsChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="endDate" className="block text-sm font-medium">
              End date
            </label>
            <input
              type="date"
              name="endDate"
              className="border border-primary100 py-2 px-3 w-full rounded-md"
              value={formState.endDate}
              onChange={handleTrainingDetailsChange}
            />
          </div>
        </div>
        <hr className="text-[#D9D9D9]" />
      </div>

      {/* Modules Section */}
      {formState.modules.map((module) => (
        <div
          key={module.id}
          className="border border-primary100 rounded-2xl py-8 px-12 space-y-6"
        >
          {/* Module Header */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl">Module {module.id}</h1>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => toggleModuleCollapse(module.id)}
                >
                  {module.isCollapsed ? <ChevronDown /> : <ChevronUp />}
                </button>
                <button
                  onClick={() => deleteModule(module.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  {/* <Trash size={20} /> */}
                  <img src={delIcon} className=" size-5" alt="" />
                </button>
              </div>
            </div>

            {/* Module Title Input */}
            <div>
              <label
                htmlFor={`moduleTitle-${module.id}`}
                className="block text-sm font-medium"
              >
                Module Title
              </label>
              <input
                type="text"
                id={`moduleTitle-${module.id}`}
                value={module.title}
                placeholder="New module"
                className="border border-primary100 py-4 px-3 w-full rounded-md"
                onChange={(e) => handleModuleTitleChange(module.id, e)}
              />
            </div>

            {!module.isCollapsed && (
              <>
                {/* Lessons */}
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="mt-6 border border-primary100 rounded-2xl p-8 space-y-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h1 className="text-2xl">Lesson {lesson.id}</h1>
                      <button
                        onClick={() => deleteLesson(module.id, lesson.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        {/* <Trash size={20} /> */}
                        <img src={delIcon} className=" size-5" alt="" />
                      </button>
                    </div>
                    {/* Lesson Title */}
                    <div>
                      <label
                        htmlFor={`lessonTitle-${module.id}-${lesson.id}`}
                        className="block text-sm font-medium"
                      >
                        Lesson title
                      </label>
                      <input
                        type="text"
                        id={`lessonTitle-${module.id}-${lesson.id}`}
                        value={lesson.title}
                        placeholder="New lesson"
                        className="border border-primary100 py-4 px-3 w-full rounded-md"
                        onChange={(e) =>
                          handleLessonTitleChange(module.id, lesson.id, e)
                        }
                      />
                    </div>
                    {/* Lesson Type Tabs */}
                    <h1>Select lesson type</h1>
                    <div className="flex justify-between">
                      {uploadTabs.map(({ icon, name, type }, index) => (
                        <div
                          key={index}
                          className={`flex justify-center items-center gap-4 w-[125px] h-[116px] cursor-pointer ${
                            activeLessonTab.moduleId === module.id &&
                            activeLessonTab.lessonId === lesson.id &&
                            activeLessonTab.tabIndex === index
                              ? "bg-blue50 border border-primary200 rounded-md"
                              : ""
                          }`}
                          onClick={() =>
                            handleLessonTabClick(
                              module.id,
                              lesson.id,
                              index,
                              type
                            )
                          }
                        >
                          <div className="flex flex-col items-center gap-4">
                            <img src={icon} alt={name} />
                            <h1>{name}</h1>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Content Inputs based on tab selection */}
                    <div>
                      {activeLessonTab.moduleId === module.id &&
                        activeLessonTab.lessonId === lesson.id && (
                          <>
                            {activeLessonTab.tabIndex === 0 && (
                              <div>
                                <label
                                  htmlFor={`videoContent-${module.id}-${lesson.id}`}
                                  className="block text-sm font-medium"
                                >
                                  Upload video
                                </label>
                                <div className="relative">
                                  <input
                                    type="file"
                                    id={`videoContent-${module.id}-${lesson.id}`}
                                    accept="video/*"
                                    className="border border-primary100 py-4 px-3 w-full rounded-md"
                                    onChange={(e) =>
                                      handleLessonFileUpload(
                                        module.id,
                                        lesson.id,
                                        e
                                      )
                                    }
                                  />
                                  {isUploading.moduleId === module.id &&
                                    isUploading.lessonId === lesson.id && (
                                      <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}

                            {/* Similar modification for document upload */}
                            {activeLessonTab.tabIndex === 1 && (
                              <div>
                                <label
                                  htmlFor={`documentContent-${module.id}-${lesson.id}`}
                                  className="block text-sm font-medium"
                                >
                                  Upload Document
                                </label>
                                <div className="relative">
                                  <input
                                    type="file"
                                    id={`documentContent-${module.id}-${lesson.id}`}
                                    accept=".pdf,.doc,.docx"
                                    className="border border-primary100 py-4 px-3 w-full rounded-md"
                                    onChange={(e) =>
                                      handleLessonFileUpload(
                                        module.id,
                                        lesson.id,
                                        e
                                      )
                                    }
                                  />
                                  {isUploading.moduleId === module.id &&
                                    isUploading.lessonId === lesson.id && (
                                      <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}

                            {activeLessonTab.tabIndex === 2 && (
                              <div>
                                <label
                                  htmlFor={`linkContent-${module.id}-${lesson.id}`}
                                  className="block text-sm font-medium"
                                >
                                  Insert Link
                                </label>
                                <input
                                  type="text"
                                  id={`linkContent-${module.id}-${lesson.id}`}
                                  placeholder="Paste link"
                                  className="border border-primary100 py-4 px-3 w-full rounded-md"
                                  onChange={(e) =>
                                    handleLessonLinkInput(
                                      module.id,
                                      lesson.id,
                                      e
                                    )
                                  }
                                  value={
                                    typeof lesson.content === "string"
                                      ? lesson.content
                                      : ""
                                  }
                                />
                              </div>
                            )}

                            {activeLessonTab.tabIndex === 3 && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Content
                                </label>
                                <QuillToolbar toolbarId={"t1"} />
                                <ReactQuill
                                  modules={modules("t1")}
                                  formats={formats}
                                  theme="snow"
                                  value={lesson.content}
                                  onChange={(value: any) =>
                                    handleEditorContent(
                                      module.id,
                                      lesson.id,
                                      value
                                    )
                                  }
                                  placeholder="Start typing......"
                                  className="h-44"
                                />
                              </div>
                            )}
                          </>
                        )}
                    </div>
                    {/* Add Quiz Button */}
                    <button
                      className="mt-6 bg-[#F9F5FF] border border-primary100 py-2 px-4 rounded-lg flex items-center gap-2"
                      onClick={() => addNewQuiz(module.id, lesson.id)}
                    >
                      <PlusCircle size={16} />
                      Add new quiz
                    </button>
                    {/* Display quizzes if any */}

                    {lesson.quizzes.map((quiz) => (
                      <div key={quiz.id} className="mt-4">
                        <CreateTrainingStep3
                          quizId={quiz.id}
                          moduleId={module.id}
                          lessonId={lesson.id}
                          initialQuestions={quiz.questions} // Pass initial questions
                          onChange={(data) =>
                            handleQuizQuestions(
                              module.id,
                              lesson.id,
                              quiz.id,
                              data
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}

                {/* Add New Lesson Button */}
                <button
                  className="mt-6 bg-[#F9F5FF] border border-primary100 py-2 px-4 rounded-lg flex items-center gap-2"
                  onClick={() => addNewLesson(module.id)}
                >
                  <PlusCircle size={16} />
                  Add new lesson
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Add New Module Button */}
      <div className="">
        <button
          className="mt-6 border border-primary900 text-textColor font-semibold py-2 px-6 rounded-lg  gap-2"
          onClick={addNewModule}
        >
          {/* <PlusCircle size={16} /> */}
          Add new module
        </button>
      </div>
      {/*  */}
      <button
        disabled={!!isLoading}
        className={`w-full bg-primary500 text-white py-3 px-12 rounded-lg font-semibold flex items-center justify-center
    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
  `}
        onClick={saveTrainingModule}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-6 mr-2 animate-spin" />
            {isEditMode ? "Updating..." : "Saving..."}
          </>
        ) : (
          <>{isEditMode ? "Update" : "Save"}</>
        )}
      </button>
    </div>
  );
};

export default CreateTrainingModules;
