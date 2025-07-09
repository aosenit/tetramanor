export interface ContactSocialMedia {
  platform: string;
  url: string;
}

export interface ContactAgentInquiry {
  name: string;
  email: string;
  phone: string;
}

export interface ContactData {
  companyEmail: string;
  phoneNumber: string;
  whatsappNumber: string;
  socialMedia: ContactSocialMedia[];
  mapEmbedCode: string;
  officeAddress: string;
  agentInquiry: ContactAgentInquiry;
}

export interface ContactResponse {
  data: ContactData;
  statusCode: number;
} 