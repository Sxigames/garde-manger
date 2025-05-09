'use client';
import { FC } from 'react';

interface GroceryListProps {
  groceries: string[];
}

const GroceryList: FC<GroceryListProps> = ({ groceries }) => {
  return (
    <div>
      <ul className="flex flex-col gap-[32px]">
        {groceries.map((grocery, index) => (
          <li key={index} className="flex flex-col gap-[32px]">
            <div className="flex flex-row gap-[32px]">
              <input type="checkbox" />
              <span>{grocery}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
