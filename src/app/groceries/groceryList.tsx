'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGrocery, setQuantity } from "@/lib/features/grocery/grocerySlice";
import { DataTable } from './data-table';
import { GroceryOnTable, columns } from './columns';
import { get } from 'http';

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
        name: preset?.name,
        quantity: grocery.quantity,
        unit: preset?.unit,
        expirationDate: grocery.expirationDate,
        deleteFunction: () => handleRemove(grocery.id),
        setQuantityFunction: (quantity: number) => handleSetQuantity(grocery.id, quantity),
    };
});
    return (
        <DataTable
        columns={columns}
        data={data}
        />
    );
    }