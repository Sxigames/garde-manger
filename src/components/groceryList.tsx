'use client';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGrocery, addQuantity, removeQuantity } from "@/lib/features/grocery/grocerySlice";

export default function GroceryList() {
  const groceries = useAppSelector((state) => state.grocery.groceries);
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
              <span>{grocery.quantity} {grocery.name} {grocery.unit}</span>
              <span>Expires: {new Date(grocery.expirationDate).toLocaleDateString()}</span>
              <button onClick={() => handleAddQuantity(grocery.id)}>+</button>
              <button onClick={() => handleRemoveQuantity(grocery.id)}>-</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


