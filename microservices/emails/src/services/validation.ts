import { isEmail } from "class-validator";
import { validationErrorMessage } from "common/utils";
import { Emails } from "enums/emails";
import { ZodError, z } from "zod";

const sendEmailSchema = z.object({
  recipient: z.string().refine((v) => isEmail(v)),
  template: z.string(),
  payload: z.any().optional(),
});

type errorMessage = string;

export const validateSendEmail = (
  dto: unknown
): [boolean, errorMessage | null] => {
  const { success, error } = sendEmailSchema.safeParse(dto);

  return [success, error ? validationErrorMessage(error) : null];
};

export const validateEmailTemplate = (template: string) =>
  Object.values(Emails).includes(template as Emails);
