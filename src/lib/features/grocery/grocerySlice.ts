import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Grocery {
    id: number;
    presetID: number;
    quantity: number;
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
    setQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const grocery = state.groceries.find((grocery) => grocery.id === action.payload.id);
        if (grocery) {
            if (action.payload.quantity < 1) {
                return;
            }
            grocery.quantity = action.payload.quantity;
        }
    },
    removeGroceriesByPreset: (state, action: PayloadAction<number>) => {
        state.groceries = state.groceries.filter(
            (grocery) => grocery.presetID !== action.payload
        );
    },
    removeExpiredGroceries: (state) => {
        const currentDate = Date.now();
        state.groceries = state.groceries.filter(
            (grocery) => grocery.expirationDate > currentDate
        );
  },
}
});

export const { addGrocery, removeGrocery, setQuantity, removeGroceriesByPreset, removeExpiredGroceries } = grocerySlice.actions;
export default grocerySlice.reducer;