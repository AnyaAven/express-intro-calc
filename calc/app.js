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


app.get("/all", function (req, res) {
  if (!("nums" in req.query)) throw new BadRequestError(MISSING_ERR_MSG);

  const nums = req.query.nums.split(",");
  const convertedNums = convertStrNums(nums);

  const mean = findMean(convertedNums);
  const median = findMedian(convertedNums);
  const mode = findMode(convertedNums);

  return res.json({
    response: {
      operation: "all",
      mean,
      median,
      mode,
    }
  });
});

const operations = {
  mean: findMean,
  median: findMedian,
  mode: findMode,
}

/** Finds mean, mode, or median of nums in qs:
 *
 * Return example if <operation> is mean:
  {operation: "mean", result } */
app.get("/:operation", function (req, res) {
  if (!("nums" in req.query)) throw new BadRequestError(MISSING_ERR_MSG);
  const operation = req.params.operation;
  if (!(operation in operations)) {
    throw new BadRequestError(`${operation} is not a valid operation`);
  }

  const nums = req.query.nums.split(",");
  const convertedNums = convertStrNums(nums);

  const findOperationVal = operations[operation]
  const result = findOperationVal(convertedNums)
  return res.json({
    response: {
      operation,
      result,
    }
  });
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
