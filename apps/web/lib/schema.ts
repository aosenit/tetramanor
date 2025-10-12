import z from "zod";

export const unitSchema = z.object({
    unitType: z.string().min(1, "unit type is required"),
    numberOfUnits: z.number().min(0, "Number of units is required"),
    unitPrice: z.number().min(0, "Number of units is required"),
    priceThreshold: z
        .number()
        .min(0, "Payment threshold must be a positive number")
        .optional(),
    description: z.string().optional(),
    currency: z.enum(["USD", "NGN", "EUR", "GBP"]),
});

export const propertySchema = z.object({
    name: z.string().min(1, "Property name is required"),
    address: z.string().min(1, "Address is required"),
    about: z.string().min(1, "About property is required"),
    //   unitAmount: z.number().min(1, "Number of units must be at least 1"),
    unitTypes: z.array(z.string()).optional(),
    units: z.array(unitSchema),
    inquiryOptions: z
        .array(z.string())
        .min(1, "At least one inquiry option is required"),
    whyInvest: z
        .array(
            z.object({
                title: z.string().min(1, "Investment title is required"),
                description: z.string().min(1, "Investment description is required"),
            })
        )
        .optional(),
    investmentAdvantages: z
        .array(
            z.object({
                title: z.string().min(1, "Advantage title is required"),
                description: z.string().min(1, "Advantage description is required"),
            })
        )
        .optional(),
    features: z.array(z.string()),
    amenities: z.array(z.string()),
    images: z.array(z.string()),
    documentId: z.string().optional(),
    constructionStatus: z.enum(["ONGOING", "COMPLETED", "PLANNED"]),
    accountOfficerId: z.string().optional(),
    paymentThreshold: z
        .number()
        .min(0, "Payment threshold must be a positive number")
        .optional(),
});
