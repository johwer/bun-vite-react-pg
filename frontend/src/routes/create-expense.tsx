import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { api } from "@/lib/api";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const date = new Date();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
      description: "",
      date: date.toISOString().split("T")[0],
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    },
  });

  function FieldInfo({ field }: { field: FieldApi<string, ""> }) {
    return (
      <>
        {field.state.meta.touchedErrors ? (
          <em>{field.state.meta.touchedErrors}</em>
        ) : null}
        {field.state.meta.isValidating ? "Validating..." : null}
      </>
    );
  }

  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <form.Field
            name="title"
            children={(field) => (
              <>
                <Label htmlFor={field?.name}>Title</Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Title"
                />
                <FieldInfo field={field} />
              </>
            )}
          />

          <form.Field
            name="amount"
            children={(field) => (
              <>
                <Label htmlFor={field?.name}>Amount</Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(+e.target.value)}
                  placeholder="Amount"
                />
                <FieldInfo field={field} />
              </>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <>
                <Label htmlFor={field?.name}>Description</Label>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Description"
                />
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="date"
            children={(field) => (
              <>
                <Label htmlFor={field?.name}>Date</Label>
                <Input
                  type="date"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Date"
                />
                <FieldInfo field={field} />
              </>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button className="mt-2" type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Create"}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
}
