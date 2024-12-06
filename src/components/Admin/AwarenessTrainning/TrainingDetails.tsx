// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import downArrow from "../../../assets/svgs/downarrfilled.svg";
// import upArrow from "../../../assets/svgs/up-arrow-filled.svg";

// interface Module {
//   id: number;
//   title: string;
//   lessons: string[];
// }

// interface TrainingDetailsProps {
//   title: string;
//   description: string;
//   duration: string;
//   modules: Module[];
//   lessonsCount: number;
//   image: string;
// }

// const TrainingDetails: React.FC = () => {
//   const location = useLocation();
//   const data = location.state as TrainingDetailsProps;
//   const [expandedModule, setExpandedModule] = useState<number | null>(null);
//   const navigate = useNavigate();

//   const toggleModule = (id: number) => {
//     setExpandedModule((prev) => (prev === id ? null : id));
//   };

//   if (!data) {
//     return <div>No Training Data Available</div>;
//   }

//   return (
//     <div className="">
//       {/* Header Section */}
//       <h1 className=" text-greyText font-medium text-2xl mb-2">
//         View Training
//       </h1>
//       <div className=" flex items-center gap-2 mb-4">
//         <h1
//           className=" text-primary500 text-sm font-medium cursor-pointer "
//           onClick={() => navigate(-1)}
//         >
//           Awareness Trainning
//         </h1>
//         <span className=" text-neutrals500 text-sm font-medium ">/</span>
//         <h1 className=" text-neutrals500 text-sm font-medium ">
//           View Training Details
//         </h1>
//       </div>

//       <div className="bg-blue50 p-12 rounded-3xl flex items-center  justify-between">
//         <div className=" w-full space-y-4 basis-[60%]">
//           <h1 className="text-[56px] font-bold">{data.title}</h1>
//           <p className=" ">{`${data.modules.length} modules, ${data.lessonsCount} lessons`}</p>
//           <p className=" ">{data.duration}</p>
//           <button className="mt-4 px-6 py-2 bg-primary500 text-white rounded-lg">
//             Assign Training
//           </button>
//         </div>
//         {/*  */}
//         <div className=" w-ful h-[249px]">
//           <img
//             src={data.image}
//             alt={data.title}
//             className=" w-full h-full object-cover rounded-[30px]"
//           />
//         </div>
//       </div>

//       {/* Training Description and Modules */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mx-6">
//         {/* Description */}
//         <div className="md:col-span-2">
//           <h2 className="text-2xl font-bold  mb-4">Training Description</h2>
//           <p className="text-[#1B1B1B99]">{data.description}</p>
//         </div>

//         {/* Modules */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Modules</h2>
//           <ul className="space-y-4">
//             {data.modules.map((module) => (
//               <li key={module.id} className="border border-neutrals200  p-4">
//                 <div
//                   className="flex items-center justify-between cursor-pointer"
//                   onClick={() => toggleModule(module.id)}
//                 >
//                   <h3
//                     className={` text-xs ${
//                       expandedModule === module.id ? " font-bold" : ""
//                     }`}
//                   >
//                     Module {module.id}
//                   </h3>
//                   <img
//                     src={expandedModule === module.id ? upArrow : downArrow}
//                   />
//                 </div>
//                 {expandedModule === module.id && (
//                   <ul className="mt-2 text-xs">
//                     {module.lessons.map((lesson, index) => (
//                       <li key={index} className="">
//                         {lesson}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrainingDetails;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import downArrow from "../../../assets/svgs/downarrfilled.svg";
import upArrow from "../../../assets/svgs/up-arrow-filled.svg";
import ModalLayout from "../../../shared/ModalLayout";
import AssignTrainingModal from "./AssignTrainingModal";

interface Module {
  id: number;
  title: string;
  lessons: string[];
}

interface Progress {
  id: string;
  name: string;
  progress: number;
}

interface TrainingDetailsProps {
  title: string;
  description?: string;
  duration: string;
  modules?: Module[];
  lessonsCount?: number;
  image: string;
  isViewMode?: boolean;
  current?: number;
  progressData?: Progress[];
}

const TrainingDetails: React.FC = () => {
  const [isAssigned, setIsAssigned] = useState(false);
  const location = useLocation();
  const data = location.state as TrainingDetailsProps;
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleModule = (id: number) => {
    setExpandedModule((prev) => (prev === id ? null : id));
  };

  if (!data) {
    return <div>No Training Data Available</div>;
  }
  console.log("data", data);

  return (
    <div>
      {/* Header Section */}
      <h1 className="text-greyText font-medium text-2xl mb-2">
        {data.isViewMode ? "View Assigned Training" : "View Training"}
      </h1>
      <div className="flex items-center gap-2 mb-4">
        <h1
          className="text-primary500 text-sm font-medium cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Awareness Training
        </h1>
        <span className="text-neutrals500 text-sm font-medium">/</span>
        <h1 className="text-neutrals500 text-sm font-medium">
          {data.isViewMode
            ? "View Assigned Training Details"
            : "View Training Details"}
        </h1>
      </div>

      <div className="bg-blue50 p-12 rounded-3xl flex items-center justify-between">
        <div className="w-full space-y-4 basis-[60%]">
          <h1 className="text-[56px] font-bold">{data.title}</h1>
          <p>
            {`${data.modules?.length} modules, ${data.lessonsCount} lessons`}
          </p>
          <p>{data.duration}</p>
          {!data.isViewMode && (
            <button
              className="mt-4 px-6 py-2 bg-primary500 text-white rounded-lg"
              onClick={() => setIsAssigned(true)}
            >
              Assign Training
            </button>
          )}
        </div>
        <div className=" h-[249px]">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover rounded-[30px]"
          />
        </div>
      </div>

      {/* Conditional Rendering */}
      {data.isViewMode ? (
        // View Progress Section
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Employee Progress</h2>
          <table className="table-auto w-full border-collapse border border-neutrals200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-neutrals200 px-4 py-2">
                  Employee ID
                </th>
                <th className="border border-neutrals200 px-4 py-2">
                  Employee
                </th>
                <th className="border border-neutrals200 px-4 py-2">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((employee) => ( */}
              <tr>
                <td className="border border-neutrals200 px-4 py-2">
                  {/* {employee.id} */}
                </td>
                <td className="border border-neutrals200 px-4 py-2">
                  {/* {employee.name} */}
                </td>
                <td className="border border-neutrals200 px-4 py-2">
                  <div className="flex items-center">
                    <div className="w-full bg-secondary100  rounded-full h-2.5">
                      <div
                        className="bg-secondary600  h-2.5 rounded-full"
                        style={{ width: `${data.current}%` }}
                      ></div>
                    </div>
                    <span className="ml-2">{data.current}%</span>
                  </div>
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
          <p></p>
        </div>
      ) : (
        // Training Description and Modules
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mx-6">
          {/* Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Training Description</h2>
            <p className="text-[#1B1B1B99]">{data.description}</p>
          </div>

          {/* Modules */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Modules</h2>
            <ul className="space-y-4">
              {data.modules?.map((module) => (
                <li key={module.id} className="border border-neutrals200 p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleModule(module.id)}
                  >
                    <h3
                      className={`text-xs ${
                        expandedModule === module.id ? "font-bold" : ""
                      }`}
                    >
                      Module {module.id}
                    </h3>
                    <img
                      src={expandedModule === module.id ? upArrow : downArrow}
                    />
                  </div>
                  {expandedModule === module.id && (
                    <ul className="mt-2 text-xs">
                      {module.lessons.map((lesson, index) => (
                        <li key={index}>{lesson}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* assign training modal */}
      {isAssigned && (
        <ModalLayout>
          <AssignTrainingModal />
        </ModalLayout>
      )}
    </div>
  );
};

export default TrainingDetails;
