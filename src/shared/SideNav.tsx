import { useState, useEffect } from "react";
import navIcon from "../assets/svgs/navicon.svg";
import navCloseIcon from "../assets/svgs/navclose.svg";
import alertIcon from "../assets/svgs/alertsicon.svg";
import assetIcon from "../assets/svgs/asseticon.svg";
import awarenessIcon from "../assets/svgs/awarenessicon.svg";
import deepwebIcon from "../assets/svgs/deepwebicon.svg";
import overviewIcon from "../assets/svgs/overviewIcon.svg";
import pshishingIcon from "../assets/svgs/pshishingicon.svg";
import riskIcon from "../assets/svgs/riskicon.svg";
import settingsIcon from "../assets/svgs/settingsicon.svg";
import userIcon from "../assets/svgs/usericon.svg";
import signoutIcon from "../assets/svgs/signout.svg";
import onlineStatus from "../assets/svgs/onlinestatus.svg";
import profilePic from "../assets/profilepic.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCustomization } from "../contexts/CustomizationContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { useAdminStore } from "../store/useAdminStore";

interface NavMenu {
  name: string;
  img: string;
  path?: string;
  subMenu?: NavMenuItem[];
}

interface NavMenuItem {
  name: string;
  path: string;
}

const SideNav = () => {
  const [activeMenu, setActiveMenu] = useState<string>(
    localStorage.getItem("activeMenu") || "Overview"
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState<boolean>(
    JSON.parse(localStorage.getItem("isUserManagementOpen") || "false")
  );
  const [isPhishingOpen, setIsPhishingOpen] = useState<boolean>(
    JSON.parse(localStorage.getItem("isPhishingOpen") || "false")
  );
  const { themeColor, logo } = useCustomization();

  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleSignOut = async () => {
    await logout();
  };

  const { currentUser, getCurrentAdmin } = useAdminStore();

  useEffect(() => {
    getCurrentAdmin();
  }, []);

  // Get user's initials from first and last name
  const getUserInitials = () => {
    let initials = "";

    if (currentUser?.fName) {
      initials += currentUser.fName.charAt(0).toUpperCase();
    }

    if (currentUser?.lName) {
      initials += currentUser.lName.charAt(0).toUpperCase();
    }

    // If we couldn't get any initials, return "U" as fallback
    return initials || "";
  };

  const navMenus = [
    { name: "Overview", img: overviewIcon, path: "/" },
    {
      name: "User Management",
      img: userIcon,
      subMenu: [
        { name: "Admin", path: "/user-management/Admin" },
        { name: "User", path: "/user-management/User" },
      ],
    },
    {
      name: "Awareness Training",
      img: awarenessIcon,
      path: "/awareness-training",
    },
    {
      name: "Phishing Simulation",
      img: pshishingIcon,
      subMenu: [
        { name: "Templates", path: "/phishing-simulation/templates" },
        { name: "Campaigns", path: "/phishing-simulation/campaigns" },
      ],
    },
    { name: "Asset Management", img: assetIcon, path: "/asset-management" },
    { name: "Risk Assessment", img: riskIcon, path: "/risk-assessment" },
    {
      name: "Deep Web Monitoring",
      img: deepwebIcon,
      path: "/deep-web-monitoring",
    },
    { name: "Settings", img: settingsIcon, path: "/settings" },
    { name: "Alerts", img: alertIcon, path: "/alerts" },
  ];

  function toggleSubMenu(menuName: string) {
    if (menuName === "User Management") {
      setIsUserManagementOpen(!isUserManagementOpen);
      localStorage.setItem(
        "isUserManagementOpen",
        JSON.stringify(!isUserManagementOpen)
      ); // Save submenu state
    } else if (menuName === "Phishing Simulation") {
      setIsPhishingOpen(!isPhishingOpen);
      localStorage.setItem("isPhishingOpen", JSON.stringify(!isPhishingOpen));
    }
  }

  function adjustColor(hex: string, amount: number) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Adjust the color by moving towards 255 to make it lighter
    r = Math.min(250, r + amount);
    g = Math.min(220, g + amount);
    b = Math.min(155, b + amount);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  const darkerThemeColor = adjustColor(themeColor, 21);

  // Retrieve activeMenu and submenu states from localStorage on component mount
  useEffect(() => {
    const savedActiveMenu = localStorage.getItem("activeMenu");
    const savedUserManagementOpen = JSON.parse(
      localStorage.getItem("isUserManagementOpen") || "false"
    );
    const savedPhishingOpen = JSON.parse(
      localStorage.getItem("isPhishingOpen") || "false"
    );

    if (savedActiveMenu) {
      setActiveMenu(savedActiveMenu);
    }

    setIsUserManagementOpen(savedUserManagementOpen);
    setIsPhishingOpen(savedPhishingOpen);
  }, []);
  //

  // Handle active menu persistence
  useEffect(() => {
    const savedPath = localStorage.getItem("activeRoute");

    if (savedPath && savedPath !== location.pathname) {
      navigate(savedPath);
    }
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    let matchedMenu = activeMenu; // Use the current activeMenu initially

    const isMenuFound = navMenus.some((menu) => {
      if (menu.path === currentPath) {
        matchedMenu = menu.name;
        return true;
      } else if (menu.subMenu) {
        return menu.subMenu.some((sub) => {
          if (sub.path === currentPath) {
            matchedMenu = sub.name;
            return true;
          }
          return false;
        });
      }
      return false;
    });

    // If no match is found, keep the current activeMenu
    if (!isMenuFound) {
      setActiveMenu(matchedMenu);
    }

    localStorage.setItem("activeRoute", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("activeRoute", location.pathname);

    const currentPath = location.pathname;
    let matchedMenu = "Overview";

    navMenus.forEach((menu) => {
      if (menu.path === currentPath) {
        matchedMenu = menu.name;
      } else if (menu.subMenu) {
        const matchedSubMenu = menu.subMenu.find(
          (sub) => sub.path === currentPath
        );
        if (matchedSubMenu) {
          matchedMenu = matchedSubMenu.name;
          if (menu.name === "User Management") setIsUserManagementOpen(true);
          if (menu.name === "Phishing Simulation") setIsPhishingOpen(true);
        }
      }
    });

    setActiveMenu(matchedMenu);
  }, [location.pathname]);

  useEffect(() => {
    const currentPath = location.pathname;
    let matchedMenu = activeMenu; // Initialize with the current activeMenu

    navMenus.forEach((menu) => {
      if (menu.path === currentPath) {
        matchedMenu = menu.name;
      } else if (menu.subMenu) {
        const subMenuMatch = menu.subMenu.find(
          (sub) => sub.path === currentPath
        );
        if (subMenuMatch) {
          matchedMenu = subMenuMatch.name;
          // Update parent menu's open state if necessary
          if (menu.name === "User Management") {
            setIsUserManagementOpen(true);
          } else if (menu.name === "Phishing Simulation") {
            setIsPhishingOpen(true);
          }
        }
      }
    });

    // Update the activeMenu state
    setActiveMenu(matchedMenu);
    localStorage.setItem("activeMenu", matchedMenu);
  }, [location.pathname]);

  // Function to handle setting active menu and saving it to localStorage
  // const handleSetActiveMenu = (menuName: string) => {
  //   setActiveMenu(menuName);
  //   localStorage.setItem("activeMenu", menuName); // Save activeMenu to localStorage
  // };
  // const handleSetActiveMenu = (menuName: string, parentName?: string) => {
  //   setActiveMenu(menuName);
  //   localStorage.setItem("activeMenu", menuName);

  //   if (parentName) {
  //     if (parentName === "User Management") {
  //       setIsUserManagementOpen(true);
  //       localStorage.setItem("isUserManagementOpen", "true");
  //     } else if (parentName === "Phishing Simulation") {
  //       setIsPhishingOpen(true);
  //       localStorage.setItem("isPhishingOpen", "true");
  //     }
  //   }
  // };
  const handleSetActiveMenu = (menuName: string, parentName?: string) => {
    setActiveMenu(menuName);
    localStorage.setItem("activeMenu", menuName);

    if (parentName) {
      // Ensure submenu's parent menu opens when expanded
      if (parentName === "User Management") {
        setIsUserManagementOpen(true);
        localStorage.setItem("isUserManagementOpen", "true");
      } else if (parentName === "Phishing Simulation") {
        setIsPhishingOpen(true);
        localStorage.setItem("isPhishingOpen", "true");
      }
    }
  };

  // const isMenuActive = (menu: NavMenu): boolean => {
  //   if (isCollapsed) {
  //     return menu.subMenu
  //       ? menu.subMenu.some((subItem) => subItem.name === activeMenu)
  //       : menu.name === activeMenu;
  //   } else {
  //     return menu.name === activeMenu;
  //   }
  // };
  const isMenuActive = (menu: NavMenu): boolean => {
    if (isCollapsed) {
      // When collapsed, check if any submenu item is active
      return menu.subMenu
        ? menu.subMenu.some((subItem) => subItem.name === activeMenu)
        : menu.name === activeMenu;
    } else {
      // When expanded, check the direct active state
      return menu.name === activeMenu;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsCollapsed(false)} // Expand on hover
      onMouseLeave={() => setIsCollapsed(true)} // Collapse on mouse leave
      className={`custom-scrollbar h-screen overflow-y-auto overflow-x-hidden px-4 py-6 bg-primary10 text-white flex flex-col gap-4 transition-all duration-1000 ${
        isCollapsed ? "w-[100px]" : "w-[294px]"
      }`}
      style={{ background: themeColor }}
    >
      {/* Logo */}
      <div className=" flex items-cente justify-center mb-8">
        <div
          className={`flex relative items-center ${
            isCollapsed ? "gap-0" : "gap-8"
          } `}
        >
          <div
            className={`text-white flex flex-col transition-all duration-1000`}
          >
            {logo ? (
              <img
                src={logo}
                alt="Company Logo"
                className={`w-full  h-[50px] object-cover ${
                  isCollapsed ? " w-[30px]" : ""
                }`}
              />
            ) : (
              <h1
                className={`font-semibold leading-[49.2px] tracking-[-2%] ${
                  isCollapsed ? "text-[41px] " : "text-[41px]"
                }`}
              >
                {isCollapsed ? "C" : "CAMP"}
              </h1>
            )}
            {!isCollapsed && (
              <p className="italic text-[13px] leading-[15.6px] tracking-[-2%]">
                by Pyralink Innovation
              </p>
            )}
          </div>
          {/* <img
            className={`cursor-pointer ${isCollapsed ? " pt-1" : "block"}`}
            src={isCollapsed ? navCloseIcon : navIcon}
            alt="Navigation Icon"
            width={24}
            onClick={() => setIsCollapsed(!isCollapsed)}
          /> */}
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {navMenus.map((navMenu, index) => (
          <div
            key={index}
            className={`${
              isCollapsed ? "flex items-center justify-center" : ""
            }`}
          >
            <Link to={navMenu.subMenu ? "#" : navMenu.path || "#"}>
              <div
                className={`flex items-center gap-4 p-2 cursor-pointer py-3 px-4 `}
                style={{
                  // background: navMenu.subMenu
                  //   ? // No active color for parent menus with submenus
                  //     "transparent"
                  //   : // Active color for other menus without submenus
                  //   activeMenu === navMenu.name
                  //   ? darkerThemeColor
                  //   : "transparent",
                  background: isMenuActive(navMenu)
                    ? darkerThemeColor
                    : "transparent",
                }}
                onClick={() => {
                  if (navMenu.subMenu) {
                    toggleSubMenu(navMenu.name); // Toggle submenu for parent menus
                  } else {
                    handleSetActiveMenu(navMenu.name); // Set active menu for other menus
                  }
                }}
              >
                <img
                  src={navMenu.img}
                  alt={`${navMenu.name} Icon`}
                  className="min-w-[18px]"
                />
                {!isCollapsed && (
                  <div className="flex items-center justify-between w-full">
                    <h1
                      className={` ${
                        navMenu.subMenu
                          ? // For parent menus with submenus, no active state styling
                            "text-sm text-[#C6DDF7]"
                          : // Active state styling for other menus
                          activeMenu === navMenu.name
                          ? "text-white text-[15px]"
                          : "text-sm text-[#C6DDF7]"
                      } `}
                    >
                      {navMenu.name}
                    </h1>
                    {/* Render arrow icons only for menus with submenus */}
                    {navMenu.subMenu && (
                      <div className="mr-6">
                        {navMenu.name === "User Management" &&
                        isUserManagementOpen ? (
                          <FaChevronUp />
                        ) : navMenu.name === "Phishing Simulation" &&
                          isPhishingOpen ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Link>

            {/* Render submenus */}
            {/* Render submenus */}
            {!isCollapsed &&
              navMenu.subMenu &&
              navMenu.name === "User Management" &&
              isUserManagementOpen && (
                <div>
                  {navMenu.subMenu.map((sub, subIndex) => (
                    <Link to={sub.path} key={subIndex}>
                      <div
                        style={{
                          background:
                            activeMenu === sub.name
                              ? darkerThemeColor
                              : "transparent",
                          color: activeMenu === sub.name ? "white" : "#C6DDF7",
                          padding: "12px 16px",
                          display: "flex",
                          justifyContent: isCollapsed ? "center" : "flex-start",
                          alignItems: "center",
                        }}
                        onClick={() =>
                          handleSetActiveMenu(sub.name, navMenu.name)
                        }
                      >
                        {!isCollapsed && (
                          <span className="ml-8 text-sm">{sub.name}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

            {!isCollapsed &&
              navMenu.subMenu &&
              navMenu.name === "Phishing Simulation" &&
              isPhishingOpen && (
                <div>
                  {navMenu.subMenu.map((sub, subIndex) => (
                    <Link to={sub.path} key={subIndex}>
                      <div
                        style={{
                          background:
                            activeMenu === sub.name
                              ? darkerThemeColor
                              : "transparent",
                          color: activeMenu === sub.name ? "white" : "#C6DDF7",
                          padding: "12px 16px",
                          display: "flex",
                          justifyContent: isCollapsed ? "center" : "flex-start",
                          alignItems: "center",
                        }}
                        onClick={() =>
                          handleSetActiveMenu(sub.name, navMenu.name)
                        }
                      >
                        {!isCollapsed && (
                          <span className="ml-8 text-sm">{sub.name}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>

      {/* Footer with signout */}
      <div className="absolut bottom-0 w-full p-4">
        <div
          className={`flex  justify-between gap-8 ${
            isCollapsed ? "flex-col " : "flex-col"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#D4CFCF] aspect-square rounded-full">
              {currentUser?.profileImage ? (
                <img
                  src={currentUser.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-800 font-semibold text-lg">
                  {getUserInitials()}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <span className="text-sm">
                {currentUser?.fName} {currentUser?.lName}
              </span>
            )}
          </div>
          {/*  */}
          <div
            className=" flex items-center gap-4 cursor-pointer"
            onClick={handleSignOut}
          >
            <img
              src={signoutIcon}
              alt="Sign Out"
              className="cursor-pointer"
              width={24}
            />
            {!isCollapsed && (
              <h2 className=" text-sm font-semibold">Log out</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
