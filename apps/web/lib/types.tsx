export interface UploadedImage {
	id: string;
	imageUrl: string;
	name: string;
	publicId: string;
	createdAt: string;
	isPrimary: boolean;
}

export interface UploadedDocument {
	id: string;
	imageUrl: string;
	name: string;
	publicId: string;
	createdAt: string;
	docType: string;
}
