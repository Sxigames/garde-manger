'use client';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addGrocery } from "@/lib/features/grocery/grocerySlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";

export default function NewGroceryForm() {
  const presets = useAppSelector((state) => state.preset.groceryPresets);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [groceryQuantity, setGroceryQuantity] = useState(1);
  const [groceryExpirationDate, setGroceryExpirationDate] = useState(Date.now());
  const [groceryBarcode, setGroceryBarcode] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPreset === null) return;
    dispatch(addGrocery({
      id: Date.now(),
      presetID: selectedPreset,
      quantity: groceryQuantity,
      expirationDate: groceryExpirationDate,
    }));
    setSelectedPreset(null);
    setGroceryQuantity(1);
    setGroceryExpirationDate(Date.now());
  };
  const setBarcode = (barcode: string) => {
    setGroceryBarcode(barcode);
    const preset = presets.find((preset) => preset.barcode === barcode);
    if (preset) {
      setSelectedPreset(preset.id);
    }
  };
  return (
    <Tabs defaultValue="select">
      <TabsList>
        <TabsTrigger value="select">Select Preset</TabsTrigger>
        <TabsTrigger value="barcode">Input Barcode</TabsTrigger>
      </TabsList>
      <TabsContent value="select">
    <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
      <Select onValueChange={(value) => setSelectedPreset(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a preset" />
        </SelectTrigger>
        <SelectContent>
        {presets.map((preset) => (
          <SelectItem key={preset.id} value={preset.id.toString()}>
            {preset.name}
          </SelectItem>
        ))}
        </SelectContent>
      </Select>
       <Input
        type="number"
        value={groceryQuantity}
        onChange={(e) => setGroceryQuantity(Number(e.target.value))}
        placeholder="Quantity"
      />
      <Input
        type="date"
        value={new Date(groceryExpirationDate).toISOString().split("T")[0]}
        onChange={(e) => setGroceryExpirationDate(new Date(e.target.value).getTime())}
        placeholder="Expiration date"
      />
      <Button type="submit" >
        <CirclePlus /> Add Grocery
      </Button>
    </form>
    </TabsContent>
      <TabsContent value="barcode">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
              <div className="flex flex-row gap-2">
      <Input
        type="text"
        value={groceryBarcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Barcode"
      />
      <Label>{presets.find(preset => preset.barcode === groceryBarcode)?.name || "no matching barcode"}</Label>
      </div>
       
       <Input
        type="number"
        value={groceryQuantity}
        onChange={(e) => setGroceryQuantity(Number(e.target.value))}
        placeholder="Quantity"
      />
      <Input
        type="date"
        value={new Date(groceryExpirationDate).toISOString().split("T")[0]}
        onChange={(e) => setGroceryExpirationDate(new Date(e.target.value).getTime())}
        placeholder="Expiration date"
      />
      <Button type="submit" >
        <CirclePlus /> Add Grocery
      </Button>
    </form>
        </TabsContent>
    </Tabs>
  );
}