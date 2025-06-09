import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

const properties = [
  {
    id: 1,
    name: "TM Meadows",
    units: "8 units",
    location: "Ebute meta",
    status: "Furnished",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Comfy burrows",
    units: "8 units",
    location: "Ebute meta",
    status: "Furnished",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "TM high gardens",
    units: "8 units",
    location: "Ebute meta",
    status: "Furnished",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "TM Meadows",
    units: "6 units",
    location: "Ebute meta",
    status: "Furnished",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "TM Meadows",
    units: "12 units",
    location: "Ebute meta",
    status: "Furnished",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Comfy burrows",
    units: "6 units",
    location: "Ebute meta",
    status: "Not Furnished",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    name: "Queen Mary",
    units: "8 units",
    location: "Ebute meta",
    status: "Furnished",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    name: "TM Meadows",
    units: "12 units",
    location: "Ebute meta",
    status: "Furnished",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Admin / <span className="text-green-600 font-medium">Property management</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Property management</h1>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New property
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search Properties" className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="furnished">Furnished</SelectItem>
              <SelectItem value="not-furnished">Not Furnished</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="sold">Sold out</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Property name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tm-meadows">TM Meadows</SelectItem>
              <SelectItem value="comfy-burrows">Comfy burrows</SelectItem>
              <SelectItem value="tm-high-gardens">TM high gardens</SelectItem>
              <SelectItem value="queen-mary">Queen Mary</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" className="text-gray-500">
            Clear all
          </Button>
        </div>
      </div>

      {/* Properties Count */}
      <div className="text-lg font-medium text-green-600">All properties</div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <Badge
                className={`absolute top-2 left-2 ${
                  property.status === "Furnished" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {property.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{property.units}</p>

              <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                <MapPin className="h-3 w-3" />
                <span>{property.location}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-gray-500">Status</span>
                  <div className="font-medium">Ongoing</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
