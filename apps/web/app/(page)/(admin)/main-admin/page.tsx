import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, TrendingUp, Users, Plus, Search, Home, BarChart3 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Admin / <span className="text-green-600 font-medium">Dashboard</span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input placeholder="Search properties, users and transactions" className="pl-10 max-w-md" />
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
          Add new blog post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total properties listed</CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <Building2 className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">400</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-gray-600">150</span> for rent <span className="text-gray-600">250</span> for sale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total investments</CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-gray-600">3</span> live campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total customers</CardTitle>
            <div className="bg-orange-100 p-2 rounded-lg">
              <Users className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">400</div>
            <p className="text-xs text-muted-foreground">Tetramanor customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Properties Overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>Properties overview</CardTitle>
                <div className="bg-green-100 p-1 rounded">
                  <Home className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  All
                </Button>
                <Button variant="ghost" size="sm" className="bg-gray-100">
                  Recent
                </Button>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">TM HighGardens</TableCell>
                    <TableCell>Eko Atlantic</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Ongoing
                      </Badge>
                    </TableCell>
                    <TableCell>March 21 2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Queen Mary</TableCell>
                    <TableCell>Maryland</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Sold out
                      </Badge>
                    </TableCell>
                    <TableCell>April 19 2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TM HighGardens</TableCell>
                    <TableCell>Eko Atlantic</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Ongoing
                      </Badge>
                    </TableCell>
                    <TableCell>March 21 2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Investments */}
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>Recent investments</CardTitle>
                <div className="bg-blue-100 p-1 rounded">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  All
                </Button>
                <Button variant="ghost" size="sm" className="bg-gray-100">
                  Recent
                </Button>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investment type</TableHead>
                    <TableHead>No of Project</TableHead>
                    <TableHead>Average ROI</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Fixed ROI</TableCell>
                    <TableCell>4 projects</TableCell>
                    <TableCell>60%</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Equity share</TableCell>
                    <TableCell>2 projects</TableCell>
                    <TableCell>60%</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Pending
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Breakdown */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1 rounded">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                </div>
                <CardTitle>Inventory breakdown</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeDasharray="75, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Total properties</div>
                      <div className="text-2xl font-bold">400</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
