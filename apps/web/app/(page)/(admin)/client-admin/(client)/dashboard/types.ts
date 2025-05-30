export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isVerified: boolean;
}

export interface AccountOfficer {
  id: string;
  name: string;
  avatar: string;
  position: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  priceUSD: number;
  paymentStatus: "Paid" | "Pending" | "Overdue";
  accountOfficer: AccountOfficer;
  unitsOwned: number;
}

export interface Payment {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  amount: number;
  dueDate: string;
}

export interface Activity {
  id: string;
  type: "contract" | "deed" | "receipt" | "other";
  title: string;
  description: string;
  time: string;
  relatedPropertyId?: string;
}

export interface Statistics {
  totalProperties: number;
  rentedProperties: number;
  pendingPayments: number;
}

export interface DashboardData {
  user: User;
  properties: Property[];
  pendingPayments: Payment[];
  recentActivities: Activity[];
  statistics: Statistics;
}
