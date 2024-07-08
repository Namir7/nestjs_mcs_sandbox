import { render } from "@react-email/components";
import { Express } from "express";
import { getTemplate } from "./utils";
import { sendEmailToMailServer } from "./emails-sender";
import { validateEmailTemplate, validateSendEmail } from "services/validation";

export const PreviewTemplate = (app: Express) =>
  app.post("/preview", (req, res) => {
    const templateValid = validateEmailTemplate(req.body.template);

    if (!templateValid) {
      return res.status(404).send("Unknown template");
    }

    const template = req.body.template;
    const payload = req.body.payload;

    let html: string = "";

    try {
      html = render(getTemplate(template, payload || {}));
    } catch (error) {
      console.error(`error while rendering email: ${error}`);

      // TODO: add template props validation
      return res.status(500).send("Error due rendering email\n" + error);
    }

    return res.status(200).send({
      template,
      html,
      success: true,
    });
  });

export const SendEmail = (app: Express) =>
  app.post("/send", async (req, res) => {
    const [valid, error] = validateSendEmail(req.body);

    if (!valid) {
      return res.status(400).send("Bad request\n" + error);
    }

    const templateValid = validateEmailTemplate(req.body.template);

    if (!templateValid) {
      return res.status(404).send("Unknown template");
    }

    const recipient = req.body.recipient;
    const template = req.body.template;
    const payload = req.body.payload;

    let html: string = "";

    try {
      html = render(getTemplate(template, payload || {}));
    } catch (error) {
      console.error(`error while rendering email: ${error}`);

      // TODO: add template props validation
      return res.status(500).send("Error due rendering email\n" + error);
    }

    try {
      await sendEmailToMailServer(recipient, html);
    } catch (error) {
      console.error(`error due sending email: ${error}`);

      return res.status(500).send("Error due sending email");
    }

    return res.status(200).send({
      template,
      success: true,
    });
  });

export const NotFound = (app: Express) =>
  app.get("*", function (_, res) {
    return res.status(404).send("Not Found");
  });
