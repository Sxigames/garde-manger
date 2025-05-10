import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Grocery {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    expirationDate: number;
}

interface GroceryState {
  groceries: Grocery[];
}

const initialState: GroceryState = {
  groceries: [],
};

const grocerySlice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {
    addGrocery: (state, grocery: PayloadAction<Grocery>) => {
      state.groceries.push(grocery.payload);
    },
    removeGrocery: (state, action: PayloadAction<number>) => {
        state.groceries = state.groceries.filter(
            (grocery) => grocery.id !== action.payload
        );
    },
    addQuantity: (state, action: PayloadAction<number>) => {
        const grocery = state.groceries.find(
            (grocery) => grocery.id === action.payload
        );
        if (grocery) {
            grocery.quantity += 1;
        }
    },
    removeQuantity: (state, action: PayloadAction<number>) => {
        const grocery = state.groceries.find(
            (grocery) => grocery.id === action.payload
        );
        if (grocery && grocery.quantity > 1) {
            grocery.quantity -= 1;
        }
    },
  },
});

export const { addGrocery, removeGrocery, addQuantity, removeQuantity } = grocerySlice.actions;
export default grocerySlice.reducer;