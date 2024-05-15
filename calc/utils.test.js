import { describe, test, expect } from "vitest";
import { convertStrNums } from "./utils.js";

describe("convertStrNums", function () {
  test("valid", function () {
    expect(convertStrNums(["1", "2", "3"])).toEqual([1, 2, 3]);
    expect(convertStrNums([])).toEqual([]);
    expect(convertStrNums(["1"])).toEqual([1]);
  });

  test("invalid", function () {
    expect(
      // when testing that errors are thrown, pass a function to expect
      function () {
        convertStrNums(["1", "hello"]);
      },
    ).toThrowError("Value 'hello' at 1 is not valid.");
  });
});
