export interface Property {
    id: string;
    name: string;
  address: string;
  coverImage: PropertyImage;
    about: string;
    featured: boolean;
    featuredAt: string | null;
    inquiryOptions: InquiryOption[];
    whyInvest: InvestmentDetail[];
    investmentAdvantages: InvestmentDetail[];
    features: string[];
    amenities: string[];
    createdAt: string;
    brochure: string | null;
    constructionStatus: "COMPLETED" | "IN_PROGRESS" | "PROPOSED"; // Extend as needed
    createdById: string | null;
    status: "AVAILABLE" | "SOLD_OUT" | "COMING_SOON"; // Extend as needed
    unitAmount: number;
    unitTypes: string[];
    accountOfficerId: string;
    coverImageId: string;
    images: PropertyImage[];
    document: any[]; // Define structure if known
    accountOfficer: AccountOfficer;
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
  