import z from "zod";

export const signupschema = z.object({
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

export const loginschema = z.object({
  username: z.string(),
  password: z.string(),
});
