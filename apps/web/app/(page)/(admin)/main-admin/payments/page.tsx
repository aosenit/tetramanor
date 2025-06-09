import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, DollarSign, TrendingDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const payments = [
  {
    id: 1,
    details: "Adebayo seun",
    paymentType: "Investment",
    projectUnit: "Queen mary",
    amount: "₦50M",
    datePaid: "April 21, 2025",
  },
  {
    id: 2,
    details: "Ajao Thomas",
    paymentType: "Investment",
    projectUnit: "TM meadows",
    amount: "₦3.5M",
    datePaid: "April 23 2025",
  },
  {
    id: 3,
    details: "Gloria Houve",
    paymentType: "Investment",
    projectUnit: "Queen mary",
    amount: "₦50M",
    datePaid: "April 20, 2025",
  },
  {
    id: 4,
    details: "Toby paul",
    paymentType: "Investment",
    projectUnit: "TM highGardens",
    amount: "₦50M",
    datePaid: "April 20, 2025",
  },
  {
    id: 5,
    details: "Adebayo seun",
    paymentType: "Investment",
    projectUnit: "Queen mary",
    amount: "₦50M",
    datePaid: "April 21, 2025",
  },
  {
    id: 6,
    details: "Ajao Thomas",
    paymentType: "Investment",
    projectUnit: "TM meadows",
    amount: "₦3.5M",
    datePaid: "April 23 2025",
  },
  {
    id: 7,
    details: "Gloria Houve",
    paymentType: "Investment",
    projectUnit: "Queen mary",
    amount: "₦50M",
    datePaid: "April 20, 2025",
  },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Home / <span className="text-green-600 font-medium">Payment overview</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Payment overview</h1>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input placeholder="Search by name / payment reference/Project" className="pl-10" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="property">
        <TabsList>
          <TabsTrigger value="property">Property</TabsTrigger>
          <TabsTrigger value="rental">Rental</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total amount Paid</p>
                <h3 className="text-3xl font-bold text-green-600 mt-1">$400,000</h3>
                <div className="flex items-center mt-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500">
                    April{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 ml-1"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total amount outstanding</p>
                <h3 className="text-3xl font-bold text-green-600 mt-1">$150,000</h3>
                <div className="flex items-center mt-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500">
                    April{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 ml-1"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingDown className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Payments breakdown</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 px-2">
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
                <path d="M3 16h12M3 8h18M3 12h18" />
              </svg>
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-2">
              <DollarSign className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-md shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Details</TableHead>
                <TableHead>Payment type</TableHead>
                <TableHead>Project unit</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date paid</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.details}</TableCell>
                  <TableCell>{payment.paymentType}</TableCell>
                  <TableCell>{payment.projectUnit}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.datePaid}</TableCell>
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
