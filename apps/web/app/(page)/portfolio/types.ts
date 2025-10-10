export interface Feature {
  id: string;
  name: string;
  icon: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface PropertyUnit {
  id: string;
  propertyId: string;
  unitType: string;
  numberOfUnits: number;
  unitPrice: number;
  priceThreshold: number;
  description: string;
  availableUnits: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
    id: string;
    name: string;
  address: string;
  coverImage: PropertyImage | null;
    about: string;
    featured: boolean;
    featuredAt: string | null;
    inquiryOptions: InquiryOption[];
    whyInvest: InvestmentDetail[];
    investmentAdvantages: InvestmentDetail[];
  features: Feature[];
  amenities: Amenity[];
    createdAt: string;
    brochure: string | null;
  constructionStatus: "COMPLETED" | "IN_PROGRESS" | "PROPOSED" | "ONGOING"; // Extend as needed
    createdById: string | null;
    status: "AVAILABLE" | "SOLD_OUT" | "COMING_SOON"; // Extend as needed
  totalUnits: number;
    unitTypes: string[];
  accountOfficerId: string | null;
  coverImageId: string | null;
    images: PropertyImage[];
    document: any[]; // Define structure if known
    accountOfficer: AccountOfficer;
  units: PropertyUnit[];
  slug: string;
  updatedAt: string;
  deletedAt: string | null;
  thresholdPrice: number | null;
  }
  
  export type InquiryOption = "INQUIRY_FORM" | "WHATSAPP" | "BOOK_INSPECTION";
  
  export interface InvestmentDetail {
    title: string;
    description: string;
    icon:string
  }
  
  export interface PropertyImage {
    id: string;
    imageUrl: string;
    name: string;
    publicId: string;
    createdAt: string;
    isPrimary: boolean;
    propertyid: string;
    campaignId: string | null;
    investmentId: string | null;
    rentId: string | null;
    productType: string | null;
    blogId: string | null;
    imageType: string | null;
    purchaseUnitId: string | null;
  }
  
  export interface AccountOfficer {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  }
  