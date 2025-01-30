import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import errorMiddleware from "./interfaces/middlewares/ErrorMiddleware";
import blogRoutes from "./interfaces/routes/blogRoutes";
import userRoutes from "./interfaces/routes/userRoutes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

export default app;
