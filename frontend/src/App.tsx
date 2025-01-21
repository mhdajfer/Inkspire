import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import SignUpForm from "./components/SignupForm/SignupForm";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </>
  );
}
