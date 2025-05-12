'use client';

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGroceryPreset } from "@/lib/features/preset/presetSlice";
import { removeGroceriesByPreset } from "@/lib/features/grocery/grocerySlice";
import { Button } from "./ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function PresetList() {
    const presets = useAppSelector((state) => state.preset.groceryPresets);
    const dispatch = useAppDispatch();

    const handleRemove = (id: number) => {
        dispatch(removeGroceriesByPreset(id));
        dispatch(removeGroceryPreset(id));
    };
    return (
        <div>
            <Table>
                <TableCaption>Your grocery presets</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Remove</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Unit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {presets.map((preset) => (
                    <TableRow key={preset.id}>
                        <TableCell>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleRemove(preset.id)}
                            >
                            x
                            </Button>
                        </TableCell>
                        <TableCell>
                            {preset.name}
                        </TableCell>
                        <TableCell>
                            {preset.unit}
                        </TableCell>
                    </TableRow>
                ))}
                
                </TableBody>
            </Table>
        </div>
    )
}