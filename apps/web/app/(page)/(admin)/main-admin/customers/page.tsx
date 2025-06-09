import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const customers = [
  {
    id: 1,
    name: "Seun adebayo",
    email: "Seun@email.com",
    role: "Investor",
    kycStatus: "Verified",
    engagement: "#50m in queen mary",
  },
  {
    id: 2,
    name: "Grace Olabayo",
    email: "Grace@gmail.com",
    role: "Tenant",
    kycStatus: "Verified",
    engagement: "Lease Tm meadows 3BR",
  },
  {
    id: 3,
    name: "Isaac olawande",
    email: "Olawande@gmail.com",
    role: "Admin",
    kycStatus: "Verified",
    engagement: "Internal user",
  },
  {
    id: 4,
    name: "Tina madu",
    email: "Tinam@gmil.com",
    role: "Buyer",
    kycStatus: "Unverified",
    engagement: "Browsed 2 listings",
  },
  {
    id: 5,
    name: "Seun adebayo",
    email: "Seun@email.com",
    role: "Investor",
    kycStatus: "Verified",
    engagement: "#50m in queen mary",
  },
  {
    id: 6,
    name: "Grace Olabayo",
    email: "Grace@gmail.com",
    role: "Tenant",
    kycStatus: "Verified",
    engagement: "Lease Tm meadows 3BR",
  },
  {
    id: 7,
    name: "Tina madu",
    email: "Tinam@gmil.com",
    role: "Buyer",
    kycStatus: "Unverified",
    engagement: "Browsed 2 listings",
  },
  {
    id: 8,
    name: "Grace Olabayo",
    email: "Grace@gmail.com",
    role: "Tenant",
    kycStatus: "Verified",
    engagement: "Lease Tm meadows 3BR",
  },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Admin / <span className="text-green-600 font-medium">Customer management</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Customer management</h1>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Customer
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
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="investor">Investor</SelectItem>
            <SelectItem value="tenant">Tenant</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="buyer">Buyer</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <h3 className="text-3xl font-bold text-green-600 mt-1">300</h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Verified Customers</p>
                <h3 className="text-3xl font-bold text-green-600 mt-1">250</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Unverified customers</p>
                <h3 className="text-3xl font-bold text-orange-600 mt-1">50</h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Kyc status</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.role}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      customer.kycStatus === "Verified"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-orange-100 text-orange-800 border-orange-200"
                    }
                  >
                    {customer.kycStatus}
                  </Badge>
                </TableCell>
                <TableCell>{customer.engagement}</TableCell>
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
  )
}
