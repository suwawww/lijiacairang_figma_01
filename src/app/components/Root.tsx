import { Outlet } from "react-router";
import { Header } from "./Header";
import { SOSButton } from "./SOSButton";

export function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <SOSButton />
    </div>
  );
}