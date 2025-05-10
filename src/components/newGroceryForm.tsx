'use client';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addGrocery } from "@/lib/features/grocery/grocerySlice";

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
      <select
        value={selectedPreset ?? ""}
        onChange={(e) => setSelectedPreset(Number(e.target.value))}
        className="border border-gray-300 rounded p-2"
      >
        <option value="" disabled>Select a preset</option>
        {presets.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.name}
          </option>
        ))}
      </select>
       <input
        type="number"
        value={groceryQuantity}
        onChange={(e) => setGroceryQuantity(Number(e.target.value))}
        placeholder="Quantity"
        className="border border-gray-300 rounded p-2"
      />
      <input
        type="date"
        value={new Date(groceryExpirationDate).toISOString().split("T")[0]}
        onChange={(e) => setGroceryExpirationDate(new Date(e.target.value).getTime())}
        placeholder="Expiration date"
        className="border border-gray-300 rounded p-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Add Grocery
      </button>
    </form>
  );
}