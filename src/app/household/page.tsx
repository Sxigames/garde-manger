import MemberList from "./memberList";

export default function HouseholdPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <h2>Household</h2>
            <p>Manage your household members.</p>
            <MemberList />
        </main>
        </div>
    )
    }

export const metadata = {
    title: "garde manger | Household",
    description: "Manage your household members"
};