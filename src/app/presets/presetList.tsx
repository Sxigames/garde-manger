'use client';

import { useState, useEffect } from "react";
import { createClient } from '@/utils/supabase/client';
import { useAppSelector } from "@/lib/hooks";
import {DataTable} from "@/components/data-table";
import { columns, type PresetOnTable } from "./columns";

export default function PresetList() {
    const supabase = createClient();
    const user = useAppSelector((state) => state.user.user);
    const [presets, setPresets] = useState<PresetOnTable[]>([]);

    useEffect(() => {
        if (!user?.householdID) return;
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
        const fetchPresets = async () => {
            if (!user?.householdID) return; 
            const { data, error } = await supabase
                .from('preset')
                .select('*')
                .eq('household_id', user.householdID);
            if (error) {
                console.error("Error fetching presets:", error);
            } else {
                setPresets(data.map(preset => ({
                    ...preset,
                    deleteFunction: () => handleRemove(preset.id)
                })));
            }
        };  
        fetchPresets();
        const channel = supabase.channel('table-db-changes').on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'preset' },
            async () => {
                const { data, error } = await supabase
                    .from('preset')
                    .select('*')
                    .eq('household_id', user.householdID);
                if (!error && data) {
                    setPresets(data.map(preset => ({
                    ...preset,
                    deleteFunction: () => handleRemove(preset.id)
                })));
                }
            }
        ).subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, user?.householdID, setPresets, presets]);
    
    return (
        <div>
            <DataTable columns={columns} data={presets}/>
        </div>
    )
}