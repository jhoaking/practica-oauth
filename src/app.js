import express from "express";
import session from "express-session";
import passport from "passport";
import "./strategies/passport.js";

import { routerApp } from "./routes/index.routes.js";
import { routerAuth } from "./routes/auth.routes.js";
import { routerDashboard } from "./routes/dashboard.routes.js";

import path from "path";
import { fileURLToPath } from "url";
import connectPg from "connect-pg-simple";
import { connect } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pgSession = connectPg(session)

export const app = express();
//settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(
  session({
    store: new pgSession({
      pool: connect,
      tableName: "session",
    }),
    secret: "some secret",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// vaiables globales
app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});

//routes 
app.use("/home", routerApp);
app.use("/auth", routerAuth);
app.use("/dashboard", routerDashboard);
