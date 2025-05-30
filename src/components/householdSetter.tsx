'use client';
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { setUser } from "@/lib/features/user/userSlice";
import { createClient } from "@/utils/supabase/client";

export default function HouseholdSetter() {
        const supabase = createClient();
        const dispatch = useAppDispatch();
            useEffect(() => {
            const fetchHousehold = async () => {
                const { data, error } = await supabase
                    .rpc('get_user_household_id', {});
                if (error) {
                    console.error("Error fetching household:", error);
                } else {
                    dispatch(setUser({
                        householdID: data
                    }));
                }
            };
            fetchHousehold();
        }
        , [supabase, dispatch]);
    return(
        <></>
    );
}