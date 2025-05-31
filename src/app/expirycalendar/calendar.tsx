'use client';
import { Calendar } from "@/components/ui/calendar";
import { useAppSelector } from "@/lib/hooks";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import type { Database } from "@/database.types";
type grocery = Database['public']['Tables']['grocery']['Row'];
type preset = Database['public']['Tables']['preset']['Row'];

export default function ExpiryCalenderComponent() {
    
    const supabase = createClient();
    const user = useAppSelector((state) => state.user.user);
    const [groceries, setGroceries] = useState<grocery[]>([]);
    const [presets, setPresets] = useState<preset[]>([]);
    const [expirationDates, setExpirationDates] = useState<Date[]>([]);

        useEffect(() => {
        const fetchData = async () => {
            if (!user?.householdID) return;
            const { data: groceriesData, error: groceriesError } = await supabase
                .from('grocery')
                .select('*')
                .eq('household_id', user.householdID);
            if (groceriesError) {
                console.error("Error fetching groceries:", groceriesError);
            }
            setGroceries(groceriesData || []);

            const { data: presetsData, error: presetsError } = await supabase
                .from('preset')
                .select('*')
                .eq('household_id', user.householdID);
            if (presetsError) {
                console.error("Error fetching presets:", presetsError);
                return;
            }
            setPresets(presetsData || []);
            setExpirationDates((groceriesData ?? []).map((grocery) => new Date(grocery.expirationdate)));
        };

        fetchData();
    }
    , [user?.householdID, supabase]);
    return (
            <Calendar 
            mode="multiple"
            className="rounded-md border w-fit"
            selected={expirationDates}
            modifiersClassNames={
                {
                    selected: "bg-red-600 text-white hover:bg-red-700",
                }
            }
            footer={
                groceries.map((grocery) => {
                    const date = new Date(grocery.expirationdate ?? "");
                    const preset = presets.find((preset) => preset.id === grocery.preset);
                    return (
                        <div key={grocery.id} className="flex items-center gap-2">
                            <span>{preset?.name}</span>
                            <span className="text-sm text-muted-foreground">{date.toLocaleDateString()}</span>
                        </div>
                    );
                }
            )
            }
            />
    );
}
