import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import { ClipLoader } from "react-spinners"; // Example spinner
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./_Auth/Admin/SignUp";
import ForgotPassword from "./_Auth/Admin/ForgotPassword";
import OTPVerification from "./_Auth/Admin/OtpVerification";
import SuccessModal from "./_Auth/Admin/SucessModal";
import ResetPasswordLink from "./_Auth/Admin/ResetPasswordLink";
import SignIn from "./_Auth/Admin/SignIn";
// import Admin from "./components/Admin/UserManagement/Admin";
// import User from "./components/Admin/UserManagement/User";
import EmployeeProfile from "./components/Admin/UserManagement/EmployeeProfile";
import Templates from "./pages/Admin/Templates";
import Campaigns from "./pages/Admin/Campaigns";
import PhishingDetails from "./components/Admin/PhishingStimulation/Templates/PhishingDetails";
import CampaignDetails from "./components/Admin/PhishingStimulation/Campaigns/CampaignDetails";
import RiskDetails from "./components/Admin/RiskAssessment/RiskDetails";
import AssetsDetails from "./components/Admin/AssetsManagement/AssetsDetails";
import ScanDetails from "./components/Deep-Web-Moniroting/ScanDetails";
import ScanResult from "./components/Deep-Web-Moniroting/ScanResult";
import TrainingDetails from "./components/Admin/AwarenessTrainning/TrainingDetails";
import PhishingPreview from "./components/Admin/PhishingStimulation/Campaigns/PhishingPreview";
import Checkout from "./pages/Admin/Checkout";
import Onboarding from "./_Auth/Admin/Onboarding";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
const Overview = lazy(() => import("./pages/Admin/Overview"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
// const User = lazy(() => import("./pages/Admin/UserManagement/User"));
// const Admin = lazy(() => import("./pages/Admin/UserManagement/Admin"));
const AwarenessTraining = lazy(() => import("./pages/Admin/AwarenessTraining"));

// const Templates = lazy(
//   () => import("./pages/Admin/PhishingSimulation/Templates")
// );
// const Campaigns = lazy(
//   () => import("./pages/Admin/PhishingSimulation/Campaigns")
// );
const AssetManagement = lazy(() => import("./pages/Admin/AssetManagement"));
const RiskAssessment = lazy(() => import("./pages/Admin/RiskAssessment"));
const DeepWebMonitoring = lazy(() => import("./pages/Admin/DeepWebMonitoring"));
const Settings = lazy(() => import("./pages/Admin/Settings"));
const Alerts = lazy(() => import("./pages/Admin/Alerts"));

function App() {
  const { setIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [setIsAuthenticated]);

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader size={50} color="#123abc" />
      </div>
    );
  }
  // const { setIsAuthenticated } = useAuthStore();
  // useEffect(() => {
  //   const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  //   if (isAuthenticated === "true") {
  //     setIsAuthenticated(true);
  //   }
  // }, [setIsAuthenticated]);
  return (
    <>
      <Suspense
        fallback={
          null
          // <div className="loading-container">
          //   <ClipLoader size={50} color="#123abc" />
          // </div>
        }
      >
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/successful" element={<SuccessModal />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/reset-password" element={<ResetPasswordLink />} />

          {/* ADMIN ROUTES */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Overview />} />

              {/* USER MANAGEMENT ROUTES */}
              {/* <Route path="user-management" element={<UserManagement />}> */}
              {/* <Route path="user" element={<User />} />
              <Route path="admin" element={<Admin />} /> */}
              <Route
                path="user-management/:type"
                element={<UserManagement />}
              />
              <Route path="profile" element={<EmployeeProfile />} />

              {/* </Route> */}

              {/* PHISHING SIMULATION ROUTES */}
              <Route path="phishing-simulation">
                <Route
                  path="/phishing-simulation/templates"
                  element={<Templates />}
                />
                <Route
                  path="/phishing-simulation/campaigns"
                  element={<Campaigns />}
                />
                <Route
                  path="/phishing-simulation/campaign-details/:id"
                  element={<CampaignDetails />}
                />
                <Route
                  path="/phishing-simulation/preview"
                  element={<PhishingPreview />}
                />
              </Route>
              <Route path="phishing-details" element={<PhishingDetails />} />
              <Route
                path="awareness-training"
                element={<AwarenessTraining />}
              />
              <Route
                path="/training-details/:id"
                element={<TrainingDetails />}
              />
              <Route path="asset-management" element={<AssetManagement />} />
              <Route path="/asset-detail/:id" element={<AssetsDetails />} />
              <Route path="risk-assessment" element={<RiskAssessment />} />
              <Route path="/risk-detail/:id" element={<RiskDetails />} />
              <Route
                path="deep-web-monitoring"
                element={<DeepWebMonitoring />}
              />
              {/* <Route path="/scan-details" element={<ScanDetails />} /> */}
              <Route path="/scan-details" element={<ScanResult />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/alerts" element={<Alerts />} />
            </Route>
          </Route>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Toaster />
      </Suspense>
    </>
  );
}

export default App;
