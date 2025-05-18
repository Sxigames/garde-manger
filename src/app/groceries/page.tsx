import NewGroceryForm from "@/components/newGroceryForm";
import NotificationManager from "@/components/notifcationManager";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogDescription, DialogTitle  } from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import GroceryList from "./groceryList";


export default function Groceries() {

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>Manage notifications</Button>
              </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage notications</DialogTitle>
                <DialogDescription>
                  Manage expiration notifications for your groceries.
                </DialogDescription>
              </DialogHeader>
              <NotificationManager />
              </DialogContent>
          </Dialog>

        </main>
      </div>
  );
}
export const metadata = {
  title: "garde manger | Groceries",
  description: "Manage your groceries"
};

