'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { Database } from '@/database.types';
import type { PostgrestError } from '@supabase/supabase-js';

export default function MemberList() {
    // Adjust the type below to match your actual row type
    type HouseholdMember = Database['public']['Tables']['household_members']['Row'];
    const [members, setMembers] = useState<HouseholdMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError>();
    const supabase = createClient();
    const fetchMembers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .rpc('get_or_create_household_members', {});
        if (error) {
            setError(error);
        } else {
            setMembers(data);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchMembers();
    },);
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                {members.map((member) => (
                    <div key={member.user_id} className="flex flex-col items-center">
                        <h3>{member.user_id}</h3>
                        <p>{error ? error.message : "no error"}</p>
                    </div>
                ))}
                {loading && <p>Loading...</p>}
        </div>
    );
}