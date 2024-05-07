import { Hono } from "hono";
import { logger } from "hono/logger";
const app = new Hono();
import expensesRoute from "./routes/expenses";

app.use("*", logger());

app.get("/hello", (c) => c.text("Hello, Hono! 🚀"));
app.get("/hello/:name", (c) => {
  const name = c.req.param(`name`);
  return c.text(`Hello, ${name}! 🚀`);
});
app.get("/test", (c) => c.json({ message: "Test" }));

app.route("/api/expenses", expensesRoute);

export default app;
