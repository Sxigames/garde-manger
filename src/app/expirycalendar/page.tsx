import ExpiryCalenderComponent from "./calendar";

export default function ExpiryCalendarPage() {

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Expiry Calendar</h1>
            <p className="text-muted-foreground">This is a calendar of all your groceries and their expiration dates.</p>
            <ExpiryCalenderComponent />
        </div>
    );
}
export const metadata = {
    title: "garde manger | Expiry Calendar",
    description: "Manage your groceries expiration dates"
};