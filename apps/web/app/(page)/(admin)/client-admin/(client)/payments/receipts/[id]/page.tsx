import { ReceiptTemplate } from "../../ReceiptTemplate";

interface ReceiptPageProps {
  params: {
    id: string;
  };
}

export default function ReceiptPage({ params }: ReceiptPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <ReceiptTemplate receiptId={params.id} />
    </div>
  );
}
