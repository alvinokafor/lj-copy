import { z } from "zod";

export const editProfileValidator = z.object({
  date_of_birth: z.string().optional(),
  astral_sign: z.string().optional(),
  religion: z.string().optional(),
  gender: z.string().optional(),
  height: z
    .object({
      value: z.number().optional(),
      metric: z.string().optional(),
    })
    .optional(),
  job: z.string().optional(),
  relationship: z.string().optional(),
  diaspora: z.array(z.string()).optional(),
  degree: z.string().optional(),
  language: z.string().optional(),
  otherLanguages: z.array(z.string()).optional(),
  country: z.string().optional(),
  about: z.string().optional(),
  ethnicity: z.string().optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileValidator>;
