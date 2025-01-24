import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import errorMiddleware from "./interfaces/middlewares/ErrorMiddleware";
import postRoutes from "./interfaces/routes/postRoutes";
import userRoutes from "./interfaces/routes/userRoutes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

export default app;
