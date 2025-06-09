import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/assets/placeholder.svg";

type PendingPayment = {
  id: string;
  property: string;
  image: string;
  date: string;
  amount: string;
};

export function PendingPayments() {
  const pendingPayments: PendingPayment[] = [
    {
      id: "1",
      property: "King's Landing",
      image: placeholder,
      date: "May 04, 2025",
      amount: "₦300,000",
    },
    {
      id: "2",
      property: "TM Meadows",
      image: placeholder,
      date: "May 04, 2025",
      amount: "₦300,000",
    },
    {
      id: "3",
      property: "Queen Mary",
      image: placeholder,
      date: "May 04, 2025",
      amount: "₦300,000",
    },
    {
      id: "4",
      property: "TM HighGardens",
      image: placeholder,
      date: "May 04, 2025",
      amount: "₦300,000",
    },
  ];

  return (
    <div className="space-y-4 bg-white rounded-lg border divide-y">
      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="text-xl font-semibold">Pending Payments</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="#">View all</Link>
        </Button>
      </div>
      <div className="  overflow-hidden">
        <div className="divide-y">
          {pendingPayments.map((payment) => (
            <div key={payment.id} className="p-4 flex items-center gap-4">
              <div className="h-12 w-16 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={payment.image || placeholder}
                  alt={payment.property}
                  className="h-12 w-16 object-cover"
                  priority
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{payment.property}</h3>
                <p className="text-sm text-gray-500">{payment.date}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Balance Due</div>
                <div className="font-medium text-red-600">{payment.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
