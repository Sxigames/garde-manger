'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks";
import { createClient } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function CreateInviteCodeComponent() {
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
        const handleCreateInviteCode = async () => {
        if (!inviteCode) {
            alert("Please enter an invite code.");
            return;
        }
        const { error } = await supabase
            .from('household_invite_codes')
            .insert([{ code: inviteCode, household_id: user?.householdID }]);
        if (error) {
            alert("Failed to create invite code. " + error.message);
            setInviteCode("");
        } else {
            alert("Invite code created successfully!");
            setInviteCode("");
        }
    };
    const handleQuitHousehold = async () => {
        const userId = (await supabase.auth.getUser()).data.user?.id;
        if (!userId) {
            alert("You must be logged in to quit a household.");
            return;
        }
        const { error } = await supabase
            .from('household_members')
            .delete()
            .eq('user_id', userId)
        if (error) {
            alert("Failed to quit household: " + error.message);
            return;
        }
        alert("You have successfully quit the household.");
        window.location.reload();
    }
    if (!isOwner) {
        return(
            <Button variant="destructive" onClick={handleQuitHousehold}>Quit Household!</Button>
        );
    }
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl font-bold">Create Invite Code</h1>
            <div>
            <Label className="text-lg font-semibold">Invite Code</Label>
            <Input content={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder="Enter invite code" className="w-full max-w-xs" />
            <Button onClick={handleCreateInviteCode} className="mt-4" disabled={!inviteCode}>
                Create Invite Code
            </Button>
            </div>
        </div>
    );
}