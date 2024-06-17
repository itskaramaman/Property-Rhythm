import z from "zod";

export const propertyFormSchema = z.object({
  type: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  location: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  }),
  beds: z
    .number({ message: "Number of beds is required" })
    .positive({ message: "Number of bedrooms should be positive" }),
  baths: z
    .number({ message: "Number of baths is required" })
    .positive({ message: "Number of baths should be positive" }),
  square_feet: z
    .number({ message: "Square feet is required" })
    .positive({ message: "Square feet bedrooms should be positive" }),
  seller_info: z.object({
    name: z.string().min(1, "Name of seller is required"),
    email: z.string().email({ message: "Email should be genuine" }),
    phone: z.string(),
  }),
  rates: z.object({
    nightly: z.preprocess(
      (val: any) => (Number.isNaN(val) ? undefined : parseFloat(val)),
      z.number().optional()
    ),
    weekly: z.preprocess(
      (val: any) => (Number.isNaN(val) ? undefined : parseFloat(val)),
      z.number().optional()
    ),
    monthly: z.preprocess(
      (val: any) => (Number.isNaN(val) ? undefined : parseFloat(val)),
      z.number().optional()
    ),
  }),
  amenities: z.array(z.string()),
  images: z.array(z.unknown()),
});
