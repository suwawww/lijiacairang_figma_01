import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Login } from "./components/pages/Login";
import { Home } from "./components/pages/Home";
import { EmergencyService } from "./components/pages/EmergencyService";
import { HealthManagement } from "./components/pages/HealthManagement";
import { Profile } from "./components/pages/Profile";
import { NotFound } from "./components/pages/NotFound";
import { VideoGuide } from "./components/pages/VideoGuide";
import { OnlineConsultation } from "./components/pages/OnlineConsultation";
import { HealthRecords } from "./components/pages/HealthRecords";
import { Appointment } from "./components/pages/Appointment";
import { EditProfile } from "./components/pages/EditProfile";
import { EmergencyCall } from "./components/pages/EmergencyCall";
import { AIConsultation } from "./components/pages/AIConsultation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "emergency", Component: EmergencyService },
      { path: "emergency-call", Component: EmergencyCall },
      { path: "health", Component: HealthManagement },
      { path: "profile", Component: Profile },
      { path: "video-guide", Component: VideoGuide },
      { path: "consultation", Component: OnlineConsultation },
      { path: "ai-consultation", Component: AIConsultation },
      { path: "health-records", Component: HealthRecords },
      { path: "appointment", Component: Appointment },
      { path: "edit-profile", Component: EditProfile },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
]);