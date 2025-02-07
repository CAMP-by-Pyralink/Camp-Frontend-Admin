// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { useCustomization } from "../contexts/CustomizationContext";

// // Import all necessary icons
// import navIcon from "../assets/svgs/navicon.svg";
// import navCloseIcon from "../assets/svgs/navclose.svg";
// import alertIcon from "../assets/svgs/alertsicon.svg";
// import assetIcon from "../assets/svgs/asseticon.svg";
// import awarenessIcon from "../assets/svgs/awarenessicon.svg";
// import deepwebIcon from "../assets/svgs/deepwebicon.svg";
// import overviewIcon from "../assets/svgs/overviewIcon.svg";
// import pshishingIcon from "../assets/svgs/pshishingicon.svg";
// import riskIcon from "../assets/svgs/riskicon.svg";
// import settingsIcon from "../assets/svgs/settingsicon.svg";
// import userIcon from "../assets/svgs/usericon.svg";
// import signoutIcon from "../assets/svgs/signout.svg";
// import profilePic from "../assets/profilepic.png";

// interface NavMenu {
//   name: string;
//   img: string;
//   path?: string;
//   subMenu?: NavMenuItem[];
// }

// interface NavMenuItem {
//   name: string;
//   path: string;
// }

// const SideNav: React.FC = () => {
//   const [activeMenu, setActiveMenu] = useState<string>(
//     localStorage.getItem("activeMenu") || "Overview"
//   );
//   const [isSideNavOpen, setIsSideNavOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState<boolean>(false);
//   const [isUserManagementOpen, setIsUserManagementOpen] = useState<boolean>(
//     JSON.parse(localStorage.getItem("isUserManagementOpen") || "false")
//   );
//   const [isPhishingOpen, setIsPhishingOpen] = useState<boolean>(
//     JSON.parse(localStorage.getItem("isPhishingOpen") || "false")
//   );
//   const { themeColor, logo } = useCustomization();

//   const navMenus: NavMenu[] = [
//     { name: "Overview", img: overviewIcon, path: "/" },
//     {
//       name: "User Management",
//       img: userIcon,
//       subMenu: [
//         { name: "Admin", path: "/user-management/Admin" },
//         { name: "User", path: "/user-management/User" },
//       ],
//     },
//     {
//       name: "Awareness Training",
//       img: awarenessIcon,
//       path: "/awareness-training",
//     },
//     {
//       name: "Phishing Simulation",
//       img: pshishingIcon,
//       subMenu: [
//         { name: "Templates", path: "/phishing-simulation/templates" },
//         { name: "Campaigns", path: "/phishing-simulation/campaigns" },
//       ],
//     },
//     { name: "Asset Management", img: assetIcon, path: "/asset-management" },
//     { name: "Risk Assessment", img: riskIcon, path: "/risk-assessment" },
//     {
//       name: "Deep Web Monitoring",
//       img: deepwebIcon,
//       path: "/deep-web-monitoring",
//     },
//     { name: "Settings", img: settingsIcon, path: "/settings" },
//     { name: "Alerts", img: alertIcon, path: "/alerts" },
//   ];

//   function toggleSubMenu(menuName: string) {
//     if (menuName === "User Management") {
//       setIsUserManagementOpen(!isUserManagementOpen);
//       localStorage.setItem(
//         "isUserManagementOpen",
//         JSON.stringify(!isUserManagementOpen)
//       );
//     } else if (menuName === "Phishing Simulation") {
//       setIsPhishingOpen(!isPhishingOpen);
//       localStorage.setItem("isPhishingOpen", JSON.stringify(!isPhishingOpen));
//     }
//   }

//   function adjustColor(hex: string, amount: number) {
//     let r = parseInt(hex.slice(1, 3), 16);
//     let g = parseInt(hex.slice(3, 5), 16);
//     let b = parseInt(hex.slice(5, 7), 16);

//     r = Math.min(250, r + amount);
//     g = Math.min(220, g + amount);
//     b = Math.min(155, b + amount);

//     return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
//   }

//   const darkerThemeColor = adjustColor(themeColor, 21);

//   useEffect(() => {
//     const savedActiveMenu = localStorage.getItem("activeMenu");
//     const savedUserManagementOpen = JSON.parse(
//       localStorage.getItem("isUserManagementOpen") || "false"
//     );
//     const savedPhishingOpen = JSON.parse(
//       localStorage.getItem("isPhishingOpen") || "false"
//     );

//     if (savedActiveMenu) {
//       setActiveMenu(savedActiveMenu);
//     }

//     setIsUserManagementOpen(savedUserManagementOpen);
//     setIsPhishingOpen(savedPhishingOpen);
//   }, []);

//   const handleSetActiveMenu = (menuName: string, parentName?: string) => {
//     setActiveMenu(menuName);
//     localStorage.setItem("activeMenu", menuName);

//     if (parentName) {
//       if (parentName === "User Management") {
//         setIsUserManagementOpen(true);
//         localStorage.setItem("isUserManagementOpen", "true");
//       } else if (parentName === "Phishing Simulation") {
//         setIsPhishingOpen(true);
//         localStorage.setItem("isPhishingOpen", "true");
//       }
//     }
//   };

//   const isMenuActive = (menu: NavMenu): boolean => {
//     return (
//       menu.name === activeMenu ||
//       (menu.subMenu && menu.subMenu.some((sub) => sub.name === activeMenu))
//     );
//   };

//   const navContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (navContainerRef.current) {
//         const rect = navContainerRef.current.getBoundingClientRect();
//         const isMouseOverNav =
//           e.clientX >= rect.left &&
//           e.clientX <= rect.right &&
//           e.clientY >= rect.top &&
//           e.clientY <= rect.bottom;

//         setIsHovered(isMouseOverNav);
//       }
//     };

//     document.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   const handleMouseEnter = () => {
//     if (!isHovered) {
//       setIsHovered(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (isHovered) {
//       setIsHovered(false);
//     }
//   };

//   return (
//     <div
//       ref={navContainerRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       className={`custom-scrollbar h-screen overflow-y-auto overflow-x-hidden px-4 py-6 text-white flex flex-col gap-4 ${
//         isHovered ? "w-[294px]" : "w-[100px]"
//       }`}
//       style={{ background: themeColor }}
//     >
//       <div className="transition-all duration-500 ease-in-out">
//         {/* Logo */}
//         <div className="flex items-center justify-center mb-8">
//           <div
//             className={`flex relative items-center ${
//               isHovered ? "gap-8" : "gap-0"
//             }`}
//           >
//             <div
//               className={`text-white flex flex-col transition-all duration-500`}
//             >
//               {logo ? (
//                 <img
//                   src={logo}
//                   alt="Company Logo"
//                   className={`w-full h-[50px] object-cover ${
//                     isHovered ? "" : "w-[30px]"
//                   }`}
//                 />
//               ) : (
//                 <h1
//                   className={`font-semibold leading-[49.2px] tracking-[-2%] ${
//                     isHovered ? "text-[41px]" : "text-[41px] ml-4"
//                   }`}
//                 >
//                   {isHovered ? "CAMP" : "C"}
//                 </h1>
//               )}
//               {isHovered && (
//                 <p className="italic text-[13px] leading-[15.6px] tracking-[-2%]">
//                   by Pyralink Innovation
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Menu */}
//         <div className="flex flex-col gap-2">
//           {navMenus.map((navMenu, index) => (
//             <div key={index}>
//               <Link to={navMenu.subMenu ? "#" : navMenu.path || "#"}>
//                 <div
//                   className={`flex items-center gap-4 p-2 cursor-pointer py-3 px-4 transition-colors duration-500`}
//                   style={{
//                     background: isMenuActive(navMenu)
//                       ? darkerThemeColor
//                       : "transparent",
//                   }}
//                   onClick={() => {
//                     if (navMenu.subMenu) {
//                       toggleSubMenu(navMenu.name);
//                     } else {
//                       handleSetActiveMenu(navMenu.name);
//                     }
//                   }}
//                 >
//                   <img
//                     src={navMenu.img}
//                     alt={`${navMenu.name} Icon`}
//                     className="min-w-[18px]"
//                   />
//                   {isHovered && (
//                     <div className="flex items-center justify-between w-full">
//                       <h1
//                         className={`${
//                           isMenuActive(navMenu)
//                             ? "text-white text-[15px]"
//                             : "text-sm text-[#C6DDF7]"
//                         } transition-colors duration-500`}
//                       >
//                         {navMenu.name}
//                       </h1>
//                       {navMenu.subMenu && (
//                         <div className="mr-6">
//                           {navMenu.name === "User Management" &&
//                           isUserManagementOpen ? (
//                             <FaChevronUp />
//                           ) : navMenu.name === "Phishing Simulation" &&
//                             isPhishingOpen ? (
//                             <FaChevronUp />
//                           ) : (
//                             <FaChevronDown />
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </Link>

//               {/* Render submenus */}
//               {isHovered &&
//                 navMenu.subMenu &&
//                 ((navMenu.name === "User Management" && isUserManagementOpen) ||
//                   (navMenu.name === "Phishing Simulation" &&
//                     isPhishingOpen)) && (
//                   <div>
//                     {navMenu.subMenu.map((sub, subIndex) => (
//                       <Link to={sub.path} key={subIndex}>
//                         <div
//                           className="transition-colors duration-500"
//                           style={{
//                             background:
//                               activeMenu === sub.name
//                                 ? darkerThemeColor
//                                 : "transparent",
//                             color:
//                               activeMenu === sub.name ? "white" : "#C6DDF7",
//                             padding: "12px 16px",
//                             display: "flex",
//                             justifyContent: "flex-start",
//                             alignItems: "center",
//                           }}
//                           onClick={() =>
//                             handleSetActiveMenu(sub.name, navMenu.name)
//                           }
//                         >
//                           <span className="ml-8 text-sm">{sub.name}</span>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//             </div>
//           ))}
//         </div>

//         {/* Footer with signout */}
//         <div className="absolute bottom-0 w-full p-4">
//           <div
//             className={`flex justify-between gap-8 ${
//               isHovered ? "flex-col" : "flex-col"
//             }`}
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-10 h-10 rounded-full">
//                 <img
//                   src={profilePic}
//                   alt="User"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {isHovered && <span className="text-sm">John Doe</span>}
//             </div>
//             <div className="flex items-center gap-4">
//               <img
//                 src={signoutIcon}
//                 alt="Sign Out"
//                 className="cursor-pointer"
//                 width={24}
//               />
//               {isHovered && <h2 className="text-sm font-semibold">Log out</h2>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideNav;
