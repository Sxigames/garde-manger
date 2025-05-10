'use client';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGrocery, addQuantity, removeQuantity } from "@/lib/features/grocery/grocerySlice";

export default function GroceryList() {
  const groceries = useAppSelector((state) => state.grocery.groceries);
  const presets = useAppSelector((state) => state.preset.groceryPresets);
  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeGrocery(id));
  };
  const handleAddQuantity = (id: number) => {
    dispatch(addQuantity(id));
  };
  const handleRemoveQuantity = (id: number) => {
    dispatch(removeQuantity(id));
  };

  return (
    <div>
      <ul className="flex flex-col gap-[32px]">
        {groceries.map((grocery) => (
          
          <li key={grocery.id} className="flex flex-col gap-[32px]">
            <div className="flex flex-row gap-[32px]">
              <button
                className="bg-red-500 text-white rounded p-2"
                onClick={() => handleRemove(grocery.id)}
              >
                x
              </button>
              <span>{grocery.quantity}</span>
              <span>{presets.find((preset) => preset.id === grocery.presetID)?.name}</span>
              <span>{presets.find((preset) => preset.id === grocery.presetID)?.unit}</span>
              <span>Expires: {new Date(grocery.expirationDate).toLocaleDateString()}</span>
              <button onClick={() => handleAddQuantity(grocery.id)}>+</button>
              <button onClick={() => handleRemoveQuantity(grocery.id)}>-</button>
             <span className={grocery.expirationDate < Date.now() ? "text-red-600" : "invisible"}>EXPIRED!</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


