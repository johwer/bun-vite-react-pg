import { createFileRoute } from "@tanstack/react-router";

//import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: Index,
});

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  //const res = await fetch("/api/expenses/total-spent");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

function Index() {
  //const [totalSpent, setTotalSpent] = useState(0);

  // Queries
  const { /* isLoading, */ isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? `...` : data.totalSpent}</CardContent>
    </Card>
  );
}
