import express from "express";
import session from "express-session";
import { routerApp } from "./routes/index.routes.js";
import { routerAuth } from "./routes/auth.routes.js";
import { routerDashboard } from "./routes/dashboard.routes.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
//settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares


//routes
app.use("/", routerApp);
app.use("/auth", routerAuth);
app.use("/dashboard", routerDashboard);


// vaiables globales