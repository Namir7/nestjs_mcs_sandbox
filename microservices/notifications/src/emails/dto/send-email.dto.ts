export class SendEmailDto {
  // user email
  recipient: string;

  template: string;

  payload?: unknown;
}
