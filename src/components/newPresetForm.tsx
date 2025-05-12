'use client';
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { addGroceryPreset } from "@/lib/features/preset/presetSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Camera, CirclePlus } from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogClose } from "./ui/dialog";
import { Label } from "./ui/label";

export default function NewGroceryForm() {
  const [groceryName, setGroceryName] = useState("");
  const [groceryUnit, setGroceryUnit] = useState("");
  const [groceryBarcode, setGroceryBarcode] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [groceryImage, setGroceryImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const base64 = await toBase64(groceryImage as File);
    if (groceryName.trim() === "") return;
    dispatch(addGroceryPreset({
      id: Date.now(),
      name: groceryName,
      unit: groceryUnit,
      barcode: groceryBarcode ? groceryBarcode : undefined,
      image: groceryImage ? base64 as string : undefined,
    }));
    setGroceryName("");
    setGroceryUnit("");
    setGroceryBarcode("");
    setGroceryImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
      <Input
        type="text"
        value={groceryName}
        onChange={(e) => setGroceryName(e.target.value)}
        placeholder="Grocery name"
      />
      <Input
        type="text"
        value={groceryUnit}
        onChange={(e) => setGroceryUnit(e.target.value)}
        placeholder="Measurement unit"
      />
    <div className="flex flex-row gap-2">
      <Input
        type="text"
        value={groceryBarcode}
        onChange={(e) => setGroceryBarcode(e.target.value)}
        placeholder="Barcode(optional)"
      />
      <Dialog open={scannerOpen} onOpenChange={setScannerOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon"><Camera /></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Barcode</DialogTitle>
            <DialogDescription>
              Scan the barcode of the grocery item.
            </DialogDescription>
          </DialogHeader>
          <Scanner formats={[
          "qr_code",
          "micro_qr_code",
          "rm_qr_code",
          "maxi_code",
          "pdf417",
          "aztec",
          "data_matrix",
          "matrix_codes",
          "dx_film_edge",
          "databar",
          "databar_expanded",
          "codabar",
          "code_39",
          "code_93",
          "code_128",
          "ean_8",
          "ean_13",
          "itf",
          "linear_codes",
          "upc_a",
          "upc_e",
        ]} onScan={(result) => {setGroceryBarcode(result[0].rawValue); setScannerOpen(false)}}/>
        </DialogContent>
      </Dialog>
      </div>
      <div>
      <Label>Image(optional)</Label>
      <Input type="file" onChange={(e) => setGroceryImage(e.target.files ? e.target.files[0] : null)} />
      </div>
      <DialogClose asChild>
      <Button type="submit">
        <CirclePlus /> Add Preset
      </Button>
      </DialogClose>
    </form>
  );
}
const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};