import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from "./src/config/databaseConfig.js";
import authRoute from "./src/routes/authRoute.js";
import { PORT, FRONTEND_URL } from "./src/config/serverConfig.js";

const app = express();

try {
    await connectToDb();
    console.log("Database connected successfully");
} catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: [FRONTEND_URL, "https://auth-u.vercel.app"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Routes
app.use(`/api/v1/auth`, authRoute);

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});