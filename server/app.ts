import { Hono } from "hono";
import { logger } from "hono/logger";
import expensesRoute from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono();
app.use("*", logger());

// app.get("/hello", (c) => c.text("Hello, Hono! 🚀"));
// app.get("/hello/:name", (c) => {
//   const name = c.req.param(`name`);
//   return c.text(`Hello, ${name}! 🚀`);
// });
// app.get("/test", (c) => c.json({ message: "Test" }));

app.route("/api/expenses", expensesRoute);

//app.use("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

app.get(
  "*",
  serveStatic({
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);
//app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));

export default app;
