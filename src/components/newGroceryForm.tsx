'use client';
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { addGrocery } from "@/lib/features/grocery/grocerySlice";

export default function NewGroceryForm() {
  const [groceryName, setGroceryName] = useState("");
  const [groceryUnit, setGroceryUnit] = useState("");
  const [groceryQuantity, setGroceryQuantity] = useState(1);
  const [groceryExpirationDate, setGroceryExpirationDate] = useState(Date.now());
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groceryName.trim() === "") return;
    dispatch(addGrocery({
      id: Date.now(),
      name: groceryName,
      quantity: groceryQuantity,
      unit: groceryUnit,
      expirationDate: groceryExpirationDate
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
        type="number"
        value={groceryQuantity}
        onChange={(e) => setGroceryQuantity(Number(e.target.value))}
        placeholder="Quantity"
        className="border border-gray-300 rounded p-2"
      />
      <input
        type="text"
        value={groceryUnit}
        onChange={(e) => setGroceryUnit(e.target.value)}
        placeholder="Measurement unit"
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