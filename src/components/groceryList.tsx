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
import { Badge } from "./ui/badge";

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
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemove(grocery.id)}
              >
                x
              </Button>
              <span>{grocery.quantity}</span>
              <span>{presets.find((preset) => preset.id === grocery.presetID)?.name}</span>
              <span>{presets.find((preset) => preset.id === grocery.presetID)?.unit}</span>
              <span>Expires: {new Date(grocery.expirationDate).toLocaleDateString()}</span>
              <Button variant="outline" size="icon" onClick={() => handleSetQuantity(grocery.id, grocery.quantity + 1)}>+</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Edit</Button>
                  </DialogTrigger>
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
              <Button variant="outline" size="icon" onClick={() => handleSetQuantity(grocery.id, grocery.quantity - 1)}>-</Button>
             <Badge variant="destructive" hidden={grocery.expirationDate < Date.now()}>EXPIRED!</Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


