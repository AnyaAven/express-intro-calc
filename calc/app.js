/** Simple demo Express app. */
import { findMean, findMode, findMedian } from "./stats.js";
import { convertStrNums } from "./utils.js";
import express from "express";
const app = express();

// useful error class to throw
import { NotFoundError, BadRequestError } from "./expressError.js";

const MISSING_ERR_MSG = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.json());                           // process JSON data
app.use(express.urlencoded());                     // process trad form data


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  if (!("nums" in req.query)) throw new BadRequestError(MISSING_ERR_MSG);

  const nums = req.query.nums.split(",");
  const convertedNums = convertStrNums(nums);

  const result = findMean(convertedNums);

  return res.json({ operation: "mean", result });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  if (!("nums" in req.query)) throw new BadRequestError(MISSING_ERR_MSG);

  const nums = req.query.nums.split(",");
  const convertedNums = convertStrNums(nums);

  const result = findMedian(convertedNums);

  return res.json({ operation: "median", result });
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  if (!("nums" in req.query)) throw new BadRequestError(MISSING_ERR_MSG);

  const nums = req.query.nums.split(",");
  const convertedNums = convertStrNums(nums);

  const result = findMode(convertedNums);

  return res.json({ operation: "mode", result });
});

app.get("/all", function (req, res){
  if (!("nums" in req.query)) throw new BadRequestError(MISSING_ERR_MSG);
  
  const nums = req.query.nums.split(",");
  const convertedNums = convertStrNums(nums);
  
  const mean = findMean(convertedNums);
  const median = findMedian(convertedNums);
  const mode = findMode(convertedNums);
  
  return res.json({response: {
    operation: "all",
    mean,
    median,
    mode,
  }})
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



export default app;
