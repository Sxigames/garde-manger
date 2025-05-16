'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, TriangleAlert } from 'lucide-react';

export type GroceryOnTable = {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    expirationDate: string;
    deleteFunction: () => void;
    setQuantityFunction: (quantity: number) => void;
}

export const columns: ColumnDef<GroceryOnTable>[] = [
    {
        id: 'expired',
        cell: ({ row }) => {
            const expires: number = row.getValue('expirationDate');
            return expires < Date.now() ?  <Badge variant="destructive"><TriangleAlert />EXPIRED</Badge> : null;
        }
    },
    {
        accessorKey: 'name',
        enableHiding: false,
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
            )
        },
    },
    {
        accessorKey: 'quantity',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >Quantity
                <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
            )
        },
    },
    {
        accessorKey: 'unit',
        header: 'Unit',
    },
    {
        accessorKey: 'expirationDate',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >Expires
                <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('expirationDate'));
            return date.toLocaleDateString();
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { deleteFunction, setQuantityFunction, quantity, name } = row.original;
            return (
                <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() => deleteFunction()}
                            >
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem

                                onClick={() => setQuantityFunction(quantity + 1)}
                            >
                                Increase Quantity
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                >
                                    Set Quantity
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem
                                onClick={() => setQuantityFunction(quantity - 1)}
                            >
                                Decrease Quantity
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                                                <DialogContent>
                                <DialogHeader>
                                <DialogTitle>New Quantity</DialogTitle>
                                <DialogDescription>
                                    Input the new quantity for {name}
                                </DialogDescription>
                                </DialogHeader>
                                <Input id="newQuantity" type="number" value={quantity} onChange={(e) => setQuantityFunction(parseInt(e.target.value))}/>
                                <DialogClose asChild>
                                <Button type="submit">Save</Button>
                                </DialogClose>
                            </DialogContent>
                                </Dialog>

        )}
    }
];


