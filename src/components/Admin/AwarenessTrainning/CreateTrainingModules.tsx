import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import uploadVideoIcon from "../../../assets/svgs/upload-video-icon.svg";
import uploadDocumentIcon from "../../../assets/svgs/upload-document-icon.svg";
import uploadLinkicon from "../../../assets/svgs/link-icon.svg";
import uploadTexticon from "../../../assets/svgs/upload-text-img-icon.svg";
import Editor from "./Editor";
import {
  LessonType,
  QuestionType,
  useTrainingStore,
} from "../../../store/useAwarenessTrainingStore";
import CreateTrainingStep3 from "./CreateTrainingStep3";
import { useNavigate } from "react-router-dom";

interface QuestionData {
  question: string;
  questionType: QuestionType;
  options: string[];
  correctAnswer: string;
  answerMethod: string;
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
  bannerImage: File | null;
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

const CreateTrainingModules = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState<{
    moduleId: number | null;
    lessonId: number | null;
  }>({ moduleId: null, lessonId: null });
  // Get createTraining function from store
  const { createTraining } = useTrainingStore();

  // Form state
  const [formState, setFormState] = useState<FormState>({
    bannerImage: "" | File | null,
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
  });

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

  // Handle file input for banner image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setFormState({
          ...formState,
          bannerImage: base64String,
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

  const prepareDataForBackend = () => {
    // Format modules according to the backend's expected structure
    const formattedModules: ModuleData[] = formState.modules.map((module) => {
      const formattedLessons: LessonData[] = module.lessons.map((lesson) => {
        // Collect all questions from all quizzes in this lesson
        const allQuestions: QuestionData[] = [];
        lesson.quizzes.forEach((quiz) => {
          if (quiz.questions && quiz.questions.length > 0) {
            allQuestions.push(...quiz.questions);
          }
        });

        // Get content based on lesson type
        let formattedContent = "";
        if (typeof lesson.content === "string") {
          // If it's already a base64 string or a link
          formattedContent = lesson.content;
        } else if (
          lesson.content !== null &&
          typeof lesson.content === "object"
        ) {
          // For rich text editor content
          formattedContent = JSON.stringify(lesson.content);
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
      };
    });

    return {
      bannerImage: formState.bannerImage,
      title: formState.title,
      description: formState.description,
      startDate: formState.startDate,
      endDate: formState.endDate,
      modules: formattedModules,
    };
  };

  // Save training module
  const saveTrainingModule = async () => {
    // Check if any file is currently uploading
    if (isUploading.moduleId !== null && isUploading.lessonId !== null) {
      alert("Please wait, file is still uploading");
      return;
    }

    try {
      const formattedData = prepareDataForBackend();
      console.log("Sending data to backend:", formattedData);

      // Call the createTraining function from the store
      const response = await createTraining(formattedData);

      if (response) {
        // console.log("Training created successfully:", response);
        navigate("/awareness-training");
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
      name: "Text & Image",
      type: "text & image" as LessonType,
    },
  ];

  return (
    <div className="px-24 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-textColor text-2xl">Create Training Module</h1>
        <button
          className="bg-primary500 text-white py-3 px-12 rounded-lg font-semibold"
          onClick={saveTrainingModule}
        >
          Save
        </button>
      </div>

      {/* Training Details Section */}
      <div className="space-y-6 w-fit">
        <div>
          <label htmlFor="bannerImage" className="block text-sm font-medium">
            Upload image
          </label>
          <input
            type="file"
            name="bannerImage"
            className="border border-primary100 py-4 px-3 w-[634px] rounded-md"
            onChange={handleFileChange}
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
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => toggleModuleCollapse(module.id)}
              >
                {module.isCollapsed ? <ChevronDown /> : <ChevronUp />}
              </button>
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
                    <h1 className="text-2xl">Lesson {lesson.id}</h1>

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
                              <Editor
                                onChange={(content) =>
                                  handleEditorContent(
                                    module.id,
                                    lesson.id,
                                    content
                                  )
                                }
                                initialContent={lesson.content}
                              />
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
    </div>
  );
};

export default CreateTrainingModules;
