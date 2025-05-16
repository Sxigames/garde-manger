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
        </div>
    );
    }