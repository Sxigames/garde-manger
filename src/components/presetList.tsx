'use client';

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGroceryPreset } from "@/lib/features/preset/presetSlice";
import { removeGroceriesByPreset } from "@/lib/features/grocery/grocerySlice";
import { Button } from "./ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CookingPot, Trash } from "lucide-react";
import Barcode  from "react-barcode";
import Image from "next/image";

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
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Barcode</TableHead>
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
                            <Trash />
                            </Button>
                        </TableCell>
                        <TableCell>
                            {preset.image ? <Image src={preset.image} alt={preset.name} width={20} height={20}/> : <CookingPot />}
                        </TableCell>
                        <TableCell>
                            {preset.name}
                        </TableCell>
                        <TableCell>
                            {preset.unit}
                        </TableCell>
                        <TableCell>
                            {preset.barcode ? <Barcode fontSize={12} height={25} width={1} margin={1}value={preset.barcode}/> : "N/A"}
                        </TableCell>
                    </TableRow>
                ))}
                
                </TableBody>
            </Table>
        </div>
    )
}