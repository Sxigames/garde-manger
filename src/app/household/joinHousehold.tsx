'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/lib/hooks";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function JoinHouseholdComponent(){
    const supabase = createClient();
    const user = useAppSelector((state) => state.user.user);
    const [isOwner, setIsOwner] = useState(false);
    const [inviteCode, setInviteCode] = useState("");
        useEffect(() => {
            const checkOwnership = async () => {
                if (!user?.householdID) {
                    setIsOwner(false);
                    return;
                }
                const { data, error } = await supabase
                    .rpc('is_user_owner', {})
                if (error) {
                    console.error("Error checking ownership:", error);
                    setIsOwner(false);
                } else {
                    setIsOwner(data || false);
                }
            }
            checkOwnership();
            
        }, [supabase, user]);
    const handleJoinHousehold = async () => {
        const userId = (await supabase.auth.getUser()).data.user?.id;
        if (!userId) {
            alert("You must be logged in to join a household.");
            return;
        }
        if (!inviteCode) {
            alert("Please enter an invite code.");
            return;
        }
        const { data, error } = await supabase
            .from('household_invite_codes')
            .select('*')
            .eq('code', inviteCode)
            .single();
        if (error) {
            alert("Failed to join household: " + error.message);
            setInviteCode("");
            return;
        }
        if (!data) {
            alert("Invalid invite code. Please check and try again.");
            setInviteCode("");
            return;
        }
        const { error: joinError } = await supabase
        .rpc('insert_household_member', {
            _user_id: userId,
            _household_id: data.household_id,
            _role: 'member',
            _used_join_code: inviteCode
        })
        if (joinError) {
            alert("Failed to join household: " + joinError.message);
            setInviteCode("");
            return;
        }
            alert("Successfully joined the household!");
            setInviteCode("");  
            window.location.reload();
     
    }
    if (!isOwner) {
        return;
    }
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h2 className="text-2xl font-bold">Join Household</h2>
            <div>
                <Label className="text-lg font-semibold">Invite Code</Label>
                <Input value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} />
                <Button onClick={handleJoinHousehold}>Join Household</Button>
            </div>
        </div>
    );
}