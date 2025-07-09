export interface PropertyImage {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  isPrimary?: boolean;
  propertyid?: string;
  campaignId?: string | null;
  investmentId?: string | null;
  rentId?: string | null;
  productType?: string | null;
  blogId?: string | null;
  imageType?: string | null;
  purchaseUnitId?: string | null;
}

export interface PropertyDocument {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  docType?: string;
  campaignId?: string | null;
  propertyid?: string;
  investmentId?: string | null;
  usage?: string | null;
  kycId?: string | null;
  purchasedUnitId?: string | null;
}

export interface WhyInvestAdvantage {
  title: string;
  description: string;
}

export interface WhyInvest {
  title: string;
  advantages: WhyInvestAdvantage[];
  description: string;
}

export interface PropertyItem {
  id: string;
  name: string;
  address: string;
  about: string;
  featured: boolean;
  featuredAt: string | null;
  inquiryOptions: string[];
  whyInvest: WhyInvest;
  investmentAdvantages: any;
  features: string[];
  amenities: string[];
  createdAt: string;
  brochure: string | null;
  constructionStatus: "ONGOING" | "COMPLETED";
  createdById: string | null;
  status: "AVAILABLE" | "SOLDOUT";
  unitAmount: number;
  unitTypes: any[];
  accountOfficerId: string | null;
  coverImageId: string | null;
  accountOfficer: any;
  images: PropertyImage[];
  document: PropertyDocument[];
}

export interface PropertyData {
  items: PropertyItem[];
  page: number;
  total: number;
  limit: number;
}

export interface PropertyResponse {
  success: boolean;
  message: string;
  data: PropertyData;
  statusCode: number;
} 