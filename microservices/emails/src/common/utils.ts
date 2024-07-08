import { Emails } from "enums/emails";
import { NotDefinedTemplateError } from "enums/errors";
import { emailsToTemplatesMap } from "enums/templates";
import { ReactElement } from "react";
import { Express } from "express";
import { ZodError } from "zod";

export const getTemplate = (name: Emails, payload: unknown): ReactElement => {
  const template = emailsToTemplatesMap[name];

  if (!template) {
    throw new NotDefinedTemplateError(`template ${name} not found`);
  }

  return template(payload);
};

export const applyRoutes = (
  app: Express,
  ...routes: ((app: Express) => void)[]
) => routes.forEach((route) => route(app));

export const applyMiddlewares = applyRoutes;

export const validationErrorMessage = (error: ZodError) => {
  return `Got validation error: ${error.issues.map(
    (error) => `${error.path} ${error.message}\n`
  )}`;
};
