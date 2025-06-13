import HouseholdSetter from "@/components/householdSetter";
import NewPresetForm from "@/components/newPresetForm";
import PresetList from "@/app/presets/presetList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";

export default function Presets() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Presets</h2>
        <HouseholdSetter />
        <PresetList />
          <Dialog>
            <DialogTrigger asChild>
              <Button><CirclePlus />Add</Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new preset</DialogTitle>
                <DialogDescription>
                  Add a new grocery preset to your list.
                </DialogDescription>
              </DialogHeader>
              <NewPresetForm />
              </DialogContent>
          </Dialog>
        </main>
        </div>
    );
    }

export const metadata = {
    title: "garde manger | Presets",
    description: "Manage your grocery presets"
};