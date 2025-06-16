import express from "express";
import session from "express-session";
import passport from "passport";
import "./strategies/passport.js";
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
app.use(session({
    secret:'some secret',
    saveUninitialized : false,
    resave : false 
}))


app.use(passport.initialize());
app.use(passport.session());
// vaiables globales
app.use((req,res,next) =>{
    app.locals.user = req.user;
    next()
})

//routes 
app.use("/", routerApp);
app.use("/auth", routerAuth);
app.use("/dashboard", routerDashboard);



