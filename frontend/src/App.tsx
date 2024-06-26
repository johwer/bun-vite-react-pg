import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function getTotalSpent() {
  const res = await fetch("/api/expenses/total-spent");
  console.log(res, " res");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

function App() {
  //const [totalSpent, setTotalSpent] = useState(0);

  // Queries
  const { /* isLoading, */ isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  //Rewrite this with use with React 19
  //const totalSpent = use(app.expenses["total-spent"].$get());
  // useEffect(() => {
  //   async function fetchTotalSpent() {
  //     const res = await api.expenses["total-spent"].$get();
  //     //const res = await fetch("/api/expenses/total-spent");
  //     const data = await res.json();
  //     setTotalSpent(data.totalSpent);
  //   }
  //   fetchTotalSpent();
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

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

export default App;
