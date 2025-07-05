"use client"

import React, { useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, Filter, MoreHorizontal } from 'lucide-react';
import iconOne from '../../../../../../../assets/customer/propertyOne.png';
import iconTwo from '../../../../../../../assets/customer/propertyTwo.png';
import iconThree from '../../../../../../../assets/customer/propertyThree.png';
import iconFour from '../../../../../../../assets/customer/propertyFour.png';
import Image from 'next/image';
import { useFetchData } from '@/hooks/useApi';
import { useRouter, useSearchParams } from 'next/navigation';

const PropertyTableSkeleton = () => (
  <div className="overflow-x-auto bg-white rounded-lg shadow animate-pulse">
    <table className="min-w-[700px] w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        <tr>
          {Array.from({ length: 9 }).map((_, i) => (
            <th key={i} className="px-3 py-2">&nbsp;</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, i) => (
          <tr key={i}>
            {Array.from({ length: 9 }).map((_, j) => (
              <td key={j} className="px-3 py-4">
                <div className="h-4 bg-gray-200 rounded w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EmptyState = () => {
    const router = useRouter();
    return (
        (
            <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center py-16 px-4 text-center">
              <Image src={iconOne.src} alt="No properties" width={64} height={64} className="mb-4 opacity-60" />
              <h2 className="text-lg font-semibold text-gray-700 mb-2">No Properties Found</h2>
              <p className="text-gray-500 mb-4 max-w-xs mx-auto">You currently have no properties in your account. Once you purchase a property, it will appear here.</p>
              <Button variant="outline" onClick={() => router.back()}>Explore Properties</Button>
            </div>
          )
    )
};

const PropertyOverview = () => {
  const [search, setSearch] = useState('');
  const id = useSearchParams().get('id');
  const name = useSearchParams().get('name');
  const router = useRouter();
  
  const { data, isLoading, isError, error } = useFetchData(id ? `admin/purchases/user/${id}` : '');
  const properties = Array.isArray(data?.data) ? data.data : [];

  // Calculate stats from data
  const totalUnitsOwned = properties.length;
  const totalPropertyValue = properties.reduce((sum, p) => sum + (Number(p.value) || 0), 0);
  const outstandingBalance = properties.reduce((sum, p) => sum + (Number(p.outstandingBalance) || 0), 0);
  const unitsRented = properties.filter((p) => p.status?.toLowerCase() === 'rented').length;

  const summary = [
    {
      label: 'Total Units Owned',
      value: totalUnitsOwned.toString().padStart(2, '0'),
      icon: iconOne,
    },
    {
      label: 'Total Property Value',
      value: `₦${totalPropertyValue.toLocaleString()}`,
      icon: iconTwo,
    },
    {
      label: 'Outstanding Balance',
      value: `₦${outstandingBalance.toLocaleString()}`,
      icon: iconThree,
    },
    {
      label: 'Units Rented',
      value: unitsRented.toString().padStart(2, '0'),
      icon: iconFour,
    },
  ];



  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <div className="px-2 sm:px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">{name}</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {summary.map((item) => (
            <Card key={item.label} className="flex flex-row items-center gap-4 p-4 min-w-0 justify-between">
              <div className="truncate">
                <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 truncate">
                  {item.label}
                </CardTitle>
                <div className="text-lg font-bold text-gray-900 truncate">{item.value}</div>
              </div>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50">
                <Image src={item.icon.src} alt={item.label} className="h-10 w-10 object-contain" height={20} width={20}/>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs and Controls */}
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-2 md:gap-4 mb-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="ghost" size="sm" className="gap-2 w-1/2 md:w-auto">
                Owned
              </Button>
              <Button variant="outline" size="sm" className="gap-2 w-1/2 md:w-auto">
                Rented
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
          </div>

          {/* Table states */}
          {isLoading ? (
            <PropertyTableSkeleton />
          ) : isError ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-red-500 font-medium">
              {error?.message || 'Failed to load properties.'}
            </div>
          ) : properties.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-[700px] w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      <input type="checkbox" />
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bedrooms</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Purchase Price</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account Officer</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment status</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {properties
                    .filter((p) =>
                      p.name?.toLowerCase().includes(search.toLowerCase()) ||
                      p.type?.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((property: any) => (
                      <tr key={property.id} className="hover:bg-gray-50 transition">
                        <td className="px-3 py-2">
                          <input type="checkbox" />
                        </td>
                        <td className="px-3 py-2 flex items-center gap-3 min-w-[150px]">
                          <img
                            src={property.image || '/placeholder.svg'}
                            alt={property.name}
                            className="h-10 w-14 object-cover rounded-md border"
                          />
                          <span className="font-semibold text-gray-900 truncate">{property.name}</span>
                        </td>
                        <td className="px-3 py-2">{property.type}</td>
                        <td className="px-3 py-2">{property.bedrooms}</td>
                        <td className="px-3 py-2">{property.floor}</td>
                        <td className="px-3 py-2">
                          <span className="font-bold">{property.price}</span>
                          <span className="text-xs text-gray-400 ml-1">{property.priceUSD && `(${property.priceUSD})`}</span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={property.officer?.avatar || '/placeholder.svg'} />
                              <AvatarFallback>
                                {property.officer?.name?.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-900 truncate">{property.officer?.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <span className="text-green-600 font-medium">{property.status}</span>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;