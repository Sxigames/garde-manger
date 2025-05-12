'use client';
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { addGroceryPreset } from "@/lib/features/preset/presetSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";

export default function NewGroceryForm() {
  const [groceryName, setGroceryName] = useState("");
  const [groceryUnit, setGroceryUnit] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groceryName.trim() === "") return;
    dispatch(addGroceryPreset({
      id: Date.now(),
      name: groceryName,
      unit: groceryUnit
    }));
    setGroceryName("");
    setGroceryUnit("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
      <Input
        type="text"
        value={groceryName}
        onChange={(e) => setGroceryName(e.target.value)}
        placeholder="Grocery name"
      />
      <Input
        type="text"
        value={groceryUnit}
        onChange={(e) => setGroceryUnit(e.target.value)}
        placeholder="Measurement unit"
      />
      
      <Button type="submit">
        <CirclePlus /> Add Preset
      </Button>
    </form>
  );
}