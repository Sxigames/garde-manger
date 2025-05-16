import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GroceryPreset {
    id: number;
    name: string;
    unit: string;
    barcode?: string;
    image?: string;
}
    
interface GroceryPresetState {
  groceryPresets: GroceryPreset[];
}

const initialState: GroceryPresetState = {
  groceryPresets: [],
};

const groceryPresetSlice = createSlice({
  name: "groceryPreset",
  initialState,
  reducers: {
    addGroceryPreset: (state, action: PayloadAction<GroceryPreset>) => {
      if(state.groceryPresets.some((preset) => preset.name === action.payload.name)) {
        alert("Grocery preset already exists");
        return;
      }
      state.groceryPresets.push(action.payload);
    },
    removeGroceryPreset: (state, action: PayloadAction<number>) => {
        
      state.groceryPresets = state.groceryPresets.filter(
        (groceryPreset) => groceryPreset.id !== action.payload
      );
    },
  },
});
export const { addGroceryPreset, removeGroceryPreset } = groceryPresetSlice.actions;
export default groceryPresetSlice.reducer;