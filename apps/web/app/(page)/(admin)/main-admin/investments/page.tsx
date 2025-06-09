import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const investments = [
  {
    id: 1,
    projectName: "Queen mary",
    investmentType: "Fixed ROI",
    estRoi: "18%",
    minAmount: "₦10M",
    duration: "12 months",
    status: "Published",
  },
  {
    id: 2,
    projectName: "TM highgardens",
    investmentType: "Equity share",
    estRoi: "60%",
    minAmount: "₦10M",
    duration: "Flexible Exit",
    status: "Published",
  },
  {
    id: 3,
    projectName: "TM meadows",
    investmentType: "Fixed ROI",
    estRoi: "20%",
    minAmount: "₦10M",
    duration: "8 months",
    status: "Published",
  },
  {
    id: 4,
    projectName: "Kings landing",
    investmentType: "Fixed ROI",
    estRoi: "22%",
    minAmount: "₦15M",
    duration: "10 months",
    status: "Unpublished",
  },
  {
    id: 5,
    projectName: "Kings landing",
    investmentType: "Fixed ROI",
    estRoi: "22%",
    minAmount: "₦15M",
    duration: "10 months",
    status: "Unpublished",
  },
  {
    id: 6,
    projectName: "TM highgardens",
    investmentType: "Equity share",
    estRoi: "60%",
    minAmount: "₦10M",
    duration: "Flexible Exit",
    status: "Published",
  },
  {
    id: 7,
    projectName: "Queen mary",
    investmentType: "Fixed ROI",
    estRoi: "18%",
    minAmount: "₦10M",
    duration: "12 months",
    status: "Published",
  },
  {
    id: 8,
    projectName: "TM highgardens",
    investmentType: "Equity share",
    estRoi: "60%",
    minAmount: "₦10M",
    duration: "Flexible Exit",
    status: "Published",
  },
  {
    id: 9,
    projectName: "TM meadows",
    investmentType: "Fixed ROI",
    estRoi: "20%",
    minAmount: "₦10M",
    duration: "8 months",
    status: "Published",
  },
]

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Admin / <span className="text-green-600 font-medium">Investments</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Investments</h1>
          <p className="text-gray-600">Manage all investment opportunities</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Investment
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input placeholder="Search investments" className="pl-10" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="bg-gray-100">
          All
        </Button>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Investment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fixed-roi">Fixed ROI</SelectItem>
            <SelectItem value="equity-share">Equity share</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ROI range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-20">0-20%</SelectItem>
            <SelectItem value="21-40">21-40%</SelectItem>
            <SelectItem value="41-60">41-60%</SelectItem>
            <SelectItem value="61-100">61-100%</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This month</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="this-year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Investments Table */}
      <div>
        <h2 className="text-lg font-medium mb-4">Investments opportunities overview</h2>
        <div className="bg-white rounded-md shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Investment Type</TableHead>
                <TableHead>Est ROI</TableHead>
                <TableHead>Min amount</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell className="font-medium">{investment.projectName}</TableCell>
                  <TableCell>{investment.investmentType}</TableCell>
                  <TableCell>{investment.estRoi}</TableCell>
                  <TableCell>{investment.minAmount}</TableCell>
                  <TableCell>{investment.duration}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        investment.status === "Published"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {investment.status}
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
