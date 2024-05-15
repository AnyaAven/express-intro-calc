import { test, expect } from "vitest";
import request from "supertest";
import app from "./app.js";

test("mean", async function () {
  const resp = await request(app).get("/mean?nums=1,2,3");
  expect(resp.body).toEqual({ operation: "mean", result: 2 });
});

test("median", async function () {
  const resp = await request(app).get("/median?nums=2,4,5");
  expect(resp.body).toEqual({ operation: "median", result: 4 });
});

test("mode", async function () {
  const resp = await request(app).get("/mode?nums=1,4,4,4,2,2,3");
  expect(resp.body).toEqual({ operation: "mode", result: 4 });
});