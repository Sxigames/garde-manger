import { redirect } from "next/navigation";

export default function Home() {
    redirect('/groceries');
    return null;
}
export const metadata = {
    title: "le garde manger",
    description: "Manage your groceries and presets"
};