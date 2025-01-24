import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/database";

dotenv.config();

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
