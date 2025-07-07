export type Payment = {
  id: string;
  property: {
    name: string;
  };
  paymentId: string;
  balanceRemaining: number;
  amountPaid: number;
  paymentDate: string;
  createdAt: string;
  paymentMode: string | null;
};

export type PaginationData = {
  page: number;
  total: number;
  limit: number;
};
