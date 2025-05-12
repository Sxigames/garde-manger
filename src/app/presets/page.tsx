import NewPresetForm from "@/components/newPresetForm";
import PresetList from "@/components/presetList";

export default function Presets() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-[64px] align-left">le garde manger</h1>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Presets</h2>
        <PresetList />
        <NewPresetForm />
        </main>
        </div>
    );
    }