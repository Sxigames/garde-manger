import GroceryList from "@/components/groceryList";
import NewGroceryForm from "@/components/newGroceryForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogDescription, DialogTitle  } from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";

export default function Groceries() {
  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h2>Groceries</h2>
          <GroceryList />
          <Dialog>
            <DialogTrigger asChild>
              <Button><CirclePlus />Add</Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new grocery</DialogTitle>
                <DialogDescription>
                  Add a new grocery item to your list.
                </DialogDescription>
              </DialogHeader>
              <NewGroceryForm />
              </DialogContent>
          </Dialog>
        </main>
      </div>
  );
}

