'use client';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGrocery, setQuantity } from "@/lib/features/grocery/grocerySlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

export default function GroceryList() {
  const groceries = useAppSelector((state) => state.grocery.groceries);
  const presets = useAppSelector((state) => state.preset.groceryPresets);
  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeGrocery(id));
  };
  const handleSetQuantity = (id: number, quantity: number) => {
    dispatch(setQuantity({ id, quantity }));
  }

  return (
    <div>
      <ul className="flex flex-col gap-[32px]">
        {groceries.map((grocery) => (
          
          <li key={grocery.id} className="flex flex-col gap-[32px]">
            <div className="flex flex-row gap-[32px]">
              <button
                className="bg-red-500 text-white rounded p-2"
                onClick={() => handleRemove(grocery.id)}
              >
                x
              </button>
              <span>{grocery.quantity}</span>
              <span>{presets.find((preset) => preset.id === grocery.presetID)?.name}</span>
              <span>{presets.find((preset) => preset.id === grocery.presetID)?.unit}</span>
              <span>Expires: {new Date(grocery.expirationDate).toLocaleDateString()}</span>
              <button onClick={() => handleSetQuantity(grocery.id, grocery.quantity + 1)}>+</button>
              <Dialog>
                <DialogTrigger><Button>Edit</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Quantity</DialogTitle>
                    <DialogDescription>
                      Input the new quantity for {presets.find((preset) => preset.id === grocery.presetID)?.name}
                    </DialogDescription>
                  </DialogHeader>
                  <Input id="newQuantity" type="number" value={grocery.quantity} onChange={(e) => handleSetQuantity(grocery.id, parseInt(e.target.value))}/>
                  <DialogClose>
                  <Button type="submit">Save</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              <button onClick={() => handleSetQuantity(grocery.id, grocery.quantity - 1)}>-</button>
             <span className={grocery.expirationDate < Date.now() ? "text-red-600" : "invisible"}>EXPIRED!</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


