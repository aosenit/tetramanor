import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Home, Building2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

export default function HomepagePage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Admin / <span className="text-green-600 font-medium">Homepage management</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Welcome admin</h1>
        <p className="text-gray-600">Manage featured properties, rentals and homepage campaigns</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="h-12 justify-start">
          <Plus className="h-4 w-4 mr-2" />
          Add new property
        </Button>
        <Button variant="outline" className="h-12 justify-start">
          <Plus className="h-4 w-4 mr-2" />
          Add new investment
        </Button>
        <Button variant="outline" className="h-12 justify-start">
          <Plus className="h-4 w-4 mr-2" />
          Add new rental
        </Button>
        <Button variant="outline" className="h-12 justify-start">
          <Plus className="h-4 w-4 mr-2" />
          Add new campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Property */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Featured property</CardTitle>
              <div className="bg-green-100 p-1 rounded">
                <Home className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Set the property that appears at the top of the homepage</p>

            <div>
              <p className="text-sm font-medium mb-2">
                Current - <span className="text-green-600">Tm highgardens</span>
              </p>
              <div className="flex gap-4 items-center">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Featured property"
                  width={120}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">Select new property</Button>
          </CardContent>
        </Card>

        {/* Rental Highlight */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Rental Highlight</CardTitle>
              <div className="bg-orange-100 p-1 rounded">
                <Building2 className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Set a rental property to display on the homepage</p>

            <div>
              <p className="text-sm font-medium mb-2">
                Current - <span className="text-green-600">Queen Mary – 2 Bedroom Apartment</span>
              </p>
              <div className="flex gap-4 items-center">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Rental highlight"
                  width={120}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">Select new rental</Button>
          </CardContent>
        </Card>
      </div>

      {/* Ongoing Campaigns */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Ongoing campaigns</CardTitle>
            <div className="bg-blue-100 p-1 rounded">
              <Building2 className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add new campaign
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">Add or manage homepage promotions, investment offers, and sales</p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">TM HighGardens Promo</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Investment
                  </Badge>
                </TableCell>
                <TableCell>Apr 20 – May 30, 2025</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Queen Mary Summer Sale</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Sale
                  </Badge>
                </TableCell>
                <TableCell>May 1 – June 15, 2025</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
