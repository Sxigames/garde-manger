'use client';

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGroceryPreset } from "@/lib/features/preset/presetSlice";
import { removeGroceriesByPreset } from "@/lib/features/grocery/grocerySlice";
import { Button } from "./ui/button";

export default function PresetList() {
    const presets = useAppSelector((state) => state.preset.groceryPresets);
    const dispatch = useAppDispatch();

    const handleRemove = (id: number) => {
        dispatch(removeGroceriesByPreset(id));
        dispatch(removeGroceryPreset(id));
    };
    return (
        <div>
            <ul className="flex flex-col gap-[32px]">
                {presets.map((preset) => (
                    <li key={preset.id} className="flex flex-col gap-[32px]">
                        <div className="flex flex-row gap-[32px]">
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleRemove(preset.id)}
                            >
                            x
                            </Button>
                            <span>{preset.name}</span>
                            <span>{preset.unit}</span>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    )
}