import {
  isArray,
  isNotEmptyObject,
  isObject,
  isString,
  isUUID,
  maxLength
} from "class-validator";

export class SendDto {
  clients: string[];

  event: string;

  data: unknown;
}

export const validateSendDto = (dto: SendDto): boolean => {
  return (
    dto !== undefined &&
    isArray(dto.clients) &&
    dto.clients.reduce((acc, curr) => acc && isUUID(curr), true) &&
    isString(dto.event) && 
    maxLength(dto.event, 200) &&
    isObject(dto.data) &&
    isNotEmptyObject(dto.data)
  );
};
