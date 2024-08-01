const express = require("express");
const morgan = require("morgan");       // Logger
const cors = require("cors");           // CORS
const AppError = require("./src/utils/appError.util");
const appGlobalErrorHandler = require("./src/utils/appGlobalErrorHandler");
const api_routes = require("./src/routes");

const corsOptions = {
  optionsSuccessStatus: 200,
  origin: "*",                // TODO: Change this to the frontend URL
};
const app = express();

//Middlewares
app.use(express.json({ limit: "100mb" }));          // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));    // Parse URL-encoded bodies
app.use(morgan("dev"));                             // Logger
app.use(cors(corsOptions));                         // CORS


// Routes
app.use("/api", api_routes);

app.all("*", (req, res, next) =>
  next(new AppError("API Route Not Found", 404))
);

// Middleware that catches errors - should be at the end (just before) get('/')
app.use(appGlobalErrorHandler); 

module.exports = app;
