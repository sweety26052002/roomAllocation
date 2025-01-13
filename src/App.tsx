import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles.scss";
// import useFetch from "./services/apiService";
import AppHeader from "./common/components/AppHeader";
// import ProtectedRoute from "./layouts/ProtectedRoute";
import OrganizePage from "./components/Organize";
import FlightPage from "./components/FlightPage";
import OwnTransport from "./components/OwnTransport";
import Programs from "./components/Programs";
import RoomAllocationKPI from "./components/RoomAllocationKPI";
import LoginScreen from "./common/components/LoginScreen";
import ProtectedRoute from "./layouts/ProtectedRoute";

const EditProfile = lazy(() => import("./pages/EditProfile/index"));
const SuccessPage = lazy(() => import("./common/components/SuccessPage"));
const RegistrationForm = lazy(() => import("./pages/RegisterationForm"));
const ProfileDetails = lazy(() => import("./pages/ProfileDetails/index"));
const MakeInvestment = lazy(() => import("./pages/MakeInvestment/index"));
const LandingPage = lazy(() => import("./pages/LandingPage/index"));
const RoomAllocation = lazy(
  () => import("./components/Preferences/AllocateRooms"),
);
const SeekersList = lazy(() => import("./components/SeekersList/index"));
export default function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(`API URL: ${apiUrl}`);
  const data = [
    {
      profile: "",
      name: "John Doe",
      age: 25,
      city: "New York",
      gender: "F",
    },
    {
      profile: "",
      name: "John Doe",
      age: 25,
      city: "New York",
      gender: "F",
    },
    {
      profile: "",
      name: "John Doe",
      age: 25,
      city: "New York",
      gender: "F",
    },
  ];
  return (
    <Router>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<AppHeader variant="" />}>
              {/* <Route path="/" element={<SignIn />} /> */}
              <Route path="/" element={<LoginScreen />} />
            </Route>
            {/* <Route element={<ProtectedRoute />}> */}
            <Route element={<AppHeader variant="primary" />}>
              <Route path="/registrationform" element={<RegistrationForm />} />
              <Route path="/organize" element={<OrganizePage />} />
              <Route path="/flight" element={<FlightPage />} />
              <Route path="/ownTransport" element={<OwnTransport />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/pickUp" element={<OwnTransport />} />

              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/success-page" element={<SuccessPage />} />
              <Route
                path="/profile-confirmation"
                element={<ProfileDetails />}
              />
              <Route path="/make-investment" element={<MakeInvestment />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route element={<ProtectedRoute />} >
              <Route path="/room-allocation" element={<RoomAllocation />} />
              </Route>
              <Route path="/kpis" element={<RoomAllocationKPI headingsData={[]} activeKpi={""} />} />
              <Route
                path="/seekers-list"
                element={<SeekersList seekersList={data} />}
              />
            </Route>
            {/* </Route> */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
