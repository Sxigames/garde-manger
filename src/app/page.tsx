import { redirect } from "next/navigation";

export default function Home() {
    redirect('/groceries');
    return null;
}