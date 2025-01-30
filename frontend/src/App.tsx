import { Routes, Route } from "react-router";
import UserRouter from "./Routes/UserRouter";
import { Provider } from "react-redux";
import store from "./store/store";
import BlogRouter from "./Routes/BlogRouter";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/blog/*" element={<BlogRouter />} />
          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </Provider>
    </>
  );
}
