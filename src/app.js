import createError from "http-errors";
import express, { json, urlencoded } from "express";
import cors from "cors";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { connect } from "./utils/db";

import indexRouter from "./routes/index";
import itemRouter from "./routes/item.router";

var app = express();

// view engine setup
app.set("views", join(__dirname, "../views"));
app.set("view engine", "pug");

/**
 * Check how to handle CORS properly
 */
app.use(cors());

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "../public")));

app.use("/", indexRouter);
app.use(itemRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export const connectMongoDB = async () => {
  try {
    await connect();
  } catch (error) {
    console.error(error);
  }
};

export default app;
