import { NotImplementedError } from "enums/errors";

type MailServerAuth = {
  user: string;
  email: string;
  password: string;
};

export const sendEmailToMailServer = async (
  // recipient email
  recipient: string,
  html: string
) => {
  /*
      here should be sending to email server
   */

  console.log(`sending email to mail server, recipient: ${recipient}`);

  throw new NotImplementedError("emails sending not implemented");
};
