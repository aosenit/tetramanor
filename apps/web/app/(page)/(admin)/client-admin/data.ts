import { DashboardData } from "./dashboard/types";

export const mockData: DashboardData = {
  user: {
    id: "1",
    name: "Damian",
    email: "damian@example.com",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isVerified: false,
  },
  statistics: {
    totalProperties: 36,
    rentedProperties: 4,
    pendingPayments: 8,
  },
  properties: [
    {
      id: "1",
      name: "TM HighGardens",
      location: "Lekki Phase 1",
      image:
        "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 3500000,
      priceUSD: 6500,
      paymentStatus: "Paid",
      accountOfficer: {
        id: "ao1",
        name: "John D. Patkins",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        position: "Senior Agent",
      },
      unitsOwned: 12,
    },
    {
      id: "2",
      name: "Comfy Burrows",
      location: "Akoka, Yaba, Lagos",
      image:
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 3500000,
      priceUSD: 6500,
      paymentStatus: "Paid",
      accountOfficer: {
        id: "ao1",
        name: "John D. Patkins",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        position: "Senior Agent",
      },
      unitsOwned: 6,
    },
    {
      id: "3",
      name: "King's Landing",
      location: "Mende, Maryland, Lagos",
      image:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 3500000,
      priceUSD: 6500,
      paymentStatus: "Paid",
      accountOfficer: {
        id: "ao1",
        name: "John D. Patkins",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        position: "Senior Agent",
      },
      unitsOwned: 8,
    },
    {
      id: "4",
      name: "TM Meadows",
      location: "Ebutte Metta, Lagos",
      image:
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 3500000,
      priceUSD: 6500,
      paymentStatus: "Paid",
      accountOfficer: {
        id: "ao1",
        name: "John D. Patkins",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        position: "Senior Agent",
      },
      unitsOwned: 2,
    },
    {
      id: "5",
      name: "TM Gardens",
      location: "Surulere, Lagos",
      image:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 3500000,
      priceUSD: 6500,
      paymentStatus: "Paid",
      accountOfficer: {
        id: "ao1",
        name: "John D. Patkins",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        position: "Senior Agent",
      },
      unitsOwned: 5,
    },
  ],
  pendingPayments: [
    {
      id: "p1",
      propertyId: "3",
      propertyName: "King's Landing",
      propertyImage:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      amount: 300000,
      dueDate: "May 04, 2025",
    },
    {
      id: "p2",
      propertyId: "4",
      propertyName: "TM Meadows",
      propertyImage:
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      amount: 300000,
      dueDate: "May 04, 2025",
    },
    {
      id: "p3",
      propertyId: "6",
      propertyName: "Queen Mary",
      propertyImage:
        "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      amount: 300000,
      dueDate: "May 04, 2025",
    },
    {
      id: "p4",
      propertyId: "1",
      propertyName: "TM HighGardens",
      propertyImage:
        "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      amount: 300000,
      dueDate: "May 04, 2025",
    },
  ],
  recentActivities: [
    {
      id: "a1",
      type: "contract",
      title: "New Contract Uploaded",
      description:
        "Your updated lease agreement for Unit D2 in TM HighGardens is now available.",
      time: "8min ago",
      relatedPropertyId: "1",
    },
    {
      id: "a2",
      type: "deed",
      title: "Title Deed Uploaded",
      description:
        "Your Title Deed for King's Landing has been uploaded and is now available for download.",
      time: "3:04PM",
      relatedPropertyId: "3",
    },
    {
      id: "a3",
      type: "receipt",
      title: "Payment Receipt Available",
      description:
        "Your Title Deed for King's Landing has been uploaded and is now available for download.",
      time: "11:42AM",
      relatedPropertyId: "3",
    },
  ],
};
