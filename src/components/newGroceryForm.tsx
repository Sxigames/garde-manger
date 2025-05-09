'use client';
import { FC, useState } from "react";

interface NewGroceryFormProps {
  groceries: string[];
  setGroceries: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewGroceryForm: FC<NewGroceryFormProps> = ({ setGroceries }) => {
  const [grocery, setGrocery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (grocery.trim() === "") return;
    setGroceries((prevGroceries) => [...prevGroceries, grocery]);
    setGrocery("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
      <input
        type="text"
        value={grocery}
        onChange={(e) => setGrocery(e.target.value)}
        placeholder="Add a new grocery item"
        className="border border-gray-300 rounded p-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Add Grocery
      </button>
    </form>
  );
};

export default NewGroceryForm;