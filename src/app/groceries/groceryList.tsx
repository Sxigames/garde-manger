'use client';

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGrocery, setQuantity, removeExpiredGroceries } from "@/lib/features/grocery/grocerySlice";
import { DataTable } from './data-table';
import { GroceryOnTable, columns } from './columns';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

const data: GroceryOnTable[] = groceries.map((grocery) => {
    const preset = presets.find((preset) => preset.id === grocery.presetID);
    return {
        id: grocery.id,
        name: preset?.name ?? "",
        quantity: grocery.quantity,
        unit: preset?.unit ?? "",
        expirationDate: grocery.expirationDate,
        icon: preset?.image,
        deleteFunction: () => handleRemove(grocery.id),
        setQuantityFunction: (quantity: number) => handleSetQuantity(grocery.id, quantity),
    };
});
    return (
        <div>
        <DataTable
        columns={columns}
        data={data}
        />
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive">
                    <AlertTriangle />Remove expired groceries
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remove expired groceries</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to remove all expired groceries? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="destructive" onClick={() => dispatch(removeExpiredGroceries())}>
                        Remove
                    </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
                  <Button variant="ghost" className="text-white"
          onClick={() => {
            const background = document.querySelector("body");
            if (background) {
              background.style.backgroundImage = "url('https://v5.airtableusercontent.com/v3/u/41/41/1747620000000/mAG0SwwJ311vJ_DN3a2nJA/B9LFi6giiwfiRhRNrkFG8I9QB04FvrQ7UQLeCt3ekjhxpLGcQqP2MlSi8hgKvFmcZSei8D_wjRtAW_ZyrV9Dvttm7_wdlP3VbN7JzLvf8BfhAAXzQJmcnOZg__3Z70yACOBlplnI0iXmzHRfhuxMTIdlzdJ8t3BEdfu0m71eSVY/Sf6oCoKe1JUvJQIIXECCiXzSiJuGbBK980C9pbid1Ao')";
            }

          }}
          >
            neighborhood(sunset)
          </Button>
        </div>
    );
    }