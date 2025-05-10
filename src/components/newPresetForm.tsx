'use client';
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { addGroceryPreset } from "@/lib/features/preset/presetSlice";

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
      <input
        type="text"
        value={groceryName}
        onChange={(e) => setGroceryName(e.target.value)}
        placeholder="Grocery name"
        className="border border-gray-300 rounded p-2"
      />
      <input
        type="text"
        value={groceryUnit}
        onChange={(e) => setGroceryUnit(e.target.value)}
        placeholder="Measurement unit"
        className="border border-gray-300 rounded p-2"
      />
      
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Add Preset
      </button>
    </form>
  );
}