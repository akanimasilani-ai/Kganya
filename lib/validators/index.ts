import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Customer Profile Schema
export const customerProfileSchema = z.object({
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  idNumber: z.string().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().default("South Africa"),
  occupation: z.string().optional(),
  employer: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
});

// Funeral Application Schema - Step 1: Personal Information
export const applicationStep1Schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  dateOfBirth: z.string().refine((date) => {
    const birth = new Date(date);
    const age = new Date().getFullYear() - birth.getFullYear();
    return age >= 18 && age <= 120;
  }, "You must be between 18 and 120 years old"),
  idNumber: z.string().min(10, "Valid ID number is required"),
  nationality: z.string().min(2, "Nationality is required"),
});

// Funeral Application Schema - Step 2: Address
export const applicationStep2Schema = z.object({
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().default("South Africa"),
});

// Funeral Application Schema - Step 3: Cover Selection
export const applicationStep3Schema = z.object({
  coverOptionId: z.string().cuid("Valid cover option required"),
});

// Funeral Application Schema - Step 4: Beneficiaries
export const beneficiarySchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  relationship: z.string().min(2, "Relationship is required"),
  dateOfBirth: z.string().optional(),
  idNumber: z.string().optional(),
  percentage: z.number().optional(),
});

export const applicationStep4Schema = z.object({
  beneficiaries: z.array(beneficiarySchema).min(1, "At least one beneficiary is required"),
});

// Claim Schema
export const claimSchema = z.object({
  policyId: z.string().cuid("Valid policy required"),
  claimantName: z.string().min(2, "Claimant name is required"),
  claimantRelationship: z.string().min(2, "Relationship is required"),
  claimantEmail: z.string().email("Valid email is required"),
  claimantPhone: z.string().min(10, "Valid phone is required"),
  deceasedName: z.string().min(2, "Deceased name is required"),
  deceasedDateOfDeath: z.string().refine((date) => {
    const death = new Date(date);
    return death <= new Date();
  }, "Date of death cannot be in the future"),
  causOfDeath: z.string().optional(),
  claimDescription: z.string().min(10, "Claim description is required"),
});

// Catering Enquiry Schema
export const cateringEnquirySchema = z.object({
  packageId: z.string().cuid().optional(),
  eventDate: z.string().refine((date) => {
    return new Date(date) > new Date();
  }, "Event date must be in the future"),
  eventLocation: z.string().min(5, "Event location is required"),
  estimatedGuests: z.number().min(1, "Estimated guests must be at least 1"),
  customerName: z.string().min(2, "Name is required"),
  customerPhone: z.string().min(10, "Valid phone is required"),
  customerEmail: z.string().email("Valid email is required"),
  specialRequirements: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
});

// Tombstone Enquiry Schema
export const tombstoneEnquirySchema = z.object({
  deceasedName: z.string().min(2, "Deceased name is required"),
  deceasedDateOfBirth: z.string().optional(),
  deceasedDateOfDeath: z.string().refine((date) => {
    return new Date(date) <= new Date();
  }, "Date of death cannot be in the future"),
  cemeteryLocation: z.string().min(5, "Cemetery location is required"),
  customerName: z.string().min(2, "Name is required"),
  customerPhone: z.string().min(10, "Valid phone is required"),
  customerEmail: z.string().email("Valid email is required"),
  designPreference: z.string().optional(),
  material: z.string().optional(),
  size: z.string().optional(),
  inscription: z.string().optional(),
  additionalFeatures: z.string().optional(),
});

// Contact Message Schema
export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

// Cash Payout Request Schema
export const cashPayoutRequestSchema = z.object({
  requestedAmount: z.number().positive("Amount must be positive"),
  purpose: z.string().min(5, "Purpose is required"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().min(8, "Valid account number is required"),
  accountHolder: z.string().min(2, "Account holder name is required"),
  branchCode: z.string().min(6, "Valid branch code is required"),
});

// Types for use in components
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ApplicationStep1 = z.infer<typeof applicationStep1Schema>;
export type ApplicationStep2 = z.infer<typeof applicationStep2Schema>;
export type ApplicationStep3 = z.infer<typeof applicationStep3Schema>;
export type ApplicationStep4 = z.infer<typeof applicationStep4Schema>;
export type ClaimInput = z.infer<typeof claimSchema>;
export type CateringEnquiryInput = z.infer<typeof cateringEnquirySchema>;
export type TombstoneEnquiryInput = z.infer<typeof tombstoneEnquirySchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type CashPayoutRequestInput = z.infer<typeof cashPayoutRequestSchema>;
