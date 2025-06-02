'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CookingPot, MoreHorizontal, TriangleAlert } from 'lucide-react';
import Image from 'next/image';

export type GroceryOnTable = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    expirationDate: number;
    icon?: string;
    deleteFunction: () => void;
    setQuantityFunction: (quantity: number) => void;
}

export const columns: ColumnDef<GroceryOnTable>[] = [
    {
        id: 'expired',
        cell: ({ row }) => {
            const expires: number = row.getValue('expirationDate');
            if (expires < Date.now()) {
                return <Badge variant="destructive"><TriangleAlert />EXPIRED</Badge>;
            }
            const daysLeft = Math.ceil((expires - Date.now()) / (1000 * 60 * 60 * 24));
            if (daysLeft <= 3) {
                return <Badge className="bg-amber-300 text-black"><TriangleAlert />{daysLeft} days left</Badge>;
            }

        }
    },
    {
        accessorKey: 'icon',
        header: 'Icon',
        cell: ({ row }) => {
            const icon = row.getValue('icon');
            return typeof icon === 'string' && icon
                ? <Image src={icon} alt="icon" className="h-8 w-8 rounded-full" width={8} height={8} />
                : <CookingPot />;
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


