import { Routes, Route } from "react-router";
import UserRouter from "./Routes/UserRouter";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </>
  );
}
