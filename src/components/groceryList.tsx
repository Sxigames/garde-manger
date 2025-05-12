'use client';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeGrocery, setQuantity } from "@/lib/features/grocery/grocerySlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function GroceryList() {
  const groceries = useAppSelector((state) => state.grocery.groceries);
  const presets = useAppSelector((state) => state.preset.groceryPresets);
  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeGrocery(id));
  };
  const handleSetQuantity = (id: number, quantity: number) => {
    dispatch(setQuantity({ id, quantity }));
  }

  return (
    <div>
      <Table>
        <TableCaption>Your groceries</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Remove</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Expiration Date</TableHead>
            <TableHead>Increase</TableHead>
            <TableHead>Change Quantity</TableHead>
            <TableHead>Decrease</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {groceries.map((grocery) => (
          
          <TableRow key={grocery.id}>
              <TableCell>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemove(grocery.id)}
              >
                x
              </Button>
              </TableCell>
              <TableCell>{grocery.quantity}</TableCell>
              <TableCell>{presets.find((preset) => preset.id === grocery.presetID)?.name}</TableCell>
              <TableCell>{presets.find((preset) => preset.id === grocery.presetID)?.unit}</TableCell>
              <TableCell>Expires: {new Date(grocery.expirationDate).toLocaleDateString()}</TableCell>
             <TableCell> <Button variant="outline" size="icon" onClick={() => handleSetQuantity(grocery.id, grocery.quantity + 1)}>+</Button></TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <TableCell>
                  <Button asChild>
                    <div>Edit</div>
                    </Button>
                  </TableCell>
                  </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Quantity</DialogTitle>
                    <DialogDescription>
                      Input the new quantity for {presets.find((preset) => preset.id === grocery.presetID)?.name}
                    </DialogDescription>
                  </DialogHeader>
                  <Input id="newQuantity" type="number" value={grocery.quantity} onChange={(e) => handleSetQuantity(grocery.id, parseInt(e.target.value))}/>
                  <DialogClose>
                  <Button type="submit">Save</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              <TableCell><Button variant="outline" size="icon" onClick={() => handleSetQuantity(grocery.id, grocery.quantity - 1)}>-</Button></TableCell>
             <TableCell><Badge variant="destructive" className={grocery.expirationDate < Date.now() ? ""  : "invisible"}>EXPIRED!</Badge></TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </div>
  );
}


