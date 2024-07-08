type Payload = {
  message: string;
  status: number;
};

export class Exception extends Error {
  public status: number;
  public message: string;

  constructor(data: Payload) {
    super(data.message);

    this.status = data.status;
    this.message = data.message;
  }
}
