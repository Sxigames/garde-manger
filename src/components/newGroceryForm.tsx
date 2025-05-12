'use client';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addGrocery } from "@/lib/features/grocery/grocerySlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function NewGroceryForm() {
  const presets = useAppSelector((state) => state.preset.groceryPresets);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [groceryQuantity, setGroceryQuantity] = useState(1);
  const [groceryExpirationDate, setGroceryExpirationDate] = useState(Date.now());
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPreset === null) return;
    dispatch(addGrocery({
      id: Date.now(),
      presetID: selectedPreset,
      quantity: groceryQuantity,
      expirationDate: groceryExpirationDate,
    }));
    setSelectedPreset(null);
    setGroceryQuantity(1);
    setGroceryExpirationDate(Date.now());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
      <Select onValueChange={(value) => setSelectedPreset(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a preset" />
        </SelectTrigger>
        <SelectContent>
        {presets.map((preset) => (
          <SelectItem key={preset.id} value={preset.id.toString()}>
            {preset.name}
          </SelectItem>
        ))}
        </SelectContent>
      </Select>
       <Input
        type="number"
        value={groceryQuantity}
        onChange={(e) => setGroceryQuantity(Number(e.target.value))}
        placeholder="Quantity"
        className="border border-gray-300 rounded p-2"
      />
      <Input
        type="date"
        value={new Date(groceryExpirationDate).toISOString().split("T")[0]}
        onChange={(e) => setGroceryExpirationDate(new Date(e.target.value).getTime())}
        placeholder="Expiration date"
      />
      <Button type="submit" >
        Add Grocery
      </Button>
    </form>
  );
}