import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { CookingPot, Trash } from "lucide-react";
import Image from "next/image";
import Barcode from "react-barcode";

export type PresetOnTable = {
    id: number;
    name: string;
    image?: string;
    unit: string;
    barcode: string;
    deleteFunction: () => void;

}

export const columns: ColumnDef<PresetOnTable>[] = [
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const image = row.getValue('image');
            return typeof image === 'string' && image
                ? <Image src={image} width={8} height={8} alt="icon" className="h-8 w-8 rounded-full" />
                : <CookingPot />;
        }
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'unit',
        header: 'Unit',
    },
    {
        accessorKey: 'barcode',
        header: 'Barcode',
        cell: ({ row }) => (
            row.getValue('barcode') && row.getValue('barcode') !== ''
                ? <Barcode fontSize={12} height={25} width={1} margin={1} value={row.getValue('barcode')} />
                : "N/A"
        )
    },
    {
        id: 'delete',
        cell: ({ row }) => (
                <Button onClick={() => row.original.deleteFunction()} variant="destructive" size="icon">
                    <Trash />
                </Button>
        )
    }
];