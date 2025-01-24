import { Outlet } from "react-router";
import { Navbar } from "../Navbar";

export function UserLayout() {
  return (
    <>
      <div>
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
