import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchemaId = z.string().uuid();

const expenseSchema = z.object({
  id: expenseSchemaId,
  title: z.string().min(3).max(255),
  amount: z.number().int().positive(),
  description: z.string().optional(),
  date: z.string().optional(),
});

type Expense = z.infer<typeof expenseSchema>;

const postSchema = expenseSchema.omit({ id: true });
type ExpensePost = z.infer<typeof postSchema>;

const expenses: Expense[] = [
  {
    id: "36b8f84d-df4e-4d49-b662-bcde71a8764f",
    title: "Eat out",
    amount: 100,
    description: "Lunch",
    date: "2021-01-01",
  },
  {
    id: "af8a8416-6e18-a307-bd9c-f2c947bbb3aa",
    title: "Eat out",
    amount: 200,
    description: "Dinner",
    date: "2021-01-02",
  },
];

const expensesRoute = new Hono()
  .get("/", async (c) => c.json({ expenses }))
  .post("/", zValidator("json", postSchema), async (c) => {
    const expense: ExpensePost = await c.req.valid("json");
    //const data: Expense = await c.req.json();
    //const expense = expenseSchema.parse(data);
    //expenses.push({...expense, id: expenses.length + 1});
    console.log(expenses);
    expenses.push({ ...expense, id: crypto.randomUUID() });
    console.log(expense);
    c.status(201);
    return c.json(expense);
  })
  .get("/total-spent", async (c) => {
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    //console.log(expenses, "expenses");
    const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
    return c.json({ totalSpent });
  })
  .get(`/:id`, async (c) => {
    console.log(c.req.param(`id`));
    //console.log(uuidReg.toString());
    const { id } = await c.req.param();
    console.log(id);
    console.log(expenses);

    try {
      expenseSchemaId.parse(id);
    } catch (err) {
      return c.text("Invalid id");
    }

    const expense = expenses.find((e) => {
      console.log(e.id, "e.id", id);
      return e.id === id;
    });
    console.log(expense);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })

  .delete(`/:id`, async (c) => {
    const { id } = await c.req.param();
    try {
      expenseSchemaId.parse(id);
    } catch (err) {
      return c.text("Invalid id");
    }

    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const [expense] = expenses.splice(index, 1);

    return c.json({ expense });
  });

export default expensesRoute;
