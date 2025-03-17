// import imgOne from "../../../assets/browse-trainnig-card1.png";
// import imgTwo from "../../../assets/browse-training-card2.png";
// import imgThree from "../../../assets/browse-training-card3.png";
// import imgFour from "../../../assets/browse-training-card4.png";
// import imgFive from "../../../assets/browse-training-card5.png";
// import imgSix from "../../../assets/browse-training-card6.png";

// export interface Module {
//   id: number;
//   title: string;
//   lessons: string[];
// }

// export interface TabItem {
//   _id: any;
//   id: number;
//   title: string;
//   description: string;
//   duration: string;
//   lessonsCount: number;
//   modules: Module[];
//   image: string;
//   current?: number;
//   total?: number;
// }

// export type TabContent = {
//   browse: TabItem[];
//   custom: TabItem[];
//   assigned: TabItem[];
// };

// export const tabContent: TabContent = {
//   browse: [
//     {
//       id: 1,
//       title: "Cybersecurity for Beginners",
//       description:
//         "This course delves into the techniques and tools used to analyze and understand malicious software (malware) and how it operates. Designed for cybersecurity professionals, this advanced-level course teaches participants how to detect, analyze, and mitigate malware threats in complex environments. Through hands-on labs and real-world case studies, learners will gain the skills to perform static and dynamic analysis, reverse engineer malware, and understand its behavior in different operating environments.The course will cover:          Types of malware: viruses, trojans, worms, ransomware, and rootkitsMalware analysis methodologies: static vs. dynamic analysis Reverse engineering of malware binariesUnderstanding obfuscation and packing techniquesAnalyzing malware with tools like IDA Pro, Ghidra, and OllyDbgMemory forensics and examining volatile dat",
//       duration: "4 hours",
//       lessonsCount: 12,
//       modules: [
//         {
//           id: 1,
//           title: "Introduction to Cybersecurity",
//           lessons: ["Why cybersecurity matters", "Common threats"],
//         },
//         {
//           id: 2,
//           title: "Cybersecurity Best Practices",
//           lessons: ["Strong passwords", "Safe browsing tips"],
//         },
//         {
//           id: 3,
//           title: "Cybersecurity Best Practices",
//           lessons: ["Strong passwords", "Safe browsing tips"],
//         },
//         {
//           id: 4,
//           title: "Cybersecurity Best Practices",
//           lessons: ["Strong passwords", "Safe browsing tips"],
//         },
//         {
//           id: 5,
//           title: "Cybersecurity Best Practices",
//           lessons: ["Strong passwords", "Safe browsing tips"],
//         },
//         {
//           id: 6,
//           title: "Cybersecurity Best Practices",
//           lessons: ["Strong passwords", "Safe browsing tips"],
//         },
//         {
//           id: 7,
//           title: "Cybersecurity Best Practices",
//           lessons: ["Strong passwords", "Safe browsing tips"],
//         },
//       ],
//       image: imgOne,
//     },
//     {
//       id: 2,
//       title: "Identifying and Avoiding Phishing Attacks",
//       description:
//         "Employees will learn how to recognize phishing emails, fake websites, and other types of social engineering attacks.",
//       duration: "3 hours",
//       lessonsCount: 8,
//       modules: [
//         {
//           id: 1,
//           title: "Phishing Basics",
//           lessons: ["What is phishing?", "Common phishing tactics"],
//         },
//         {
//           id: 2,
//           title: "How to Avoid Phishing",
//           lessons: ["Email filters", "Spotting fake links"],
//         },
//       ],
//       image: imgTwo,
//     },
//     {
//       id: 3,
//       title: "Password Management and Security",
//       description:
//         "Employees are taught the importance of creating strong and unique passwords.",
//       duration: "2 hours",
//       lessonsCount: 6,
//       modules: [
//         {
//           id: 1,
//           title: "Password Essentials",
//           lessons: ["Creating strong passwords", "Using password managers"],
//         },
//         {
//           id: 2,
//           title: "Password Protection Tips",
//           lessons: ["Avoiding password reuse", "Two-factor authentication"],
//         },
//       ],
//       image: imgThree,
//     },
//     {
//       id: 4,
//       title: "Data Privacy",
//       description:
//         "This course provides a comprehensive overview of data privacy principles, key regulations, and how organizations can comply.",
//       duration: "5 hours",
//       lessonsCount: 10,
//       modules: [
//         {
//           id: 1,
//           title: "Introduction to Data Privacy",
//           lessons: ["What is data privacy?", "Key regulations"],
//         },
//         {
//           id: 2,
//           title: "Privacy Compliance",
//           lessons: ["GDPR overview", "Best practices for compliance"],
//         },
//       ],
//       image: imgFour,
//     },
//     {
//       id: 5,
//       title: "Cloud Security",
//       description:
//         "Employees learn how to handle, store, and share sensitive data in compliance.",
//       duration: "6 hours",
//       lessonsCount: 14,
//       modules: [
//         {
//           id: 1,
//           title: "Understanding Cloud Risks",
//           lessons: ["Types of cloud threats", "Vulnerabilities"],
//         },
//         {
//           id: 2,
//           title: "Securing Cloud Data",
//           lessons: ["Encryption", "Access control"],
//         },
//       ],
//       image: imgFive,
//     },
//     {
//       id: 6,
//       title: "Malware Analysis",
//       description:
//         "It includes best practices for safeguarding sensitive information, reporting suspicious activities.",
//       duration: "8 hours",
//       lessonsCount: 26,
//       modules: [
//         {
//           id: 1,
//           title: "Introduction to Malware",
//           lessons: ["What is malware?", "Types of malware"],
//         },
//         {
//           id: 2,
//           title: "Analyzing Malware",
//           lessons: ["Static analysis", "Dynamic analysis"],
//         },
//         {
//           id: 3,
//           title: "Preventing Malware",
//           lessons: ["Antivirus tools", "Regular updates"],
//         },
//       ],
//       image: imgSix,
//     },
//   ],
//   custom: [
//     {
//       id: 7,
//       title: "Cybersecurity for Beginners",
//       description:
//         "This course delves into the techniques and tools used to analyze and understand malicious software (malware) and how it operates. Designed for cybersecurity professionals, this advanced-level course teaches participants how to detect, analyze, and mitigate malware threats in complex environments. Through hands-on labs and real-world case studies, learners will gain the skills to perform static and dynamic analysis, reverse engineer malware, and understand its behavior in different operating environments.The course will cover:          Types of malware: viruses, trojans, worms, ransomware, and rootkitsMalware analysis methodologies: static vs. dynamic analysis Reverse engineering of malware binariesUnderstanding obfuscation and packing techniquesAnalyzing malware with tools like IDA Pro, Ghidra, and OllyDbgMemory forensics and examining volatile dat",
//       duration: "3 hours",
//       lessonsCount: 5,
//       modules: [
//         { id: 1, title: "Module A", lessons: ["Lesson 1", "Lesson 2"] },
//         { id: 2, title: "Module B", lessons: ["Lesson 3"] },
//       ],
//       image: imgTwo,
//     },
//     {
//       id: 8,
//       title: "Cybersecurity for Beginners",
//       description:
//         "This course delves into the techniques and tools used to analyze and understand malicious software (malware) and how it operates. Designed for cybersecurity professionals, this advanced-level course teaches participants how to detect, analyze, and mitigate malware threats in complex environments. Through hands-on labs and real-world case studies, learners will gain the skills to perform static and dynamic analysis, reverse engineer malware, and understand its behavior in different operating environments.The course will cover:          Types of malware: viruses, trojans, worms, ransomware, and rootkitsMalware analysis methodologies: static vs. dynamic analysis Reverse engineering of malware binariesUnderstanding obfuscation and packing techniquesAnalyzing malware with tools like IDA Pro, Ghidra, and OllyDbgMemory forensics and examining volatile dat",
//       duration: "4 hours",
//       lessonsCount: 7,
//       modules: [
//         {
//           id: 1,
//           title: "Module C",
//           lessons: ["Lesson 1", "Lesson 2", "Lesson 3"],
//         },
//         { id: 2, title: "Module D", lessons: ["Lesson 4"] },
//       ],
//       image: imgFour,
//     },
//   ],
//   assigned: [
//     {
//       id: 9,
//       title: "Cybersecurity for Beginners",
//       description:
//         "This course delves into the techniques and tools used to analyze and understand malicious software (malware) and how it operates. Designed for cybersecurity professionals, this advanced-level course teaches participants how to detect, analyze, and mitigate malware threats in complex environments. Through hands-on labs and real-world case studies, learners will gain the skills to perform static and dynamic analysis, reverse engineer malware, and understand its behavior in different operating environments.The course will cover:          Types of malware: viruses, trojans, worms, ransomware, and rootkitsMalware analysis methodologies: static vs. dynamic analysis Reverse engineering of malware binariesUnderstanding obfuscation and packing techniquesAnalyzing malware with tools like IDA Pro, Ghidra, and OllyDbgMemory forensics and examining volatile dat",
//       duration: "2 hours",
//       lessonsCount: 4,
//       modules: [
//         { id: 1, title: "Assigned Module 1", lessons: ["Lesson 1"] },
//         {
//           id: 2,
//           title: "Assigned Module 2",
//           lessons: ["Lesson 2", "Lesson 3"],
//         },
//       ],
//       image: imgOne,
//       current: 70,
//       total: 100,
//     },
//     {
//       id: 10,
//       title: "Identifying and Avoiding Phishing Attacks",
//       description:
//         "Employees will learn how to recognize phishing emails, fake websites, and other types of social engineering attacks.",
//       duration: "3 hours",
//       lessonsCount: 8,
//       modules: [
//         {
//           id: 1,
//           title: "Phishing Basics",
//           lessons: ["What is phishing?", "Common phishing tactics"],
//         },
//         {
//           id: 2,
//           title: "How to Avoid Phishing",
//           lessons: ["Email filters", "Spotting fake links"],
//         },
//       ],
//       image: imgTwo,
//       current: 40,
//       total: 100,
//     },
//     {
//       id: 11,
//       title: "Password Management and Security",
//       description:
//         "Employees are taught the importance of creating strong and unique passwords.",
//       duration: "2 hours",
//       lessonsCount: 6,
//       modules: [
//         {
//           id: 1,
//           title: "Password Essentials",
//           lessons: ["Creating strong passwords", "Using password managers"],
//         },
//         {
//           id: 2,
//           title: "Password Protection Tips",
//           lessons: ["Avoiding password reuse", "Two-factor authentication"],
//         },
//       ],
//       image: imgThree,
//       current: 90,
//       total: 100,
//     },
//     {
//       id: 12,
//       title: "Data Privacy",
//       description:
//         "This course provides a comprehensive overview of data privacy principles, key regulations, and how organizations can comply.",
//       duration: "5 hours",
//       lessonsCount: 10,
//       modules: [
//         {
//           id: 1,
//           title: "Introduction to Data Privacy",
//           lessons: ["What is data privacy?", "Key regulations"],
//         },
//         {
//           id: 2,
//           title: "Privacy Compliance",
//           lessons: ["GDPR overview", "Best practices for compliance"],
//         },
//       ],
//       image: imgFour,
//       current: 60,
//       total: 100,
//     },
//     {
//       id: 13,
//       title: "Cloud Security",
//       description:
//         "Employees learn how to handle, store, and share sensitive data in compliance.",
//       duration: "6 hours",
//       lessonsCount: 14,
//       modules: [
//         {
//           id: 1,
//           title: "Understanding Cloud Risks",
//           lessons: ["Types of cloud threats", "Vulnerabilities"],
//         },
//         {
//           id: 2,
//           title: "Securing Cloud Data",
//           lessons: ["Encryption", "Access control"],
//         },
//       ],
//       image: imgFive,
//       current: 10,
//       total: 100,
//     },
//   ],
// };
