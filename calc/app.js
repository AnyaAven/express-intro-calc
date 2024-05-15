/** Simple demo Express app. */
import { findMean, findMode, findMedian } from "./stats.js";
import express from "express";
const app = express();

// useful error class to throw
import { NotFoundError, BadRequestError } from "./expressError.js";

const MISSING_ERR_MSG = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */

app.get("/mean", function (req, res) {
  if (!("nums" in req.query)) throw new BadRequestError(MISSING_ERR_MSG);


  // "?nums=1,2,3,4"
  const nums = req.query.nums.split(",");
  const notNums = nums.filter(n => isNaN(n));
  if (notNums.length !== 0) {
    throw new BadRequestError(`${notNums} <-- these are not nums`);
  }

  const value = findMean(nums);

  return res.json({ operation: "mean", value });
});

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


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
