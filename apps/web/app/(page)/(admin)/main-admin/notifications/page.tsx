import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Mail } from "lucide-react"

const notifications = [
  {
    id: 1,
    category: "today",
    title: "Adebayo uploaded kyc docs",
    description: "Adebayo has uploaded his kyc document for verification",
    time: "8min ago",
    isRead: false,
  },
  {
    id: 2,
    category: "today",
    title: "Tm Meadows-Lease expiry in 2 months",
    description: "Grace olabayo lease for unit 3b will expire on the 24th of july",
    time: "2hr ago",
    isRead: false,
  },
  {
    id: 3,
    category: "today",
    title: "Lease agreement uploaded for TM HighGardens – Unit 2A.",
    description: "The new lease agreement of sala over has been uploaded by customer",
    time: "4hr ago",
    isRead: false,
  },
  {
    id: 4,
    category: "yesterday",
    title: "Inspection booked",
    description: "Unit 4a queen mary has been booked for an onsite inspection",
    time: "2:50PM",
    isRead: true,
  },
  {
    id: 5,
    category: "yesterday",
    title: "New inquiry submitted via website by Samuel A.",
    description: "Samuel a. has sent a message via contact us",
    time: "9:32AM",
    isRead: true,
  },
  {
    id: 6,
    category: "older",
    title: "Rental payment overdue for TM HighGardens – Unit 4B.",
    description: "The lease agreement of adeola najaat has expired and is due foer renewal",
    time: "11:45PM",
    isRead: true,
  },
  {
    id: 7,
    category: "older",
    title: "Reminder: Inspection Tomorrow",
    description: "Jimmy adukoya has renewed his lease for Tm medows unit 5b",
    time: "9:25PM",
    isRead: true,
  },
  {
    id: 8,
    category: "older",
    title: "Title Deed Uploaded",
    description: "Your Title Deed for King's Landing has been uploaded and is now available for download.",
    time: "3:04PM",
    isRead: true,
  },
  {
    id: 9,
    category: "older",
    title: "Document uploaded: Sales Agreement for TM King's Landing.",
    description: "Document of sales of kings landing has been uploaded",
    time: "8min ago",
    isRead: true,
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Admin / <span className="text-green-600 font-medium">Notifications</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>
        <Button variant="ghost" className="text-gray-500">
          <Check className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-2">
            Unread
            <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Notifications List */}
      <div className="space-y-8">
        {/* Today */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-4">TODAY</h2>
          <div className="space-y-4">
            {notifications
              .filter((notification) => notification.category === "today")
              .map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-4 rounded-lg ${notification.isRead ? "bg-white" : "bg-green-50"}`}
                >
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{notification.description}</p>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Yesterday */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-4">YESTERDAY</h2>
          <div className="space-y-4">
            {notifications
              .filter((notification) => notification.category === "yesterday")
              .map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-4 rounded-lg ${notification.isRead ? "bg-white" : "bg-green-50"}`}
                >
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{notification.description}</p>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Older */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-4">OLDER</h2>
          <div className="space-y-4">
            {notifications
              .filter((notification) => notification.category === "older")
              .map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-4 rounded-lg ${notification.isRead ? "bg-white" : "bg-green-50"}`}
                >
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{notification.description}</p>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
