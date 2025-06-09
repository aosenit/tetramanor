import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Building2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const rentalProperties = [
  {
    id: 1,
    name: "TM meadows",
    type: "3BR + BQ",
    location: "Ebute metta",
    rent: "₦3.5m/Year",
    status: "Not rented",
  },
  {
    id: 2,
    name: "Queen mary",
    type: "2BR",
    location: "Maryland",
    rent: "₦2M/year",
    status: "Not rented",
  },
  {
    id: 3,
    name: "Comfy burrows",
    type: "Studio apartment",
    location: "Akoka yaba",
    rent: "₦140,500/Mth",
    status: "Rented",
  },
  {
    id: 4,
    name: "TM meadows",
    type: "3BR + BQ",
    location: "Ebute metta",
    rent: "₦3.5m/Year",
    status: "Not rented",
  },
  {
    id: 5,
    name: "Queen mary",
    type: "2BR",
    location: "Maryland",
    rent: "₦2M/year",
    status: "Not rented",
  },
  {
    id: 6,
    name: "Comfy burrows",
    type: "Studio apartment",
    location: "Akoka yaba",
    rent: "₦140,500/Mth",
    status: "Rented",
  },
]

export default function RentalsPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Home / <span className="text-green-600 font-medium">Rental Overview</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Rental Overview</h1>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Rental
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input placeholder="Search by name / email / ID" className="pl-10" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="bg-gray-100">
          All
        </Button>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Property name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tm-meadows">TM Meadows</SelectItem>
            <SelectItem value="queen-mary">Queen Mary</SelectItem>
            <SelectItem value="comfy-burrows">Comfy Burrows</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Apartment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3br">3BR + BQ</SelectItem>
            <SelectItem value="2br">2BR</SelectItem>
            <SelectItem value="studio">Studio apartment</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rented">Rented</SelectItem>
            <SelectItem value="not-rented">Not rented</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total properties for rent</p>
                <h3 className="text-3xl font-bold text-green-600 mt-1">150</h3>
                <p className="text-xs text-gray-500 mt-1">For rent</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rented properties</p>
                <h3 className="text-3xl font-bold text-blue-600 mt-1">100</h3>
                <p className="text-xs text-gray-500 mt-1">properties rented</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Not rented properties</p>
                <h3 className="text-3xl font-bold text-green-600 mt-1">100</h3>
                <p className="text-xs text-gray-500 mt-1">Available for rent</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Table */}
      <div>
        <h2 className="text-lg font-medium mb-4">Properties</h2>
        <div className="bg-white rounded-md shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property Name</TableHead>
                <TableHead>Apartment type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentalProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.rent}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        property.status === "Rented"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
