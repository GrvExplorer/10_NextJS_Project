'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useStore } from '@/lib/zustand';
import { Button } from '@/components/ui/button';

export default function CustomersPage() {

  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.inc);
  const decrement = useStore((state) => state.dec);
  const reset = useStore((state) => state.reset);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers number {count}</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-fit space-y-2">
          <Button onClick={increment}>Increment</Button>
          <Button onClick={decrement}>Decrement</Button>
          <Button onClick={reset}>Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}
