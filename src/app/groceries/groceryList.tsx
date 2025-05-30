'use client';

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGrocery, setQuantity, removeExpiredGroceries } from "@/lib/features/grocery/grocerySlice";
import { DataTable } from './data-table';
import { GroceryOnTable, columns } from './columns';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import type { Database } from "@/database.types";
type preset = Database['public']['Tables']['preset']['Row']
// type grocery = Database['public']['Tables']['grocery']['Row']

export default function GroceryList() {
    const supabase = createClient();
    const groceries = useAppSelector((state) => state.grocery.groceries);    
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const [data, setData] = useState<GroceryOnTable[]>([]);

    

    useEffect(() => {
        const handleRemove = (id: number) => {
        dispatch(removeGrocery(id));
    };
    const handleSetQuantity = (id: number, quantity: number) => {
        dispatch(setQuantity({ id, quantity }));
    };
        async function fetchData() {
            const presetIds = groceries.map(g => g.presetID);
            const { data: presets, error } = await supabase
                .from('preset')
                .select('*')
                .in('id', presetIds)
                .eq('household_id', user?.householdID);

            if (error) {
                console.error("Error fetching presets:", error);
                setData([]);
                return;
            }

            const presetMap = new Map<number, preset>();
            presets?.forEach((preset: preset) => {
                presetMap.set(preset.id, preset);
            });

            const tableData: GroceryOnTable[] = groceries.map((grocery) => {
                const preset = presetMap.get(grocery.presetID);
                return {
                    id: grocery.id,
                    name: preset?.name ?? "",
                    quantity: grocery.quantity,
                    unit: preset?.unit ?? "",
                    expirationDate: grocery.expirationDate,
                    icon: preset?.image ?? undefined,
                    deleteFunction: () => handleRemove(grocery.id),
                    setQuantityFunction: (quantity: number) => handleSetQuantity(grocery.id, quantity),
                };
            });
            setData(tableData);
        }
        if (user?.householdID && groceries.length > 0) {
            fetchData();
        } else {
            setData([]);
        }
    }, [groceries, user?.householdID, dispatch, supabase]);

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