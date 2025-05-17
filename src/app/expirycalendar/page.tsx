'use client';
import { Calendar } from "@/components/ui/calendar";
import { useAppSelector } from "@/lib/hooks";



export default function ExpiryCalendar() {
    const groceries = useAppSelector((state) => state.grocery.groceries);
    const presets = useAppSelector((state) => state.preset.groceryPresets);
    const expirationDates = groceries.map((grocery) => new Date(grocery.expirationDate));
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Expiry Calendar</h1>
            <p className="text-muted-foreground">This is a calendar of all your groceries and their expiration dates.</p>
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
                    const date = new Date(grocery.expirationDate);
                    const preset = presets.find((preset) => preset.id === grocery.presetID);
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
        </div>
    );
}