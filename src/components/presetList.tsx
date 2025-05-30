'use client';

import { Button } from "./ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CookingPot, Trash } from "lucide-react";
import Barcode  from "react-barcode";
import Image from "next/image";
import type { Database } from "@/database.types";
import { useState, useEffect } from "react";
import { createClient } from '@/utils/supabase/client';
import { useAppSelector } from "@/lib/hooks";

type preset = Database['public']['Tables']['preset']['Row']

export default function PresetList() {
    const supabase = createClient();
    const user = useAppSelector((state) => state.user.user);
    const [presets, setPresets] = useState<preset[]>([]);

    useEffect(() => {
        const fetchPresets = async () => {
            if (!user?.householdID) return; // Ensure household is set before fetching presets
            const { data, error } = await supabase
                .from('preset')
                .select('*')
                .eq('household_id', user.householdID);
            if (error) {
                console.error("Error fetching presets:", error);
            } else {
                setPresets(data);
            }
        };
        fetchPresets();
    }, [user, setPresets, supabase]);
    
    const handleRemove = async (id: number) => {
        const { error } = await supabase
            .from('preset')
            .delete()
            .eq('id', id);
        if (error) {
            console.error("Error removing preset:", error);
        } else {
            setPresets(presets.filter(preset => preset.id !== id));
        }
    };
    useEffect(() => {
        if (!user?.householdID) return;
        const channel = supabase.channel('table-db-changes').on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'preset' },
            async () => {
                const { data, error } = await supabase
                    .from('preset')
                    .select('*')
                    .eq('household_id', user.householdID);
                if (!error && data) {
                    setPresets(data);
                }
            }
        ).subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, user?.householdID]);
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