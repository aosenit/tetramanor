"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ActiveProperties({ data }: { data: any }) {
  const properties = data?.activeProperties;
  const router = useRouter();
  return (
    <div className="space-y-4 bg-white rounded-lg border divide-y">
      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="text-xl font-semibold">Active Properties</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="#">View all</Link>
        </Button>
      </div>
      <div className=" overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-100 ">
              <TableRow>
                <TableHead className="w-[40px] ">
                  <Checkbox />
                </TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Payment status</TableHead>
                <TableHead>Account officer</TableHead>
                <TableHead>Units owned</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* if properties is empty, show a message */}
              {properties?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-10">
                    No properties found
                  </TableCell>
                </TableRow>
              )}
              {properties?.length > 0 &&
                properties?.map((property) => (
                  <TableRow key={property?.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="">
                          <Avatar className="size-10">
                            <AvatarImage
                              src={property?.images[0]?.imageUrl}
                              alt={property?.name}
                            />
                            <AvatarFallback>N/A</AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="font-medium">{property?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{property?.address}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {property?.price?.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                        {property?.status || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={
                              property?.accountOfficer?.avatar ||
                              "/placeholder.svg"
                            }
                            alt={property?.accountOfficer?.name}
                          />
                          <AvatarFallback>N/A</AvatarFallback>
                        </Avatar>
                        <span>{property?.accountOfficer?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{property?.totalUnitsPurchased}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            aria-label="Open menu"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/client-admin/properties/property-overview?id=${property?.id}&name=${property?.name}`
                              )
                            }
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Payment History</DropdownMenuItem>
                          <DropdownMenuItem>Documents</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
