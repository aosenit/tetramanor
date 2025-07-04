import { ReceiptTemplate } from "../../ReceiptTemplate";

export default function ReceiptPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <ReceiptTemplate receiptId={params.id} />
    </div>
  );
}
