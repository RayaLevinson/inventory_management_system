const express = require("express");
const morgan = require("morgan");       // Logger
const cors = require("cors");           // CORS
const api_routes = require("./src/routes");
const AppError = require("./src/utils/appError.util");
const appGlobalErrorHandler = require("./src/utils/appGlobalErrorHandler");
const { notFound } = require('./src/utils/statusCode.util')

const corsOptions = {
  optionsSuccessStatus: 200,
  origin: 'http://localhost:3000',
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
  next(new AppError("API Route Not Found", notFound))
);

// Middleware that catches errors - should be at the end (just before) get('/')
app.use(appGlobalErrorHandler); 

// Serve static assets in production, means serve React in production
if (process.env.NODE_ENV === 'production') {
  app.use(`/`, express.static(path.join(__dirname, 'client', 'build')));

  app.get(`/*`, (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
