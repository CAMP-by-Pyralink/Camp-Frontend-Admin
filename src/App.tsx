import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
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

// Lazy load all the components
const Overview = lazy(() => import("./pages/Admin/Overview"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
// const User = lazy(() => import("./pages/Admin/UserManagement/User"));
// const Admin = lazy(() => import("./pages/Admin/UserManagement/Admin"));
const AwarenessTraining = lazy(() => import("./pages/Admin/AwarenessTraining"));
const PhishingSimulation = lazy(
  () => import("./pages/Admin/PhishingSimulation")
);
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
  return (
    <>
      <Suspense
        fallback={
          <div className="loading-container">
            <ClipLoader size={50} color="#123abc" />
          </div>
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
          <Route path="/reset-password" element={<ResetPasswordLink />} />

          {/* ADMIN ROUTES */}
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Overview />} />

            {/* USER MANAGEMENT ROUTES */}
            {/* <Route path="user-management" element={<UserManagement />}> */}
            {/* <Route path="user" element={<User />} />
              <Route path="admin" element={<Admin />} /> */}
            <Route path="user-management/:type" element={<UserManagement />} />
            {/* </Route> */}

            {/* PHISHING SIMULATION ROUTES */}
            <Route path="phishing-simulation" element={<PhishingSimulation />}>
              {/* <Route path="templates" element={<Templates />} /> */}
              {/* <Route path="campaigns" element={<Campaigns />} /> */}
            </Route>
            <Route path="profile" element={<EmployeeProfile />} />

            <Route path="awareness-training" element={<AwarenessTraining />} />
            <Route path="asset-management" element={<AssetManagement />} />
            <Route path="risk-assessment" element={<RiskAssessment />} />
            <Route path="deep-web-monitoring" element={<DeepWebMonitoring />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/alerts" element={<Alerts />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
